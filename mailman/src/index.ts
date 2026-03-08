const MAILBOX_NAME = "Notifications";

async function checkMailAndNotify(
  env: CloudflareBindings,
  now: Date,
): Promise<string> {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${env.FASTMAIL_API_KEY}`,
  };

  // Discover JMAP session
  const sessionRes = await fetch("https://api.fastmail.com/jmap/session/", {
    headers,
  });
  if (!sessionRes.ok)
    throw new Error(`Session discovery failed: ${sessionRes.status}`);
  const session = (await sessionRes.json()) as any;
  const accountId = session.primaryAccounts["urn:ietf:params:jmap:mail"];
  const apiUrl: string = session.apiUrl;

  // Find mailbox by name
  const mailboxRes = await fetch(apiUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({
      using: ["urn:ietf:params:jmap:core", "urn:ietf:params:jmap:mail"],
      methodCalls: [
        ["Mailbox/query", { accountId, filter: { name: MAILBOX_NAME } }, "0"],
      ],
    }),
  });
  const mailboxData = (await mailboxRes.json()) as any;
  const mailboxIds: string[] = mailboxData.methodResponses[0][1].ids;
  if (!mailboxIds || mailboxIds.length === 0) {
    const msg = `Mailbox "${MAILBOX_NAME}" not found`;
    console.log(msg);
    return msg;
  }
  const mailboxId = mailboxIds[0];

  // Query emails from last hour and fetch their details
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000).toISOString();
  const emailRes = await fetch(apiUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({
      using: ["urn:ietf:params:jmap:core", "urn:ietf:params:jmap:mail"],
      methodCalls: [
        [
          "Email/query",
          { accountId, filter: { inMailbox: mailboxId, after: oneHourAgo } },
          "0",
        ],
        [
          "Email/get",
          {
            accountId,
            "#ids": { resultOf: "0", name: "Email/query", path: "/ids" },
            properties: ["subject", "from", "textBody", "bodyValues"],
            fetchTextBodyValues: true,
          },
          "1",
        ],
      ],
    }),
  });
  const emailData = (await emailRes.json()) as any;

  const queryResult = emailData.methodResponses[0][1];
  if (!queryResult.ids || queryResult.ids.length === 0) {
    const msg = "No new emails in the last hour";
    console.log(msg);
    return msg;
  }

  const emails: any[] = emailData.methodResponses[1][1].list;
  console.log(`Found ${emails.length} email(s) in the last hour`);
  const results: string[] = [];

  // Summarize and notify for each email
  for (const email of emails) {
    const from = email.from?.[0]?.name || email.from?.[0]?.email || "Unknown";
    const subject = email.subject || "No subject";
    const bodyPartId = email.textBody?.[0]?.partId;
    const bodyText = bodyPartId
      ? email.bodyValues?.[bodyPartId]?.value || ""
      : "";
    const truncatedBody = bodyText.substring(0, 2000);

    const aiResponse = await env.AI.run("@cf/openai/gpt-oss-120b", {
      instructions:
        "Summarize the following email in one sentence, suitable for a push notification. For bank/credit card transactions, include the card name, amount, and merchant. For Amazon purchases, include the order status and item(s). Only output the summary, nothing else.",
      input: `From: ${from}\nSubject: ${subject}\n\n${truncatedBody}`,
    });

    const summary = (aiResponse as any).response?.trim();
    if (!summary) {
      console.log(`Failed to summarize email: ${subject}`);
      results.push(`FAILED: ${subject}`);
      continue;
    }

    const notifRes = await fetch(env.NOTIFICATION_WEBHOOK_URL, {
      method: "POST",
      body: summary,
    });

    if (!notifRes.ok) {
      console.log(`Failed to send notification: ${notifRes.status}`);
      results.push(`NOTIF FAILED: ${summary}`);
    } else {
      console.log(`Notification sent: ${summary}`);
      results.push(`SENT: ${summary}`);
    }
  }

  return results.join("\n");
}

export default {
  async fetch(req: Request, env: CloudflareBindings): Promise<Response> {
    const url = new URL(req.url);
    const nowParam = url.searchParams.get("now");
    const now = nowParam ? new Date(nowParam) : new Date();

    if (isNaN(now.getTime())) {
      return new Response("Invalid 'now' parameter", { status: 400 });
    }

    const result = await checkMailAndNotify(env, now);
    return new Response(result);
  },

  async scheduled(
    event: ScheduledController,
    env: CloudflareBindings,
    ctx: ExecutionContext,
  ): Promise<void> {
    await checkMailAndNotify(env, new Date(event.scheduledTime));
  },
} satisfies ExportedHandler<CloudflareBindings>;
