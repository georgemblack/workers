// A real, tiny inference test. Uses the authenticated remote AI binding and
// the stored gateway key; no provider API key is read or passed to this script.
import { mkdir, writeFile } from "node:fs/promises";
import { getPlatformProxy } from "wrangler";
import { Type } from "@earendil-works/pi-ai";
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
  const model = ai("openai/gpt-6-luna");
  if (model.api !== "openai-responses")
    throw new Error("Luna must use Responses for reasoning with tools");
  const context = {
    messages: [
      {
        role: "user",
        content:
          "Use lookup_item to look up size 1 diapers, then tell me the parent list and timing. Do not invent facts.",
        timestamp: Date.now(),
      },
    ],
    tools: [
      {
        name: "lookup_item",
        description:
          "Look up an item by text. Returns title, parent list, timing, and timing_source. An inherited timing value is a soft target, not an explicit deadline.",
        parameters: Type.Object({ query: Type.String() }),
      },
    ],
  };
  const first = await ai.completeSimple(model, context, {
    reasoning: "low",
    maxTokens: 1500,
  });
  if (first.stopReason === "error") throw new Error(first.errorMessage);
  const call = first.content.find((part) => part.type === "toolCall");
  if (!call || call.name !== "lookup_item")
    throw new Error("Expected a lookup_item tool call");
  context.messages.push(first);
  context.messages.push({
    role: "toolResult",
    toolCallId: call.id,
    toolName: call.name,
    content: [
      {
        type: "text",
        text: JSON.stringify({
          title: "Buy size 1 diapers",
          parent: "Baby supplies",
          timing: "Before May 15, 2027",
          timing_source: "inherited",
        }),
      },
    ],
    isError: false,
    timestamp: Date.now(),
  });
  const final = await ai.completeSimple(model, context, {
    reasoning: "low",
    maxTokens: 1500,
  });
  if (final.stopReason === "error") throw new Error(final.errorMessage);
  const text = final.content
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("\n");
  if (!/baby supplies/i.test(text) || !/May 15,? 2027/.test(text))
    throw new Error("Expected supplied parent and timing in the final answer");
  console.log(
    JSON.stringify(
      {
        model: model.id,
        api: model.api,
        gateway: "brain",
        tool: call.name,
        answer: text,
      },
      null,
      2,
    ),
  );
} finally {
  await platform.dispose();
}
