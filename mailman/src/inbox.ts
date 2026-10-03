import { classify, summarize } from "./ai";
import {
  type Email,
  type FastmailConfig,
  forgetConfig,
  getConfig,
  getUnreadInboxEmails,
  moveAndMarkRead,
} from "./fastmail";
import { sendNotification } from "./notify";
import { type Category, decide, type Mailbox } from "./rules";
import { getSeen, markSeen } from "./state";

// Everything learned about one email while processing it, written out as a single log entry.
type EmailLog = {
  emailId: string;
  from: string;
  subject: string;
  outcome?: "kept" | "moved" | "notified" | "error";
  matches?: Category[];
  probabilities?: Partial<Record<Category, number>>;
  category?: Category;
  mailbox?: Mailbox;
  notification?: string;
  error?: string;
};

// Sorts every unread inbox email that hasn't been handled on an earlier run.
export async function processInbox(env: CloudflareBindings): Promise<void> {
  const config = await getConfig(env);
  const emails = await getUnreadInboxEmails(env, config).catch(async (err) => {
    await forgetConfig(env);
    throw err;
  });
  const seen = await getSeen(
    env,
    emails.map((e) => e.id),
  );

  for (const email of emails) {
    if (seen.has(email.id)) continue;
    const log: EmailLog = { emailId: email.id, from: email.from, subject: email.subject };
    try {
      await processEmail(env, config, email, log);
      console.log({ event: "email", ...log });
    } catch (err) {
      log.outcome = "error";
      log.error = err instanceof Error ? err.message : String(err);
      console.error({ event: "email", ...log });
    }
  }
}

async function processEmail(
  env: CloudflareBindings,
  config: FastmailConfig,
  email: Email,
  log: EmailLog,
): Promise<void> {
  const { matches, probabilities } = await classify(env, email);
  const action = decide(matches);
  log.matches = [...matches];
  log.probabilities = probabilities;

  if (!action) {
    await markSeen(env, email.id);
    log.outcome = "kept";
    return;
  }
  log.category = action.category;
  log.mailbox = action.mailbox;

  if (action.notify) {
    // Fall back to the sender and subject if the model returns nothing.
    const summary = (await summarize(env, email)) || `${email.from}: ${email.subject}`;
    log.notification = `${action.emoji} ${summary}`;
    // If this throws, the email is left untouched so the next run can try again.
    await sendNotification(env, email.id, log.notification);
  }

  try {
    await moveAndMarkRead(env, config, email.id, action.mailbox);
  } catch (err) {
    // A stale mailbox ID is the most likely cause, so look them up again next run.
    await forgetConfig(env);
    throw err;
  }
  log.outcome = action.notify ? "notified" : "moved";
}
