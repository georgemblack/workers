import { getPost } from "@/data/db";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/posts/$postId")({
  server: {
    handlers: {
      GET: async ({ params }) =>
        Response.json(await getPost({ data: params.postId })),
    },
  },
});
