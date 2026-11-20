import { beforeAll, afterAll, expect, it } from "vitest";
import { createRuntime, completion, reply } from "../scripts/runtime.mjs";

// Scripted model. Each message names a script; each step sees the tool
// outputs so far for the current message and returns calls or a reply.
const outputs = new Map(); // call_id → parsed tool output
let lastText = ""; // the latest message text the model was given
const call = (call_id, name, args) => ({
  type: "function_call",
  id: "fc_" + call_id,
  call_id,
  name,
  arguments: JSON.stringify(args),
});
const scripts = {
  note: () => [
    call("call-note", "create_note", {
      title: "Wifi password",
      body: "On the fridge",
    }),
  ],
  replay: () => [
    call("call-note", "create_note", {
      title: "Wifi password",
      body: "On the fridge",
    }),
  ],
  stale: (_, [id]) => [
    call("call-stale", "update_note", { id, version: 99, title: "Router" }),
  ],
  entry: (_, ids) => [
    call("call-entry", "add_entry", {
      node_ids: ids,
      text: "Changed the router",
      occurred_on: "2026-11-18",
    }),
  ],
  badargs: () => [call("call-bad", "create_note", { title: { nested: true } })],
};
function respond({ input }) {
  const items = input.input;
  const userIndex = items.findLastIndex((item) => item.role === "user");
  const content = items[userIndex].content;
  const text =
    typeof content === "string" ? content : content.map((c) => c.text).join("");
  lastText = text;
  const words = text.split("\n\n").at(-1).trim().split(/\s+/);
  const done = items
    .slice(userIndex + 1)
    .filter((item) => item.type === "function_call_output");
  for (const item of done) {
    let value = item.output;
    if (Array.isArray(value)) value = value.map((part) => part.text).join("");
    try {
      value = JSON.parse(value);
    } catch {}
    outputs.set(item.call_id, value);
  }
  const script = scripts[words[0]];
  if (script && done.length === 0)
    return completion(script(done, words.slice(1)));
  return reply("Done.");
}

let app;
let storage;
const rows = async (query, ...args) => [
  ...(await storage.exec(query, ...args)),
];
beforeAll(async () => {
  app = await createRuntime(respond);
  storage = await app.runtime.unsafeGetDurableObjectStorage(
    "brain2-test",
    "Brain2",
    {
      name: "personal",
    },
  );
}, 30000);
afterAll(async () => {
  await app?.dispose();
});
let n = 0;
async function say(text) {
  const id = "tools-" + ++n;
  await app.send(id, text);
  await app.wait(id);
  return id;
}

it("creates a note stamped with its message, once, even when the call replays", async () => {
  const id = await say("note");
  const notes = await rows("SELECT * FROM nodes WHERE type = 'note'");
  expect(notes).toHaveLength(1);
  expect(notes[0]).toMatchObject({ title: "Wifi password", source_id: id });
  const changes = await rows(
    "SELECT * FROM changes WHERE target_id = ?",
    notes[0].id,
  );
  expect(changes).toHaveLength(1);
  expect(changes[0].source_id).toBe(id);
  // The same call ID in the same conversation is a replay: same record, no new change.
  await say("replay");
  expect(await rows("SELECT * FROM nodes WHERE type = 'note'")).toHaveLength(1);
  expect(await rows("SELECT * FROM changes")).toHaveLength(1);
}, 60000);

it("returns errors to the model instead of failing the run", async () => {
  const [note] = await rows("SELECT id FROM nodes WHERE type = 'note'");
  await say("stale " + note.id);
  expect(outputs.get("call-stale")).toEqual({
    error: "Version conflict: reload before editing",
  });
  // Pi rejects arguments of the wrong type before the tool runs.
  await say("badargs");
  expect(JSON.stringify(outputs.get("call-bad"))).toMatch(/Validation failed/);
  expect(await rows("SELECT * FROM nodes WHERE type = 'note'")).toHaveLength(1);
}, 60000);

it("adds an entry to two records and serves state and record detail", async () => {
  const before = await app.request("/api/state");
  expect(before.status).toBe(200);
  const state = await before.json();
  expect(state.tabs).toEqual([
    { id: "tasks", title: "Tasks" },
    { id: "people", title: "People" },
  ]);
  expect(state.views.tasks).toEqual({ priorities: [], areas: [] });
  expect(state.messages.at(-1)).toMatchObject({
    status: "done",
    reply_html: "<p>Done.</p>\n",
  });
  expect((await app.request("/api/state?rev=" + state.rev)).status).toBe(204);

  const [note] = await rows("SELECT id FROM nodes WHERE type = 'note'");
  await say(`entry ${note.id} profile`);
  expect(outputs.get("call-entry")).toMatchObject({
    node_ids: [note.id, "profile"],
    occurred_on: "2026-11-18",
  });
  expect((await app.request("/api/state?rev=" + state.rev)).status).toBe(200);

  const detail = await app.json("/api/nodes/" + note.id);
  expect(detail.node.title).toBe("Wifi password");
  expect(detail.timeline.map((e) => e.text)).toEqual(["Changed the router"]);
  expect((await app.request("/api/nodes/note_missing")).status).toBe(404);
}, 60000);

it("tells the model which records the user pointed at", async () => {
  const [note] = await rows("SELECT id FROM nodes WHERE type = 'note'");
  const response = await app.request("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: "tools-refs",
      text: "what is this",
      source: "api",
      refs: [note.id, "note_missing"],
    }),
  });
  expect(response.status).toBe(202);
  await app.wait("tools-refs");
  const state = await app.json("/api/state");
  expect(state.messages.at(-1).refs).toEqual([
    { id: note.id, title: "Wifi password" },
  ]);
  expect(lastText).toContain(
    `Refers to: "Wifi password" (${note.id})\n\nwhat is this`,
  );
  expect(lastText).not.toContain("note_missing");
}, 60000);
