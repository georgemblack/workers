import type { Context } from "hono";
import { insertAuditEntry } from "./storage";

// Everything recorded in the activity log, and the details kept for each.
// Only actions that succeeded are logged. Passkey labels and client names are
// copied in, so entries still make sense after the passkey or client is gone.
export type AuditEvent =
  | { event: "sign_in"; details: { passkey: string | null; credential_id: string } }
  | {
      event: "app_sign_in";
      details: { client_id: string; client_name: string | null; scope: string };
    }
  | { event: "sign_out"; details: { client_id: string | null } }
  | { event: "sign_out_everywhere"; details: { reason: "button" | "passkey_deleted" } }
  | { event: "passkey_added"; details: { passkey: string | null; credential_id: string } }
  | { event: "passkey_deleted"; details: { passkey: string | null; credential_id: string } }
  | { event: "client_created"; details: { client_id: string; name: string } }
  | { event: "client_deleted"; details: { client_id: string; name: string } };

// Every event name, for checking the filter on the activity page. Listing them
// as keys of this type makes TypeScript complain if one is missing.
const EVENT_NAMES: Record<AuditEvent["event"], true> = {
  sign_in: true,
  app_sign_in: true,
  sign_out: true,
  sign_out_everywhere: true,
  passkey_added: true,
  passkey_deleted: true,
  client_created: true,
  client_deleted: true,
};

export function isAuditEventName(name: string): name is AuditEvent["event"] {
  return Object.hasOwn(EVENT_NAMES, name);
}

// Records an event, along with where the request came from. A failed write is
// logged but doesn't stop what was just done from going through.
export async function logEvent(
  c: Context<{ Bindings: Cloudflare.Env }>,
  { event, details }: AuditEvent,
): Promise<void> {
  const cf = c.req.raw.cf as IncomingRequestCfProperties | undefined;
  try {
    await insertAuditEntry(c.env.DB, {
      event,
      details,
      ip: c.req.header("cf-connecting-ip") ?? null,
      country: cf?.country ?? null,
      region: cf?.region ?? null,
      city: cf?.city ?? null,
      asn: cf?.asn ?? null,
      as_org: cf?.asOrganization ?? null,
      user_agent: c.req.header("user-agent") ?? null,
      ray_id: c.req.header("cf-ray") ?? null,
    });
  } catch (e) {
    console.error("couldn't write to the activity log", event, e);
  }
}
