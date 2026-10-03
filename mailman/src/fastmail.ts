// Talks to Fastmail over JMAP, its JSON email API: https://jmap.io/spec-mail.html

import type { Mailbox } from "./rules";
import { clearCachedConfig, getCachedConfig, setCachedConfig } from "./state";

const SESSION_URL = "https://api.fastmail.com/jmap/session/";
const PURGATORY_NAME = "Purgatory";

export type FastmailConfig = {
  accountId: string;
  apiUrl: string;
  mailboxIds: Record<Mailbox | "inbox", string>;
};

export type Email = {
  id: string;
  from: string;
  subject: string;
  body: string;
};

function headers(env: CloudflareBindings): Record<string, string> {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${env.FASTMAIL_API_KEY}`,
  };
}

// Sends a batch of JMAP method calls and returns each call's result, in order.
async function call(
  env: CloudflareBindings,
  config: Pick<FastmailConfig, "apiUrl">,
  methodCalls: [string, Record<string, unknown>][],
): Promise<any[]> {
  const res = await fetch(config.apiUrl, {
    method: "POST",
    headers: headers(env),
    body: JSON.stringify({
      using: ["urn:ietf:params:jmap:core", "urn:ietf:params:jmap:mail"],
      methodCalls: methodCalls.map(([name, args], i) => [name, args, String(i)]),
    }),
  });
  if (!res.ok) throw new Error(`JMAP request failed: ${res.status}`);
  const data = (await res.json()) as { methodResponses: [string, any, string][] };
  return data.methodResponses.map(([, result]) => result);
}

// Returns the account and mailbox IDs, from the cache when possible.
export async function getConfig(env: CloudflareBindings): Promise<FastmailConfig> {
  const cached = await getCachedConfig<FastmailConfig>(env);
  if (cached) return cached;
  const config = await discoverConfig(env);
  await setCachedConfig(env, config);
  return config;
}

// Forces the IDs to be looked up again next time, e.g. after a request fails because one went stale.
export const forgetConfig = clearCachedConfig;

async function discoverConfig(env: CloudflareBindings): Promise<FastmailConfig> {
  const res = await fetch(SESSION_URL, { headers: headers(env) });
  if (!res.ok) throw new Error(`Session discovery failed: ${res.status}`);
  const session = (await res.json()) as any;
  const accountId: string = session.primaryAccounts["urn:ietf:params:jmap:mail"];
  const apiUrl: string = session.apiUrl;

  const [{ list }] = await call(env, { apiUrl }, [
    ["Mailbox/get", { accountId, ids: null, properties: ["id", "name", "role"] }],
  ]);
  const mailboxes = list as { id: string; name: string; role: string | null }[];
  const find = (description: string, match: (m: (typeof mailboxes)[number]) => boolean) => {
    const mailbox = mailboxes.find(match);
    if (!mailbox) throw new Error(`Mailbox not found: ${description}`);
    return mailbox.id;
  };

  return {
    accountId,
    apiUrl,
    mailboxIds: {
      inbox: find("inbox", (m) => m.role === "inbox"),
      archive: find("archive", (m) => m.role === "archive"),
      purgatory: find(PURGATORY_NAME, (m) => m.name === PURGATORY_NAME),
    },
  };
}

export async function getUnreadInboxEmails(
  env: CloudflareBindings,
  config: FastmailConfig,
): Promise<Email[]> {
  const [, { list }] = await call(env, config, [
    [
      "Email/query",
      {
        accountId: config.accountId,
        filter: { inMailbox: config.mailboxIds.inbox, notKeyword: "$seen" },
      },
    ],
    [
      "Email/get",
      {
        accountId: config.accountId,
        "#ids": { resultOf: "0", name: "Email/query", path: "/ids" },
        properties: ["id", "subject", "from", "textBody", "bodyValues"],
        fetchTextBodyValues: true,
      },
    ],
  ]);

  return (list as any[]).map((email) => {
    const sender = email.from?.[0];
    const partId = email.textBody?.[0]?.partId;
    return {
      id: email.id,
      from: sender?.name ? `${sender.name} <${sender.email}>` : sender?.email || "Unknown",
      subject: email.subject || "No subject",
      body: (partId && email.bodyValues?.[partId]?.value) || "",
    };
  });
}

export async function moveAndMarkRead(
  env: CloudflareBindings,
  config: FastmailConfig,
  emailId: string,
  mailbox: Mailbox | "inbox",
): Promise<void> {
  const [{ notUpdated }] = await call(env, config, [
    [
      "Email/set",
      {
        accountId: config.accountId,
        update: {
          [emailId]: {
            mailboxIds: { [config.mailboxIds[mailbox]]: true },
            "keywords/$seen": true,
          },
        },
      },
    ],
  ]);
  if (notUpdated?.[emailId]) {
    throw new Error(`Could not move ${emailId}: ${JSON.stringify(notUpdated[emailId])}`);
  }
}
