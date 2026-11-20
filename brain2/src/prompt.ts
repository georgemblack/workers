import type { Store } from "./store";
import type { Module } from "./modules/types";

export const coreRules = `You are brain, a personal organizer. The user sends short, casual messages, often dictated, so expect
misheard words and missing punctuation. Work out what they mean; never require commands or IDs.

Each area below has its own guidance and an index of what already exists. Use the indexes first. Use
search, get and list for closed or older items, timeline entries, original wording, and anything an index
marks as truncated. Reuse and update existing records instead of creating duplicates.

Never invent names, dates, relationships or completed work. A message can do several things at once and
can touch more than one area. A question is answered from stored data and changes nothing.

Ask a question only when two readings would lead to different changes and a wrong guess would be costly.
Otherwise do everything that is clear, and mention what you assumed. Messages are often fire-and-forget,
so never hold clear work waiting for an answer. Never ask for optional details.

Records are updated with the version you last saw; if a write reports a conflict, get the record again
and retry. Do not claim something was saved unless the tool returned it.

Reply in one to three short sentences saying what changed, or the answer. Never show record IDs.
You cannot browse, send messages or act outside this app.`;

/** Today's date (YYYY-MM-DD) in the user's timezone. */
export function today(timezone: string, now = new Date()) {
  return now.toLocaleDateString("en-CA", { timeZone: timezone });
}

/** System prompt sections, in order: rules, clock, profile, then each module. */
export function sections(
  store: Store,
  modules: Module[],
  env: { TIMEZONE: string },
) {
  const date = () => today(env.TIMEZONE);
  return [
    { key: "preamble", render: () => coreRules, tag: false },
    {
      key: "clock",
      render: () => {
        const weekday = new Date().toLocaleDateString("en-US", {
          timeZone: env.TIMEZONE,
          weekday: "long",
        });
        return `Today: ${date()} (${weekday}). User timezone: ${env.TIMEZONE}.`;
      },
    },
    {
      key: "profile",
      render: () => store.getNode("profile")?.body || "(empty)",
    },
    ...modules
      .filter((module) => module.instructions)
      .map((module) => ({
        key: module.id,
        render: () =>
          `${module.instructions}\n\n${JSON.stringify(module.index(store, date()))}`,
      })),
  ];
}

/** The text handed to Pi for one message, with any records the user pointed at. */
export function messageText(
  store: Store,
  capture: { text: string; source: string; created_at: string; refs: string },
  timezone: string,
) {
  const refs = (JSON.parse(capture.refs) as string[])
    .map((id) => store.getNode(id))
    .filter((node) => node !== null)
    .map((node) => `Refers to: "${node.title}" (${node.id})`);
  return [
    `Sent at: ${capture.created_at}`,
    `Timezone: ${timezone}`,
    `Source: ${capture.source}`,
    ...refs,
    "",
    capture.text,
  ].join("\n");
}
