import { z } from "zod";

export type PostStatus = "draft" | "published";

export interface MarkdownBlock {
  type: "markdown";
  text: string;
}

export interface ImageBlock {
  type: "image";
  path: string;
  alt: string;
  caption?: string;
}

export interface VideoBlock {
  type: "video";
  path: string;
  caption?: string;
}

export type ContentBlock = MarkdownBlock | ImageBlock | VideoBlock;

export interface Post {
  id: string;
  title: string;
  published: string;
  updated: string;
  slug: string;
  status: PostStatus;
  hidden: boolean;
  external_link: string | null;
  content: ContentBlock[];
}

export interface PostListItem {
  id: string;
  title: string;
  published: string;
  status: PostStatus;
  hidden: boolean;
}

// Zod schemas for DB inputs
const postStatusSchema = z.enum(["draft", "published"]);
const iso8601String = z.iso.datetime();
const slugString = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/);
const urlString = z.string().url().nullable();

// Content Block Zod Schemas
const markdownBlockSchema = z.object({
  type: z.literal("markdown"),
  text: z.string().min(1),
});

const imageBlockSchema = z.object({
  type: z.literal("image"),
  path: z.string().min(1),
  alt: z.string().min(1),
  caption: z.string().optional(),
});

const videoBlockSchema = z.object({
  type: z.literal("video"),
  path: z.string().min(1),
  caption: z.string().optional(),
});

const contentBlockSchema = z.discriminatedUnion("type", [
  markdownBlockSchema,
  imageBlockSchema,
  videoBlockSchema,
]);

export const createPostInputSchema = z.object({
  title: z.string(),
  published: iso8601String,
  updated: iso8601String,
  slug: slugString,
  status: postStatusSchema,
  hidden: z.boolean(),
  content: z.array(contentBlockSchema),
  external_link: urlString,
});

export const updatePostInputSchema = z.object({
  id: z.string(),
  title: z.string(),
  published: iso8601String,
  slug: slugString,
  status: postStatusSchema,
  hidden: z.boolean(),
  content: z.array(contentBlockSchema),
  external_link: urlString,
});

export type CreatePostInput = z.infer<typeof createPostInputSchema>;
export type UpdatePostInput = z.infer<typeof updatePostInputSchema>;
