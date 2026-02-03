import { env } from "cloudflare:workers";
import { createServerFn } from "@tanstack/react-start";
import {
  createPostInputSchema,
  ContentBlock,
  Post,
  PostListItem,
  updatePostInputSchema,
} from "./types";

export const getPost = createServerFn({ method: "GET" })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }): Promise<Post | null> => {
    const row = await env.WEB_DB.prepare(
      "SELECT id, title, published, updated, slug, status, external_link, content FROM posts WHERE id = ?",
    )
      .bind(id)
      .first<Omit<Post, "content"> & { content: string }>();

    if (!row) {
      return null;
    }

    return {
      ...row,
      content: JSON.parse(row.content) as ContentBlock[],
    };
  });

export const listPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<PostListItem[]> => {
    const result = await env.WEB_DB.prepare(
      "SELECT id, title, published FROM posts ORDER BY published DESC",
    ).all<PostListItem>();
    return result.results;
  },
);

export const createPost = createServerFn({ method: "POST" })
  .inputValidator(createPostInputSchema)
  .handler(async ({ data: input }): Promise<Post> => {
    const id = crypto.randomUUID();

    await env.WEB_DB.prepare(
      "INSERT INTO posts (id, title, published, updated, slug, status, external_link, content) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    )
      .bind(
        id,
        input.title,
        input.published,
        input.updated,
        input.slug,
        input.status,
        input.external_link,
        JSON.stringify(input.content),
      )
      .run();

    return {
      id,
      title: input.title,
      published: input.published,
      updated: input.updated,
      slug: input.slug,
      status: input.status,
      external_link: input.external_link,
      content: input.content,
    };
  });

export const updatePost = createServerFn({ method: "POST" })
  .inputValidator(updatePostInputSchema)
  .handler(async ({ data: input }): Promise<Post | null> => {
    const existing = await getPost({ data: input.id });
    if (!existing) {
      return null;
    }

    const updated = new Date().toISOString();
    const newPost: Post = {
      id: input.id,
      title: input.title,
      published: input.published,
      updated,
      slug: input.slug,
      status: input.status,
      external_link: input.external_link,
      content: input.content,
    };

    await env.WEB_DB.prepare(
      "UPDATE posts SET title = ?, published = ?, updated = ?, slug = ?, status = ?, external_link = ?, content = ? WHERE id = ?",
    )
      .bind(
        newPost.title,
        newPost.published,
        newPost.updated,
        newPost.slug,
        newPost.status,
        newPost.external_link,
        JSON.stringify(newPost.content),
        input.id,
      )
      .run();

    return newPost;
  });
