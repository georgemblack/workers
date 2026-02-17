import { env } from "cloudflare:workers";
import { createServerFn } from "@tanstack/react-start";
import {
  createPostInputSchema,
  ContentBlock,
  Post,
  PostListItem,
  PostStatus,
  RenderedPost,
  updatePostInputSchema,
} from "./types";
import { render, renderPreview } from "./transform";

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

export const getRenderedPost = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }): Promise<RenderedPost | null> => {
    const row = await env.WEB_DB.prepare(
      "SELECT id, title, published, updated, slug, status, hidden, gallery, external_link, content, content_html, preview_html FROM posts WHERE slug = ? AND deleted = 0",
    )
      .bind(slug)
      .first<{
        id: string;
        title: string;
        published: string;
        updated: string;
        slug: string;
        status: PostStatus;
        hidden: number;
        gallery: number;
        external_link: string | null;
        content: string;
        content_html: string;
        preview_html: string | null;
      }>();

    if (!row) {
      return null;
    }

    const blocks = JSON.parse(row.content) as ContentBlock[];
    const images = blocks
      .filter(
        (block): block is ContentBlock & { type: "image" } =>
          block.type === "image",
      )
      .map((block) => block.url);

    return {
      id: row.id,
      title: row.title,
      published: row.published,
      updated: row.updated,
      slug: row.slug,
      status: row.status,
      hidden: row.hidden === 1,
      gallery: row.gallery === 1,
      external_link: row.external_link,
      content_html: row.content_html,
      preview_html: row.preview_html,
      images,
    };
  });

export interface ListPostsFilters {
  hidden?: boolean;
  state?: PostStatus;
}

export const listPosts = createServerFn({ method: "GET" })
  .inputValidator((input: ListPostsFilters | undefined) => input)
  .handler(async ({ data: filters }): Promise<PostListItem[]> => {
    let query =
      "SELECT id, title, published, status, hidden, gallery FROM posts WHERE deleted = 0";
    const bindings: (string | number)[] = [];

    if (filters?.hidden !== undefined) {
      query += " AND hidden = ?";
      bindings.push(filters.hidden ? 1 : 0);
    }

    if (filters?.state !== undefined) {
      query += " AND status = ?";
      bindings.push(filters.state);
    }

    query += " ORDER BY published DESC";

    const result = await env.WEB_DB.prepare(query)
      .bind(...bindings)
      .all<
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
  });

export const createPost = createServerFn({ method: "POST" })
  .inputValidator(createPostInputSchema)
  .handler(async ({ data: input }): Promise<Post> => {
    const id = crypto.randomUUID();
    const contentHtml = render(input.content);
    const previewHtml = renderPreview(input.content);

    await env.WEB_DB.prepare(
      "INSERT INTO posts (id, title, published, updated, slug, status, hidden, gallery, external_link, content, content_html, preview_html) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
        contentHtml,
        previewHtml,
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
    const contentHtml = render(input.content);
    const previewHtml = renderPreview(input.content);

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
      "UPDATE posts SET title = ?, published = ?, updated = ?, slug = ?, status = ?, hidden = ?, gallery = ?, external_link = ?, content = ?, content_html = ?, preview_html = ? WHERE id = ?",
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
        contentHtml,
        previewHtml,
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
