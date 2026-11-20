import { guard, securityHeaders } from "./guard";
import { ZodError } from "zod";
import { Brain2, type Env } from "./agent";
import { script, styles } from "./generated/client";
import { captureInput } from "./store";
export { Brain2 };

// The app shell. Everything else is loaded from /app.js and /app.css, so the
// page needs no inline script or style.
const shell = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="color-scheme" content="light dark">
<title>brain</title>
<link rel="stylesheet" href="/app.css">
<script src="/app.js" defer></script>
</head>
<body>
<div id="app"></div>
</body>
</html>`;
const csp =
  "default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'";

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const refused = await guard(request, env, ctx);
    if (refused) return refused;
    const url = new URL(request.url);
    const headers = securityHeaders;
    const agent = env.BRAIN.getByName("personal");
    try {
      if (request.method === "GET" && url.pathname === "/")
        return new Response(shell, {
          headers: {
            ...headers,
            "Content-Type": "text/html; charset=utf-8",
            "Content-Security-Policy": csp,
          },
        });
      if (request.method === "GET" && url.pathname === "/app.js")
        return new Response(script, {
          headers: {
            ...headers,
            "Content-Type": "text/javascript; charset=utf-8",
          },
        });
      if (request.method === "GET" && url.pathname === "/app.css")
        return new Response(styles, {
          headers: { ...headers, "Content-Type": "text/css; charset=utf-8" },
        });
      if (request.method === "GET" && url.pathname === "/api/state") {
        const param = url.searchParams.get("rev");
        const state = await agent.stateSnapshot(
          param === null ? undefined : Number(param),
        );
        return state
          ? Response.json(state, { headers })
          : new Response(null, { status: 204, headers });
      }
      const node = url.pathname.match(/^\/api\/nodes\/([^/]+)$/);
      if (request.method === "GET" && node) {
        const detail = await agent.nodeDetail(decodeURIComponent(node[1]));
        return detail
          ? Response.json(detail, { headers })
          : Response.json({ error: "Not found" }, { status: 404, headers });
      }
      if (request.method === "GET" && url.pathname === "/api/diagnostics")
        return Response.json(await agent.diagnostics(), { headers });
      if (request.method === "POST" && url.pathname === "/api/messages") {
        const text = await request.text();
        if (text.length > 24000)
          return new Response("Message too large", { status: 413 });
        return Response.json(
          await agent.capture(captureInput.parse(JSON.parse(text))),
          { status: 202, headers },
        );
      }
      if (request.method === "POST" && url.pathname === "/api/retry")
        return Response.json(await agent.retry(), { headers });
      return new Response("Not found", { status: 404, headers });
    } catch (error) {
      if (error instanceof ZodError || error instanceof SyntaxError)
        return Response.json(
          { error: "Invalid request", detail: error.message },
          { status: 400, headers },
        );
      // RPC errors may arrive without their original prototype.
      const message = error instanceof Error ? error.message : "Request failed";
      if (/Capture ID already/.test(message))
        return Response.json({ error: message }, { status: 409, headers });
      console.error("brain2 request failed", error);
      return Response.json(
        {
          error:
            "Could not process the request. Retry with the same message ID to avoid duplicates.",
        },
        { status: 503, headers },
      );
    }
  },
};
