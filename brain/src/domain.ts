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
// Items saved before notes/target existed. Their old text fields are folded
// into notes so nothing the agent wrote is lost.
const legacyItem = z.looseObject({
  why: z.string().default(""),
  details: z.string().default(""),
  timing: z.string().default(""),
  waiting_for: z.string().default(""),
  needs_clarification: z.string().default(""),
  scheduled_at: z.string().nullable().default(null),
  follow_up_at: z.string().nullable().default(null),
  status: z.string().optional(),
  due_date: z.string().nullable().default(null),
});
const legacyFields = [
  "why",
  "details",
  "priority_reason",
  "timing",
  "timing_source",
  "scheduled_at",
  "follow_up_at",
  "waiting_for",
  "needs_clarification",
];
export function upgradeItem(data: Record<string, unknown>) {
  if (!legacyFields.some((key) => key in data)) return null;
  const old = legacyItem.parse(data);
  const notes = [
    old.why,
    old.details === old.why ? "" : old.details,
    old.waiting_for && `Waiting for: ${old.waiting_for}`,
    old.timing && `Timing: ${old.timing}`,
    old.scheduled_at && `Scheduled for ${old.scheduled_at}`,
    old.needs_clarification && `Open question: ${old.needs_clarification}`,
  ]
    .filter(Boolean)
    .join("\n\n");
  const rest = Object.fromEntries(
    Object.entries(data).filter(([key]) => !legacyFields.includes(key)),
  );
  return itemInput.parse({
    ...rest,
    notes: notes.slice(0, 12000),
    status: old.status === "inbox" ? "open" : old.status,
    due_date:
      old.due_date ??
      old.follow_up_at ??
      old.scheduled_at?.slice(0, 10) ??
      null,
  });
}
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
