import { z } from "zod";

export const status = z.enum([
  "inbox",
  "open",
  "waiting",
  "someday",
  "done",
  "dropped",
]);
export const itemInput = z.object({
  title: z.string().trim().min(1).max(300),
  why: z.string().max(6000).default(""),
  details: z.string().max(12000).default(""),
  status: status.default("open"),
  priority: z.enum(["high", "normal", "low"]).default("normal"),
  priority_reason: z.string().max(2000).default(""),
  parent_id: z.string().nullable().default(null),
  timing: z.string().max(2000).default(""),
  due_date: z.iso.date().nullable().default(null),
  scheduled_at: z.iso.datetime({ offset: true }).nullable().default(null),
  timing_source: z
    .enum(["explicit", "inherited", "inferred", "none"])
    .default("none"),
  context_ids: z.array(z.string()).max(30).default([]),
  needs_clarification: z.string().max(3000).default(""),
});
export const captureInput = z.object({
  id: z
    .string()
    .regex(/^[a-zA-Z0-9_-]{1,100}$/)
    .optional(),
  text: z.string().trim().min(1).max(16000),
  source: z.enum(["chat", "apple-shortcuts", "api"]).default("api"),
});
export const contextInput = z.object({
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
export function groupItems(items: Item[]) {
  const sections = new Map<string, Item[]>();
  for (const item of items) {
    if (item.status === "done" || item.status === "dropped") continue;
    const group = item.needs_clarification
      ? "Needs clarification"
      : item.status === "waiting"
        ? "Waiting"
        : item.status === "someday"
          ? "Someday"
          : item.status === "inbox"
            ? "Inbox"
            : item.priority === "high"
              ? "High priority"
              : item.priority === "low"
                ? "Low priority"
                : "On your list";
    sections.set(group, [...(sections.get(group) ?? []), item]);
  }
  return [
    "Needs clarification",
    "High priority",
    "On your list",
    "Low priority",
    "Waiting",
    "Someday",
    "Inbox",
  ].flatMap((title) =>
    sections.has(title) ? [{ title, items: sections.get(title)! }] : [],
  );
}
