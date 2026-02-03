import { z } from "zod";

export type PostStatus = "DRAFT" | "PUBLISHED" | "IDEA" | "HIDDEN";

export interface HeadingBlock {
  type: "heading";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
}

export interface ParagraphBlock {
  type: "paragraph";
  text: string; // Markdown
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

export type ContentBlock =
  | HeadingBlock
  | ParagraphBlock
  | ImageBlock
  | VideoBlock;

export interface Post {
  id: string;
  title: string;
  published: string;
  updated: string;
  slug: string;
  status: PostStatus;
  external_link: string | null;
  content: ContentBlock[];
}

export interface PostListItem {
  id: string;
  title: string;
  published: string;
  status: PostStatus;
}

// Zod schemas for DB inputs
const postStatusSchema = z.enum(["DRAFT", "PUBLISHED", "IDEA", "HIDDEN"]);
const iso8601String = z.iso.datetime();
const slugString = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/);
const urlString = z.string().url().nullable();

// Content Block Zod Schemas
const headingBlockSchema = z.object({
  type: z.literal("heading"),
  level: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
    z.literal(6),
  ]),
  text: z.string(),
});

const paragraphBlockSchema = z.object({
  type: z.literal("paragraph"),
  text: z.string(),
});

const imageBlockSchema = z.object({
  type: z.literal("image"),
  path: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
});

const videoBlockSchema = z.object({
  type: z.literal("video"),
  path: z.string(),
  caption: z.string().optional(),
});

const contentBlockSchema = z.discriminatedUnion("type", [
  headingBlockSchema,
  paragraphBlockSchema,
  imageBlockSchema,
  videoBlockSchema,
]);

export const createPostInputSchema = z.object({
  title: z.string(),
  published: iso8601String,
  updated: iso8601String,
  slug: slugString,
  status: postStatusSchema,
  content: z.array(contentBlockSchema),
  external_link: urlString,
});

export const updatePostInputSchema = z.object({
  id: z.string(),
  title: z.string(),
  published: iso8601String,
  slug: slugString,
  status: postStatusSchema,
  content: z.array(contentBlockSchema),
  external_link: urlString,
});

export type CreatePostInput = z.infer<typeof createPostInputSchema>;
export type UpdatePostInput = z.infer<typeof updatePostInputSchema>;
