import { beforeAll, afterAll, expect, it } from "vitest";
import { createRuntime, completion, reply } from "../scripts/runtime.mjs";

// Scripted model: one tool call per round, built from earlier results, for
// "I met one of my neighbors at the park today, said her name was Jane..."
const call = (call_id, name, args) =>
  completion([
    {
      type: "function_call",
      id: "fc_" + call_id,
      call_id,
      name,
      arguments: JSON.stringify(args),
    },
  ]);
const steps = [
  () => ["create_group", { title: "Neighbors", kind: "circle" }],
  ([circle]) => [
    "create_group",
    {
      title: "The Millers",
      kind: "household",
      links: { member_of: [circle.id] },
    },
  ],
  ([, home]) => [
    "create_person",
    { title: "Jane", how_i_know: "Neighbor", links: { member_of: [home.id] } },
  ],
  ([, home, jane]) => [
    "create_person",
    { title: "John", links: { member_of: [home.id], spouse_of: [jane.id] } },
  ],
  ([, home, jane, john]) => [
    "create_person",
    {
      title: "Jude",
      links: { member_of: [home.id], child_of: [jane.id, john.id] },
    },
  ],
  ([, home, jane, john]) => [
    "create_person",
    {
      title: "Jonah",
      links: { member_of: [home.id], child_of: [jane.id, john.id] },
    },
  ],
  ([, , , john]) => [
    "add_entry",
    { node_ids: [john.id], text: "Went to Platteville for school" },
  ],
  ([, home]) => [
    "add_entry",
    {
      node_ids: [home.id],
      text: "Met Jane at the park",
      occurred_on: "2026-11-14",
    },
  ],
];
function respond({ input }) {
  const items = input.input;
  const start = items.findLastIndex((item) => item.role === "user");
  const results = items
    .slice(start + 1)
    .filter((item) => item.type === "function_call_output")
    .map((item) =>
      JSON.parse(
        Array.isArray(item.output)
          ? item.output.map((p) => p.text).join("")
          : item.output,
      ),
    );
  const failed = results.find((r) => r.error);
  if (failed) return reply("Error: " + failed.error);
  const step = steps[results.length];
  if (!step) return reply("Saved the Millers.");
  const [name, args] = step(results);
  return call("c-" + results.length, name, args);
}

let app;
beforeAll(async () => {
  app = await createRuntime(respond);
}, 30000);
afterAll(async () => {
  await app?.dispose();
});

it("stores a family met at the park and shows it nested on the dashboard", async () => {
  await app.send(
    "people-1",
    "I met one of my neighbors at the park today, said her name was Jane",
  );
  expect((await app.wait("people-1")).reply_html).toContain(
    "Saved the Millers.",
  );
  const { views } = await app.json("/api/state");
  expect(
    views.people.circles.map((c) => ({
      title: c.title,
      households: c.households.map((h) => [
        h.title,
        h.people.map((p) => p.name),
      ]),
      people: c.people,
    })),
  ).toEqual([
    {
      title: "Neighbors",
      households: [["The Millers", ["Jane", "John", "Jonah", "Jude"]]],
      people: [],
    },
  ]);
  expect(
    views.people.recent.map((r) => [r.text, r.people.map((p) => p.name)]),
  ).toEqual([["Met Jane at the park", ["The Millers"]]]);
  const jane = views.people.circles[0].households[0].people[0];
  const detail = await app.json("/api/nodes/" + jane.id);
  expect(detail.timeline.map((e) => e.text)).toEqual(["Met Jane at the park"]);
  expect(detail.backlinks.map((b) => [b.rel, b.title])).toEqual([
    ["spouse_of", "John"],
    ["child_of", "Jude"],
    ["child_of", "Jonah"],
  ]);
}, 60000);
