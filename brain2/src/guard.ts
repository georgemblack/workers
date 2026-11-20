import { requireAccess } from "./access";

export type GuardEnv = { ACCESS_AUD: string; LOCAL_DEV?: string };

export const securityHeaders = {
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "same-origin",
};

/** Largest request body allowed: imports are bigger than messages. */
export function maxBody(url: URL) {
  return url.pathname === "/api/admin/import" ? 5_000_000 : 100_000;
}

/**
 * Checks Access and basic request rules before any route runs. Returns a
 * response to send back when the request is refused, otherwise null.
 */
export async function guard(
  request: Request,
  env: GuardEnv,
  ctx: Pick<ExecutionContext, "access">,
): Promise<Response | null> {
  const url = new URL(request.url);
  let service = false;
  // The Access bypass only ever applies to a local dev server.
  if (!(
    env.LOCAL_DEV === "true" &&
    ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)
  )) {
    const authorization = await requireAccess(ctx, env.ACCESS_AUD);
    if (authorization instanceof Response) return authorization;
    service = authorization.service;
  }
  // Service tokens (Apple Shortcuts) can send messages and nothing else.
  if (
    service &&
    !(request.method === "POST" && url.pathname === "/api/messages")
  )
    return Response.json(
      { error: "Service tokens may only capture messages" },
      { status: 403, headers: securityHeaders },
    );
  if (!["GET", "HEAD"].includes(request.method)) {
    if (
      request.headers.get("Origin") &&
      request.headers.get("Origin") !== url.origin
    )
      return new Response("Forbidden origin", { status: 403 });
    if (!request.headers.get("Content-Type")?.startsWith("application/json"))
      return Response.json({ error: "Use application/json" }, { status: 415 });
    if (Number(request.headers.get("Content-Length") ?? 0) > maxBody(url))
      return new Response("Message too large", { status: 413 });
  }
  return null;
}
