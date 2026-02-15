import { createPost, listPosts } from "@/data/db";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/posts/")({
  server: {
    handlers: {
      GET: async () => Response.json(await listPosts()),
      POST: async ({ request }) => {
        const post = await createPost({
          data: await request.json(),
        });
        return Response.json(post, { status: 201 });
      },
    },
  },
});
