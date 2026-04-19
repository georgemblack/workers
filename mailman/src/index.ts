const NOTIFICATIONS_NAME = "Notifications";
const TOKEN_TTL_SECONDS = 24 * 60 * 60;

type JmapSession = {
  accountId: string;
  apiUrl: string;
  headers: Record<string, string>;
};

async function jmapSession(env: CloudflareBindings): Promise<JmapSession> {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${env.FASTMAIL_API_KEY}`,
  };
  const res = await fetch("https://api.fastmail.com/jmap/session/", {
    headers,
  });
  if (!res.ok) throw new Error(`Session discovery failed: ${res.status}`);
  const session = (await res.json()) as any;
  return {
    accountId: session.primaryAccounts["urn:ietf:params:jmap:mail"],
    apiUrl: session.apiUrl,
    headers,
  };
}

async function getMailboxIds(
  session: JmapSession,
): Promise<{ inboxId: string; notificationsId: string }> {
  const res = await fetch(session.apiUrl, {
    method: "POST",
    headers: session.headers,
    body: JSON.stringify({
      using: ["urn:ietf:params:jmap:core", "urn:ietf:params:jmap:mail"],
      methodCalls: [
        [
          "Mailbox/query",
          { accountId: session.accountId, filter: { role: "inbox" } },
          "0",
        ],
        [
          "Mailbox/query",
          {
            accountId: session.accountId,
            filter: { name: NOTIFICATIONS_NAME },
          },
          "1",
        ],
        [
          "Mailbox/get",
          {
            accountId: session.accountId,
            "#ids": { resultOf: "1", name: "Mailbox/query", path: "/ids" },
            properties: ["id", "name"],
          },
          "2",
        ],
      ],
    }),
  });
  const data = (await res.json()) as any;
  const inboxIds: string[] = data.methodResponses[0][1].ids;
  const notifCandidates: { id: string; name: string }[] =
    data.methodResponses[2][1].list ?? [];
  if (!inboxIds?.length) throw new Error(`Mailbox with role=inbox not found`);
  const notif = notifCandidates.find((m) => m.name === NOTIFICATIONS_NAME);
  if (!notif) throw new Error(`Mailbox "${NOTIFICATIONS_NAME}" not found`);
  return { inboxId: inboxIds[0], notificationsId: notif.id };
}

type FetchedEmail = {
  id: string;
  from: string;
  subject: string;
  body: string;
};

async function getUnreadInboxEmails(
  session: JmapSession,
  inboxId: string,
): Promise<FetchedEmail[]> {
  const res = await fetch(session.apiUrl, {
    method: "POST",
    headers: session.headers,
    body: JSON.stringify({
      using: ["urn:ietf:params:jmap:core", "urn:ietf:params:jmap:mail"],
      methodCalls: [
        [
          "Email/query",
          {
            accountId: session.accountId,
            filter: { inMailbox: inboxId, notKeyword: "$seen" },
          },
          "0",
        ],
        [
          "Email/get",
          {
            accountId: session.accountId,
            "#ids": { resultOf: "0", name: "Email/query", path: "/ids" },
            properties: ["id", "subject", "from", "textBody", "bodyValues"],
            fetchTextBodyValues: true,
          },
          "1",
        ],
      ],
    }),
  });
  const data = (await res.json()) as any;
  const list: any[] = data.methodResponses[1][1].list ?? [];
  return list.map((email) => {
    const bodyPartId = email.textBody?.[0]?.partId;
    const bodyText = bodyPartId
      ? email.bodyValues?.[bodyPartId]?.value || ""
      : "";
    return {
      id: email.id,
      from: email.from?.[0]?.name || email.from?.[0]?.email || "Unknown",
      subject: email.subject || "No subject",
      body: bodyText,
    };
  });
}

function extractAiText(response: ResponsesOutput): string {
  const direct = response.output_text?.trim();
  if (direct) return direct;
  return (
    response.output
      ?.filter((item: any) => item.type === "message")
      .flatMap((item: any) => item.content)
      .filter((c: any) => c.type === "output_text")
      .map((c: any) => c.text)
      .join("")
      .trim() ?? ""
  );
}

type Classification = { is_notification: boolean; summary: string };

async function classifyAndSummarize(
  env: CloudflareBindings,
  email: FetchedEmail,
): Promise<Classification | null> {
  const aiResponse = await env.AI.run("@cf/openai/gpt-oss-120b", {
    instructions:
      'You classify emails as "notification-style" (something the user does not need to act on immediately — bank alerts, credit card transactions, bills, receipts, order/shipping updates, newsletters, ads, marketing) vs "not notification-style" (personal mail, anything requiring a reply or action). Respond with a single JSON object, no prose, matching: {"is_notification": boolean, "summary": string}. The summary must be one sentence suitable for a push notification. For bank/credit card transactions include card name, amount, and merchant. For Amazon/shipping include order status and item(s). If is_notification is false, summary may be empty.',
    input: `From: ${email.from}\nSubject: ${email.subject}\n\n${email.body.substring(0, 2000)}`,
  });

  const text = extractAiText(aiResponse);
  if (!text) return null;

  const jsonStart = text.indexOf("{");
  const jsonEnd = text.lastIndexOf("}");
  if (jsonStart === -1 || jsonEnd === -1) return null;

  try {
    const parsed = JSON.parse(text.substring(jsonStart, jsonEnd + 1));
    if (typeof parsed.is_notification !== "boolean") return null;
    return {
      is_notification: parsed.is_notification,
      summary: typeof parsed.summary === "string" ? parsed.summary.trim() : "",
    };
  } catch {
    return null;
  }
}

async function setEmailMailbox(
  session: JmapSession,
  emailId: string,
  mailboxId: string,
): Promise<void> {
  const update = {
    mailboxIds: { [mailboxId]: true },
    "keywords/$seen": true,
  };
  const res = await fetch(session.apiUrl, {
    method: "POST",
    headers: session.headers,
    body: JSON.stringify({
      using: ["urn:ietf:params:jmap:core", "urn:ietf:params:jmap:mail"],
      methodCalls: [
        [
          "Email/set",
          {
            accountId: session.accountId,
            update: { [emailId]: update },
          },
          "0",
        ],
      ],
    }),
  });
  if (!res.ok) throw new Error(`Email/set failed: ${res.status}`);
  const data = (await res.json()) as any;
  const notUpdated = data.methodResponses[0][1].notUpdated;
  if (notUpdated && notUpdated[emailId]) {
    throw new Error(
      `Email/set notUpdated for ${emailId}: ${JSON.stringify(notUpdated[emailId])}`,
    );
  }
}

async function sendWebhook(
  env: CloudflareBindings,
  message: string,
  openUrl: string,
): Promise<boolean> {
  const res = await fetch(env.NOTIFICATION_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, open_url: openUrl }),
  });
  if (!res.ok) {
    console.log(`Webhook failed: ${res.status}`);
    return false;
  }
  return true;
}

async function processInbox(env: CloudflareBindings): Promise<void> {
  const session = await jmapSession(env);
  const { inboxId, notificationsId } = await getMailboxIds(session);
  const emails = await getUnreadInboxEmails(session, inboxId);
  console.log(`Found ${emails.length} unread email(s) in Inbox`);

  for (const email of emails) {
    try {
      const classification = await classifyAndSummarize(env, email);
      if (!classification) {
        console.log(`Classification failed: ${email.subject}`);
        continue;
      }
      if (!classification.is_notification) {
        console.log(`Skipping (not notification): ${email.subject}`);
        continue;
      }
      if (!classification.summary) {
        console.log(`Empty summary: ${email.subject}`);
        continue;
      }

      const token = crypto.randomUUID();
      await env.TOKENS.put(token, email.id, {
        expirationTtl: TOKEN_TTL_SECONDS,
      });
      const openUrl = `https://mailman.george.black/open/${token}`;

      const sent = await sendWebhook(env, classification.summary, openUrl);
      if (!sent) {
        await env.TOKENS.delete(token);
        continue;
      }

      await setEmailMailbox(session, email.id, notificationsId);
      console.log(`Notified & moved: ${email.subject}`);
    } catch (err) {
      console.log(
        `Error processing ${email.subject}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }
}

async function handleOpen(
  env: CloudflareBindings,
  token: string,
): Promise<Response> {
  const emailId = await env.TOKENS.get(token);
  if (!emailId) return new Response("Not found", { status: 404 });

  const session = await jmapSession(env);
  const { inboxId } = await getMailboxIds(session);
  await setEmailMailbox(session, emailId, inboxId);
  await env.TOKENS.delete(token);
  return new Response("ok");
}

export default {
  async fetch(req: Request, env: CloudflareBindings): Promise<Response> {
    const url = new URL(req.url);
    const match = url.pathname.match(/^\/open\/([^/]+)$/);
    if (req.method === "GET" && match) {
      return handleOpen(env, match[1]);
    }
    return new Response("Not found", { status: 404 });
  },

  async scheduled(
    _event: ScheduledController,
    env: CloudflareBindings,
    _ctx: ExecutionContext,
  ): Promise<void> {
    await processInbox(env);
  },
} satisfies ExportedHandler<CloudflareBindings>;
