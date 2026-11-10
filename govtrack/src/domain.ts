import { z } from "zod";

export const sentiment = z.enum(["positive", "neutral", "negative"]);
export type Sentiment = z.infer<typeof sentiment>;

// Only web links: the timeline renders these as clickable anchors.
const webUrl = z.url({ protocol: /^https?$/ }).max(2000);
export const sourceInput = z.object({
  url: webUrl,
  title: z.string().trim().max(300).default(""),
});

export const politicianInput = z.object({
  name: z.string().trim().min(1).max(200),
  // Their role, e.g. "Alderperson, Ward 3" or "Mayor".
  office: z.string().trim().max(200).default(""),
  notes: z.string().max(4000).default(""),
});
export const eventInput = z.object({
  politician_id: z.string().min(1),
  // The day the action happened.
  date: z.iso.date(),
  sentiment,
  summary: z.string().trim().min(1).max(1000),
  sources: z.array(sourceInput).min(1).max(10),
});
export const recordTypes = { politician: politicianInput, event: eventInput };
export type RecordType = keyof typeof recordTypes;

type Meta = {
  id: string;
  version: number;
  updated_at: string;
  source_id: string;
};
export type Politician = z.infer<typeof politicianInput> & Meta;
export type Event = z.infer<typeof eventInput> & Meta;

export const captureInput = z.object({
  id: z
    .string()
    .regex(/^[a-zA-Z0-9_-]{1,100}$/)
    .optional(),
  text: z.string().trim().min(1).max(16000),
  source: z.enum(["chat", "apple-shortcuts", "api"]).default("chat"),
});

export function ftsQuery(query: string) {
  return (query.match(/[\p{L}\p{N}]+/gu) ?? [])
    .slice(0, 20)
    .map((word) => `"${word}"`)
    .join(" OR ");
}
