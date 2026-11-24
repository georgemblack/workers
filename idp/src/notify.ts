import type { Context } from "hono";
import { ISSUER } from "./constants";
import { PENDING_AUTH_COOKIE, readTxCookie, type PendingAuth } from "./session";
import { getClient } from "./storage";

// Sends a push notification to my phone (via Brrr) when someone signs in.
// It runs in the background after the response is sent, so a slow or failed
// notification never holds up or breaks the sign-in. Failures are just logged.
export function notifySignIn(c: Context<{ Bindings: Cloudflare.Env }>) {
  const url = c.env.BRRR_URL;
  if (!url) return;

  const cf = c.req.raw.cf as IncomingRequestCfProperties | undefined;
  const place = [cf?.city, cf?.region, cf?.country].filter(Boolean).join(", ");

  const send = async () => {
    try {
      // If this sign-in started from an app, /authorize left a cookie saying which one.
      const pending = await readTxCookie<PendingAuth>(c, PENDING_AUTH_COOKIE);
      const client = pending ? await getClient(c.env.DB, pending.client_id) : null;
      const app = client?.name ?? "the IdP";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "New sign-in",
          message: `Signed into ${app} from ${place || "an unknown location"}`,
          thread_id: "idp-sign-ins",
          icon_url: "https://george.black/icons/apple-touch-icon.png",
          open_url: `${ISSUER}/admin/activity`,
        }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) {
        console.error("couldn't send sign-in notification", res.status, await res.text());
      }
    } catch (e) {
      console.error("couldn't send sign-in notification", e);
    }
  };
  c.executionCtx.waitUntil(send());
}
