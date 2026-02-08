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
      "SELECT id, title, published, updated, slug, status, hidden, gallery, external_link, content FROM posts WHERE id = ? AND deleted = 0",
    )
      .bind(id)
      .first<
        Omit<Post, "content" | "hidden" | "gallery"> & {
          content: string;
          hidden: number;
          gallery: number;
        }
      >();

    if (!row) {
      return null;
    }

    return {
      ...row,
      hidden: row.hidden === 1,
      gallery: row.gallery === 1,
      content: JSON.parse(row.content) as ContentBlock[],
    };
  });

export const listPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<PostListItem[]> => {
    const result = await env.WEB_DB.prepare(
      "SELECT id, title, published, status, hidden, gallery FROM posts WHERE deleted = 0 ORDER BY published DESC",
    ).all<
      Omit<PostListItem, "hidden" | "gallery"> & {
        hidden: number;
        gallery: number;
      }
    >();
    return result.results.map((row) => ({
      ...row,
      hidden: row.hidden === 1,
      gallery: row.gallery === 1,
    }));
  },
);

export const createPost = createServerFn({ method: "POST" })
  .inputValidator(createPostInputSchema)
  .handler(async ({ data: input }): Promise<Post> => {
    const id = crypto.randomUUID();

    await env.WEB_DB.prepare(
      "INSERT INTO posts (id, title, published, updated, slug, status, hidden, gallery, external_link, content) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    )
      .bind(
        id,
        input.title,
        input.published,
        input.updated,
        input.slug,
        input.status,
        input.hidden ? 1 : 0,
        input.gallery ? 1 : 0,
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
      hidden: input.hidden,
      gallery: input.gallery,
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
      hidden: input.hidden,
      gallery: input.gallery,
      external_link: input.external_link,
      content: input.content,
    };

    await env.WEB_DB.prepare(
      "UPDATE posts SET title = ?, published = ?, updated = ?, slug = ?, status = ?, hidden = ?, gallery = ?, external_link = ?, content = ? WHERE id = ?",
    )
      .bind(
        newPost.title,
        newPost.published,
        newPost.updated,
        newPost.slug,
        newPost.status,
        newPost.hidden ? 1 : 0,
        newPost.gallery ? 1 : 0,
        newPost.external_link,
        JSON.stringify(newPost.content),
        input.id,
      )
      .run();

    return newPost;
  });

export const deletePost = createServerFn({ method: "POST" })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }): Promise<boolean> => {
    await env.WEB_DB.prepare("UPDATE posts SET deleted = 1 WHERE id = ?")
      .bind(id)
      .run();
    return true;
  });
