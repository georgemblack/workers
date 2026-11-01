import { z } from "zod";

export const status = z.enum(["open", "waiting", "someday", "done", "dropped"]);
export const itemInput = z.object({
  title: z.string().trim().min(1).max(300),
  notes: z.string().max(12000).default(""),
  status: status.default("open"),
  priority: z.enum(["high", "normal", "low"]).default("normal"),
  parent_id: z.string().nullable().default(null),
  area_id: z.string().nullable().default(null),
  due_date: z.iso.date().nullable().default(null),
  target: z.string().trim().max(80).default(""),
  context_ids: z.array(z.string()).max(30).default([]),
});
export const captureInput = z.object({
  id: z
    .string()
    .regex(/^[a-zA-Z0-9_-]{1,100}$/)
    .optional(),
  text: z.string().trim().min(1).max(16000),
  source: z.enum(["chat", "apple-shortcuts", "api"]).default("apple-shortcuts"),
});
export const contextInput = z.object({
  core: z.boolean().default(false),
  title: z.string().trim().min(1).max(300),
  body: z.string().min(1).max(12000),
  evidence: z.string().min(1).max(6000),
});
export type ItemInput = z.infer<typeof itemInput>;
export type Item = ItemInput & {
  id: string;
  version: number;
  updated_at: string;
  source_id: string;
};
export function ftsQuery(query: string) {
  return (query.match(/[\p{L}\p{N}]+/gu) ?? [])
    .slice(0, 20)
    .map((word) => `"${word}"`)
    .join(" OR ");
}
