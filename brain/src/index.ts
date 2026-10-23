import { requireAccess } from "./access";
import { ZodError } from "zod";
import { Brain, type Env } from "./agent";
import { page } from "./ui";
import { renderMarkdown } from "./markdown";
export { Brain };

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const url = new URL(request.url);
    let service = false;
    if (!(
      env.LOCAL_DEV === "true" &&
      ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)
    )) {
      const authorization = await requireAccess(ctx, env.ACCESS_AUD);
      if (authorization instanceof Response) return authorization;
      service = authorization.service;
    }

    const headers = {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "same-origin",
    };
    if (
      service &&
      !(request.method === "POST" && url.pathname === "/api/messages")
    )
      return Response.json(
        { error: "Service tokens may only capture messages" },
        { status: 403, headers },
      );
    if (!["GET", "HEAD"].includes(request.method)) {
      if (
        request.headers.get("Origin") &&
        request.headers.get("Origin") !== url.origin
      )
        return new Response("Forbidden origin", { status: 403 });
      if (!request.headers.get("Content-Type")?.startsWith("application/json"))
        return Response.json(
          { error: "Use application/json" },
          { status: 415 },
        );
      if (Number(request.headers.get("Content-Length") ?? 0) > 100000)
        return new Response("Message too large", { status: 413 });
    }
    const agent = env.BRAIN.getByName("personal");
    try {
      if (request.method === "GET" && ["/", "/chat"].includes(url.pathname))
        return new Response(page, {
          headers: {
            ...headers,
            "Content-Type": "text/html; charset=utf-8",
            "Content-Security-Policy":
              "default-src 'self'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'",
          },
        });
      if (request.method === "GET" && url.pathname === "/api/state") {
        const state = await agent.snapshot();
        return Response.json(
          {
            ...state,
            messages: state.messages.map((message) => ({
              ...message,
              html:
                "text" in message.result && message.result.text
                  ? renderMarkdown(message.result.text)
                  : "",
            })),
          },
          { headers },
        );
      }
      if (request.method === "POST" && url.pathname === "/api/messages") {
        const text = await request.text();
        if (text.length > 24000)
          return new Response("Message too large", { status: 413 });
        return Response.json(await agent.capture(JSON.parse(text)), {
          status: 202,
          headers,
        });
      }
      if (request.method === "POST" && url.pathname === "/api/retry")
        return Response.json(await agent.retry(), { headers });
      const change = url.pathname.match(/^\/api\/changes\/([^/]+)\/undo$/);
      if (request.method === "POST" && change)
        return Response.json(await agent.undo(decodeURIComponent(change[1])), {
          headers,
        });
      const item = url.pathname.match(/^\/api\/items\/([^/]+)$/);
      if (request.method === "PATCH" && item)
        return Response.json(await agent.edit(item[1], await request.json()), {
          headers,
        });
      return new Response("Not found", { status: 404, headers });
    } catch (error) {
      if (error instanceof ZodError || error instanceof SyntaxError)
        return Response.json(
          { error: "Invalid request", detail: error.message },
          { status: 400, headers },
        );
      // RPC errors may arrive without their original prototype.
      const message = error instanceof Error ? error.message : "Request failed";
      if (/Version conflict|Capture ID already/.test(message))
        return Response.json({ error: message }, { status: 409, headers });
      console.error("brain request failed", error);
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
