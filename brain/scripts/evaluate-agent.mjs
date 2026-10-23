// Paid behavioral evaluations: real Luna, real local Pi/SQLite, fictional data only.
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { getPlatformProxy } from "wrangler";
import { rawResponse } from "../src/ai.ts";
import { createRuntime, reply } from "./runtime.mjs";
await mkdir(".cloudflare", { recursive: true });
await writeFile(
  ".cloudflare/eval-gateway.json",
  JSON.stringify({
    name: "brain-evaluation",
    account_id: "bc4564dd499c0a9b8a7bb79c9bd5ea6d",
    compatibility_date: "2026-10-23",
    compatibility_flags: ["nodejs_compat"],
    ai: { binding: "AI", remote: true },
  }),
);
const platform = await getPlatformProxy({
  configPath: ".cloudflare/eval-gateway.json",
  persist: false,
  envFiles: [],
});
let app;
try {
  app = await createRuntime(async ({ model, input, options }) => {
    // Organizer behavior has a separate live evaluation; isolate the capture agent here.
    if (JSON.stringify(input).includes("Organize a personal dashboard"))
      return reply(JSON.stringify({ highlights: [], groups: [] }));
    const response = rawResponse(
      await platform.env.AI.run(model, input, options),
    );
    return new Response(await response.text(), {
      status: response.status,
      headers: response.headers,
    });
  });
  let n = 0;
  async function say(text) {
    const id = "eval-" + ++n;
    await app.send(id, text);
    const result = await app.wait(id);
    console.log("Completed message " + n + ": " + text.slice(0, 90));
    return result;
  }
  async function records() {
    const data = await app.json("/api/export");
    return data.tables.brain_records.map((r) => ({
      ...JSON.parse(r.data),
      id: r.id,
      kind: r.kind,
    }));
  }
  const open = (i) =>
    i.kind === "item" && !["done", "dropped"].includes(i.status);
  await say(
    "We are expecting a baby on May 15, 2027. Need to get baby supplies ready beforehand.",
  );
  await say("I need to buy size 1 diapers.");
  let data = await records();
  let diapers = data.find((i) => open(i) && /diaper/i.test(i.title));
  assert(diapers, "Missing diaper task");
  assert(
    diapers.parent_id || diapers.context_ids.length,
    "Missing contextual association",
  );
  assert.equal(diapers.due_date, null, "Invented shopping deadline");
  assert(diapers.why, "Missing why");
  await say("Actually the expected arrival is May 22, 2027.");
  data = await records();
  assert(
    data.some((i) => i.kind === "context" && /May 22|2027-05-22/.test(i.body)),
    "Arrival correction not persisted",
  );
  await say(
    "I need a high-priority contingency plan for who will watch Arthur if Cassidy goes into labor before December 24, 2026.",
  );
  await say(
    "We have coverage for Arthur from December 24 onward. Lower the priority of the remaining earlier childcare gap; we accept that risk for now.",
  );
  data = await records();
  const childcare = data.filter(
    (i) => open(i) && /Arthur|childcare|contingency/i.test(i.title),
  );
  assert(childcare.length, "Missing childcare task");
  assert(
    childcare.some((i) => i.priority === "low"),
    "Childcare was not deprioritized",
  );
  assert(
    !childcare.some((i) => i.priority === "high"),
    "High-priority childcare survived correction",
  );
  await say("I need to buy postpartum recovery supplies for Cassidy.");
  await say(
    "I bought all the postpartum supplies, so check those purchases off. I still need to export my Amazon receipt and file it with my HSA documents.",
  );
  data = await records();
  assert(
    data.some(
      (i) =>
        i.kind === "item" &&
        i.status === "done" &&
        /postpartum|recovery/i.test(i.title),
    ),
    "Purchase not completed",
  );
  assert(
    data.some((i) => open(i) && /receipt|HSA/i.test(i.title)),
    "Missing documentation follow-up",
  );
  await say("I need to pay off the car loan.");
  await say(
    "I paid off the car, but need to pick up the registration sticker from the dealership in a few weeks. I should call the bank to confirm the payoff too.",
  );
  data = await records();
  assert(
    data.some(
      (i) =>
        i.kind === "item" && i.status === "done" && /pay|loan/i.test(i.title),
    ),
    "Payoff not completed",
  );
  const sticker = data.find(
    (i) => open(i) && /sticker|registration/i.test(i.title),
  );
  assert(sticker, "Missing sticker follow-up");
  assert.equal(sticker.due_date, null, "Invented sticker pickup date");
  assert(
    data.some((i) => open(i) && /bank/i.test(i.title)),
    "Missing bank follow-up",
  );
  await say(
    "Picasso is our dog. I need to book boarding for him during delivery.",
  );
  const before = (await records()).filter((i) => i.kind === "item").length;
  const answer = await say("Anything on my list about dog Picasso?");
  assert.match(answer.result.text, /Picasso|boarding/i);
  assert.equal(
    (await records()).filter((i) => i.kind === "item").length,
    before,
    "Question created a new task",
  );
  await say(
    "Someday I might look into an electric standing desk, low priority.",
  );
  await say("Actually drop the standing desk idea.");
  await say("Did I have anything about a standing desk?");
  data = await records();
  assert(
    data.some(
      (i) =>
        i.kind === "item" && /desk/i.test(i.title) && i.status === "dropped",
    ),
    "Dropped idea was reopened or lost",
  );
  await say(
    "The builder has my warranty repair request. I am waiting for an acknowledgment; follow up on November 3, 2026.",
  );
  data = await records();
  assert(
    data.some(
      (i) =>
        open(i) && i.follow_up_at === "2026-11-03" && i.status === "waiting",
    ),
    "Missing explicit follow-up date",
  );
  await writeFile(
    ".cloudflare/agent-evaluation.json",
    JSON.stringify(await app.json("/api/export"), null, 2),
  );
  console.log(
    "PASS: contextual capture, corrected dates, lowered priorities, partial completion, follow-ups, retrieval-only questions, dropped ideas, explicit waiting follow-up.",
  );
} catch (error) {
  if (app)
    await writeFile(
      ".cloudflare/agent-evaluation-failure.json",
      JSON.stringify(await app.json("/api/export"), null, 2),
    );
  throw error;
} finally {
  await app?.dispose();
  await platform.dispose();
}
