import { beforeAll, afterAll, expect, it } from "vitest";
import { createRuntime, reply } from "../scripts/runtime.mjs";
let app;
let calls = 0;
beforeAll(async () => {
  // Scripted model: echoes the latest user message so each reply is traceable.
  app = await createRuntime(({ input }) => {
    calls++;
    const texts = [
      ...JSON.stringify(input).matchAll(/Source: api\\n\\n([^"\\]+)/g),
    ];
    return reply("**Echo:** " + (texts.at(-1)?.[1] ?? "nothing"));
  });
}, 30000);
afterAll(async () => {
  await app?.dispose();
});
it("replies to a message once and serves side-effect-free reads", async () => {
  const receipt = await app.send("runtime-one", "Renew passport");
  expect(receipt.accepted).toBe(true);
  expect((await app.wait("runtime-one")).html).toContain(
    "<strong>Echo:</strong> Renew passport",
  );
  const count = calls;
  for (let i = 0; i < 3; i++) await app.json("/api/chat");
  expect(calls).toBe(count);
  expect((await app.send("runtime-one", "Renew passport")).accepted).toBe(
    false,
  );
  expect(calls).toBe(count);
  const diagnostics = await app.json("/api/diagnostics");
  expect(diagnostics.captures.failed).toBe(0);
  expect(diagnostics.rev).toBeGreaterThan(0);
}, 60000);
it("returns stable HTTP errors and requires Access off localhost", async () => {
  const send = (body) =>
    app.request("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  expect((await send({})).status).toBe(400);
  expect((await send({ id: "runtime-one", text: "Fix bike" })).status).toBe(
    409,
  );
  expect(
    (
      await app.request("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: "hi",
      })
    ).status,
  ).toBe(415);
  expect((await app.request("/api/dashboard")).status).toBe(404);
  expect(
    (
      await app.runtime.dispatchFetch(
        "https://unauthenticated.example/api/chat",
      )
    ).status,
  ).toBe(403);
});
it("recovers a stored message that was never submitted, after eviction", async () => {
  const storage = await app.runtime.unsafeGetDurableObjectStorage(
    "brain2-test",
    "Brain2",
    { name: "personal" },
  );
  // Simulates the object stopping between storing a message and handing it to Pi.
  await storage.exec(
    "INSERT INTO captures (id,text,source,created_at) VALUES (?,?,?,?)",
    "runtime-gap",
    "Fix bike",
    "api",
    new Date().toISOString(),
  );
  await app.runtime.unsafeEvictDurableObject("brain2-test", "Brain2", {
    name: "personal",
  });
  // Any request wakes the object; startup finds the unsubmitted message.
  await app.send("runtime-one", "Renew passport");
  expect((await app.wait("runtime-gap", 30000)).html).toContain("Fix bike");
}, 60000);
