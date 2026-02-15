import { getPostHtml } from "@/data/db";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/posts/$postId/html/")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const html = await getPostHtml({ data: params.postId });
        if (html === null) {
          return new Response("Not found", { status: 404 });
        }
        return new Response(html, {
          headers: { "Content-Type": "text/html" },
        });
      },
    },
  },
});
