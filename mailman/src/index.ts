// Mailman sorts unread Fastmail inbox email on a schedule: Workers AI classifies each email,
// then it's either left in the inbox or moved (with an optional push notification).
// See rules.ts for the categories and what happens to each.

import { getConfig, moveAndMarkRead } from "./fastmail";
import { processInbox } from "./inbox";
import { deleteOpenToken, getOpenToken } from "./state";

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

// Tapping a notification opens /open/<token>, which moves that email back to the inbox.
async function handleOpen(env: CloudflareBindings, token: string): Promise<Response> {
  const emailId = await getOpenToken(env, token);
  if (!emailId) return new Response("Not found", { status: 404 });

  const config = await getConfig(env);
  await moveAndMarkRead(env, config, emailId, "inbox");
  await deleteOpenToken(env, token);
  return new Response("ok");
}

export default {
  async fetch(req: Request, env: CloudflareBindings): Promise<Response> {
    const match = new URL(req.url).pathname.match(/^\/open\/([^/]+)$/);
    if (req.method !== "GET" || !match) return new Response("Not found", { status: 404 });

    try {
      return await handleOpen(env, match[1]);
    } catch (err) {
      console.error({ event: "open", error: errorMessage(err) });
      return new Response("Error", { status: 500 });
    }
  },

  async scheduled(_event: ScheduledController, env: CloudflareBindings): Promise<void> {
    try {
      await processInbox(env);
    } catch (err) {
      console.error({ event: "run", error: errorMessage(err) });
      // Rethrow so the cron invocation is marked as failed.
      throw err;
    }
  },
} satisfies ExportedHandler<CloudflareBindings>;
