import { env } from "cloudflare:workers";
import { createServerFn } from "@tanstack/react-start";

export interface Link {
  id: number;
  url: string;
  title: string | null;
  description: string | null;
  created_at: string;
}

export const listLinks = createServerFn({ method: "GET" }).handler(
  async (): Promise<Link[]> => {
    const result = await env.DB.prepare(
      "SELECT id, url, title, description, created_at FROM links ORDER BY created_at DESC",
    ).all<Link>();
    return result.results;
  },
);

export const deleteLink = createServerFn({ method: "POST" })
  .inputValidator((id: number) => id)
  .handler(async ({ data: id }): Promise<void> => {
    await env.DB.prepare("DELETE FROM links WHERE id = ?").bind(id).run();
  });

export const addLink = createServerFn({ method: "POST" })
  .inputValidator((url: string) => url)
  .handler(async ({ data: url }): Promise<void> => {
    await env.LINK_QUEUE.send({ url });
  });
