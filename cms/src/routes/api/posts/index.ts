import { listPosts } from "@/data/db";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/posts/")({
  server: {
    handlers: {
      GET: async () => Response.json(await listPosts()),
    },
  },
});
