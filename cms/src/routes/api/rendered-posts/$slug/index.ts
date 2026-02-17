import { getRenderedPost } from "@/data/db";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/rendered-posts/$slug/")({
  server: {
    handlers: {
      GET: async ({ params }) =>
        Response.json(await getRenderedPost({ data: params.slug })),
    },
  },
});
