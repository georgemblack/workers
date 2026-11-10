// Runs the real Worker, Durable Object, and agent loop in workerd, with a
// scripted model in place of the real one. No paid requests are made.
import { afterAll, beforeAll, expect, it } from "vitest";
import { completion, createRuntime, reply } from "../scripts/runtime.mjs";

let app;
let calls = 0;
const call = (id, name, args) => ({
  type: "function_call",
  id: "fc_" + id,
  call_id: id,
  name,
  arguments: JSON.stringify(args),
});
const outputText = (entry) =>
  typeof entry.output === "string"
    ? entry.output
    : entry.output.map((part) => part.text).join("");

beforeAll(async () => {
  // Each message: create a politician, then an event for them, then reply.
  app = await createRuntime(({ input }) => {
    calls++;
    const serialized = JSON.stringify(input);
    const source = [...serialized.matchAll(/Message ID: ([a-zA-Z0-9_-]+)/g)].at(
      -1,
    )[1];
    const outputs = new Map(
      input.input
        .filter((entry) => entry.type === "function_call_output")
        .map((entry) => [entry.call_id, outputText(entry)]),
    );
    if (!outputs.has("cp_" + source))
      return completion([
        call("cp_" + source, "create_politician", {
          fields: { name: "Jane Doe", office: "Alderperson, Ward 3" },
          source_id: source,
          mutation_id: source + "-politician",
        }),
      ]);
    if (!outputs.has("ce_" + source)) {
      const politician = JSON.parse(outputs.get("cp_" + source));
      return completion([
        call("ce_" + source, "create_event", {
          fields: {
            politician_id: politician.id,
            date: "2026-11-04",
            sentiment: "negative",
            summary: "Voted against the Elm Street bike lane plan.",
            sources: [
              {
                url: "https://news.example/bike-lanes",
                title: "Council rejects bike lanes",
              },
            ],
          },
          source_id: source,
          mutation_id: source + "-event",
        }),
      ]);
    }
    return reply("**Added** the bike lane vote.");
  });
}, 30000);
afterAll(async () => {
  await app?.dispose();
});

it("adds a politician and event through the agent, once, with read-only GETs", async () => {
  expect(
    (await app.send("runtime-one", "Jane voted against bike lanes")).accepted,
  ).toBe(true);
  expect((await app.wait("runtime-one")).html).toContain(
    "<strong>Added</strong>",
  );
  const timeline = await app.json("/api/timeline");
  expect(timeline.politicians).toMatchObject([
    { name: "Jane Doe", negative: 1 },
  ]);
  expect(timeline.events).toMatchObject([
    {
      date: "2026-11-04",
      sentiment: "negative",
      sources: [{ url: "https://news.example/bike-lanes" }],
    },
  ]);
  const count = calls;
  for (let i = 0; i < 3; i++) {
    await app.json("/api/timeline");
    await app.json("/api/chat");
  }
  expect(calls).toBe(count);
  // Resending the same message doesn't run it again.
  expect(
    (await app.send("runtime-one", "Jane voted against bike lanes")).accepted,
  ).toBe(false);
  const exported = await app.json("/api/export");
  expect(exported.tables.events).toHaveLength(1);
  expect(exported.tables.changes).toHaveLength(2);
  expect((await app.json("/api/diagnostics")).captures.failed).toBe(0);
}, 60000);

it("returns stable HTTP errors and requires Access off localhost", async () => {
  const send = (body) =>
    app.request("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  expect((await send({})).status).toBe(400);
  expect(
    (await send({ id: "runtime-one", text: "Different message" })).status,
  ).toBe(409);
  expect(
    (
      await app.runtime.dispatchFetch(
        "https://unauthenticated.example/api/timeline",
      )
    ).status,
  ).toBe(403);
  const page = await app.request("/");
  expect(page.headers.get("Content-Security-Policy")).toContain(
    "frame-ancestors 'none'",
  );
  expect(await page.text()).toContain("<title>govtrack</title>");
});
