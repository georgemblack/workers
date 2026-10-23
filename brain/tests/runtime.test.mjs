import { beforeAll, afterAll, expect, it } from "vitest";
import { createRuntime, completion, reply } from "../scripts/runtime.mjs";
let app;
let calls = 0;
beforeAll(async () => {
  app = await createRuntime(({ input }) => {
    const serialized = JSON.stringify(input);
    if (serialized.includes("Organize a personal dashboard"))
      return reply(JSON.stringify({ highlights: [], groups: [] }));
    calls++;
    const matches = [...serialized.matchAll(/Message ID: ([a-zA-Z0-9_-]+)/g)];
    const source = matches.at(-1)?.[1];
    const call_id = "call_" + source;
    if (
      input.input?.some(
        (entry) =>
          entry.type === "function_call_output" && entry.call_id === call_id,
      )
    )
      return reply("**Saved**");
    return completion([
      {
        type: "function_call",
        id: "fc_" + source,
        call_id,
        name: "create_record",
        arguments: JSON.stringify({
          id: source + "-task",
          kind: "item",
          data: JSON.stringify({
            title: "Buy diapers",
            why: "Prepare for baby",
            priority: "high",
          }),
          expected_version: 0,
          source_id: source,
          mutation_id: source + "-create",
        }),
      },
    ]);
  });
}, 30000);
afterAll(async () => {
  await app?.dispose();
});
it("persists a real Pi tool mutation once, caches the reply, and serves side-effect-free reads", async () => {
  const receipt = await app.send("runtime-one", "Buy diapers for the baby");
  expect(receipt.accepted).toBe(true);
  expect((await app.wait("runtime-one")).html).toContain(
    "<strong>Saved</strong>",
  );
  const exported = await app.json("/api/export");
  expect(exported.tables.brain_records).toHaveLength(1);
  expect(exported.tables.brain_changes).toHaveLength(1);
  const count = calls;
  for (let i = 0; i < 3; i++) {
    await app.json("/api/dashboard");
    await app.json("/api/chat");
  }
  expect(calls).toBe(count);
  expect(
    (await app.send("runtime-one", "Buy diapers for the baby")).accepted,
  ).toBe(false);
  expect((await app.json("/api/export")).tables.brain_changes).toHaveLength(1);
  expect((await app.json("/api/diagnostics")).captures.failed).toBe(0);
}, 60000);
it("returns stable HTTP errors across RPC and removes obsolete mutation APIs", async () => {
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
      await app.request("/api/items/runtime-one-task", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      })
    ).status,
  ).toBe(404);
  expect(
    (
      await app.runtime.dispatchFetch(
        "https://unauthenticated.example/api/export",
      )
    ).status,
  ).toBe(403);
  const response = await app.request("/api/export");
  expect(response.headers.get("Content-Disposition")).toContain("attachment");
});
it("recovers a stored capture/submit gap after eviction without any chat-page polling", async () => {
  const storage = await app.runtime.unsafeGetDurableObjectStorage(
    "brain-test",
    "Brain",
    { name: "personal" },
  );
  await storage.exec(
    "INSERT INTO brain_captures VALUES (?,?,?,?)",
    "runtime-gap",
    "Buy diapers",
    "api",
    new Date().toISOString(),
  );
  await app.runtime.unsafeEvictDurableObject("brain-test", "Brain", {
    name: "personal",
  });
  // A valid retry starts lifecycle; the unsubmitted capture is discovered on startup.
  await app.send("runtime-one", "Buy diapers for the baby");
  await new Promise((resolve) => setTimeout(resolve, 12000));
  const exported = await app.json("/api/export");
  expect(
    exported.tables.brain_records.some((row) => row.id === "runtime-gap-task"),
  ).toBe(true);
  expect(
    exported.tables.brain_changes.filter(
      (row) => row.source_id === "runtime-gap",
    ),
  ).toHaveLength(1);
  expect((await app.wait("runtime-gap")).result.status).toBe("done");
}, 60000);
