import { createFileRoute } from "@tanstack/react-router";
import { env } from "cloudflare:workers";

export const Route = createFileRoute("/api/links/")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { url: string; title?: string };
        if (!body || !body.url || typeof body.url !== "string") {
          return Response.json({ error: "url is required" }, { status: 400 });
        }

        try {
          new URL(body.url);
        } catch {
          return Response.json({ error: "invalid url" }, { status: 400 });
        }

        await env.LINK_QUEUE.send({ url: body.url, title: body.title });
        return Response.json({ ok: true }, { status: 202 });
      },
    },
  },
});
