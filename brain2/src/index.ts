import { guard, securityHeaders } from "./guard";
import { ZodError } from "zod";
import { Brain2, type Env } from "./agent";
import { page } from "./temp-ui/ui";
import { renderMarkdown } from "./markdown";
import { captureInput } from "./store";
export { Brain2 };

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
        return new Response(page, {
          headers: {
            ...headers,
            "Content-Type": "text/html; charset=utf-8",
            "Content-Security-Policy":
              "default-src 'self'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'",
          },
        });
      // Temporary: feeds the temporary chat page until plan 06 adds /api/state.
      if (request.method === "GET" && url.pathname === "/api/chat") {
        const state = await agent.conversationSnapshot();
        return Response.json(
          {
            messages: state.messages.map((message) => ({
              ...message,
              html: message.result.text
                ? renderMarkdown(message.result.text)
                : "",
            })),
          },
          { headers },
        );
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
