import {
  organizerInput,
  organizerInstructions,
  validatePlan,
  defaultAreas,
} from "../src/dashboard.ts";
import { itemInput } from "../src/domain.ts";
// A real, tiny inference test. Uses the authenticated remote AI binding and
// the stored gateway key; no provider API key is read or passed to this script.
import { mkdir, writeFile } from "node:fs/promises";
import { getPlatformProxy } from "wrangler";
import { createBrainAI } from "../src/model.ts";

await mkdir(".cloudflare", { recursive: true });
const configPath = ".cloudflare/gateway-check.json";
await writeFile(
  configPath,
  JSON.stringify({
    name: "brain-gateway-check",
    account_id: "bc4564dd499c0a9b8a7bb79c9bd5ea6d",
    compatibility_date: "2026-10-23",
    compatibility_flags: ["nodejs_compat"],
    ai: { binding: "AI", remote: true },
  }),
);
const platform = await getPlatformProxy({
  configPath,
  persist: false,
  envFiles: [],
});
try {
  const ai = createBrainAI(platform.env.AI, "brain");
  const items = [
    {
      id: "doula",
      title: "Book postpartum doula",
      priority: "high",
      status: "open",
      notes: "Arrange support before baby arrives",
    },
    {
      id: "diapers",
      title: "Buy diapers",
      priority: "normal",
      status: "open",
      due_date: "2026-12-15",
    },
    {
      id: "trash",
      title: "Consider a bedroom trashcan",
      priority: "low",
      status: "someday",
      parent_id: "doula",
    },
    {
      id: "tag",
      title: "Install ordered toll tag on Kia Carnival",
      priority: "low",
      status: "waiting",
    },
    {
      id: "warranty",
      title: "Follow up on home warranty",
      priority: "high",
      status: "open",
      due_date: "2026-10-26",
    },
    {
      id: "dog",
      title: "Arrange Picasso boarding",
      priority: "normal",
      status: "open",
    },
    {
      id: "gifts",
      title: "Christmas gifts 2026",
      status: "open",
    },
    {
      id: "pajamas",
      title: "Buy pajamas for Sam",
      status: "open",
      parent_id: "gifts",
    },
  ].map((i) => ({
    ...itemInput.parse(i),
    id: i.id,
    version: 1,
    updated_at: new Date().toISOString(),
    source_id: "fictional",
  }));
  const result = await ai.completeSimple(
    ai("openai/gpt-6-luna"),
    {
      systemPrompt: organizerInstructions,
      messages: [
        {
          role: "user",
          timestamp: Date.now(),
          content: JSON.stringify(organizerInput(items, defaultAreas)),
        },
      ],
    },
    { reasoning: "low", maxTokens: 5000 },
  );
  if (result.stopReason === "error") throw new Error(result.errorMessage);
  const text = result.content
    .filter((p) => p.type === "text")
    .map((p) => p.text)
    .join("\n")
    .trim()
    .replace(/^```(?:json)?\s*/, "")
    .replace(/\s*```$/, "");
  const raw = JSON.parse(text);
  if (
    raw.groups.some((g) =>
      g.item_ids.some((id) => ["trash", "pajamas"].includes(id)),
    )
  )
    throw new Error("Organizer grouped a sub-item");
  const plan = validatePlan(raw, items);
  const all = plan.groups.flatMap((g) => g.item_ids);
  const roots = items.filter((i) => !i.parent_id).map((i) => i.id);
  if (roots.some((id) => !all.includes(id)))
    throw new Error("Organizer omitted a top-level item");
  const areaOf = (id) => plan.groups.find((g) => g.item_ids.includes(id));
  if (areaOf("dog")?.area_id !== "picasso")
    throw new Error("Organizer misfiled pet boarding");
  console.log(JSON.stringify(plan, null, 2));
} finally {
  await platform.dispose();
}
