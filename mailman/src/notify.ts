import { createOpenToken, deleteOpenToken } from "./state";

const OPEN_URL_BASE = "https://mailman.george.black/open/";

// Sends a push notification whose link moves the email back to the inbox when tapped.
// Throws if the webhook rejects it.
export async function sendNotification(
  env: CloudflareBindings,
  emailId: string,
  message: string,
): Promise<void> {
  const token = await createOpenToken(env, emailId);
  const res = await fetch(env.NOTIFICATION_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, open_url: OPEN_URL_BASE + token }),
  });
  if (!res.ok) {
    await deleteOpenToken(env, token);
    throw new Error(`Webhook failed: ${res.status} ${(await res.text()).substring(0, 500)}`);
  }
}
