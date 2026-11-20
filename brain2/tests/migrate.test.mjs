import { expect, it } from "vitest";
import { compare, transform } from "../scripts/migrate-lib.mjs";
import { openStore } from "./helpers/sqlite";
import { view } from "../src/modules/tasks/view";

// A fictional brain export, in brain's GET /api/export shape.
const item = (id, data, updated_at = "2026-11-01T12:00:00.000Z") => ({
  id,
  kind: "item",
  data: JSON.stringify({
    title: id,
    notes: "",
    status: "open",
    priority: "normal",
    parent_id: null,
    area_id: null,
    due_date: null,
    target: "",
    context_ids: [],
    ...data,
  }),
  version: 1,
  updated_at,
  source_id: "m1",
});
const context = (id, data) => ({
  id,
  kind: "context",
  data: JSON.stringify({
    title: id,
    body: "",
    evidence: "",
    core: false,
    ...data,
  }),
  version: 1,
  updated_at: "2026-11-01T12:00:00.000Z",
  source_id: "m1",
});
function fixture() {
  return {
    format: "brain-export",
    version: 1,
    exported_at: "2026-11-19T12:00:00.000Z",
    timezone: "America/Chicago",
    tables: {
      brain_records: [
        item("garden", {
          title: "Plan garden beds",
          notes: "Raised beds",
          area_id: "home",
        }),
        item("seeds", {
          title: "Buy seeds",
          parent_id: "garden",
          target: "Before spring",
        }),
        item("frames", {
          title: "Build frames",
          parent_id: "garden",
          context_ids: ["ctx-wood", "ctx-gone"],
        }),
        item("passport", {
          title: "Renew passport",
          due_date: "2026-11-24",
          priority: "high",
        }),
        item("bike", {
          title: "Fix bike",
          status: "someday",
          target: "This weekend",
        }),
        item("old", { title: "Old chore", status: "done" }),
        item("orphan", {
          title: "Return library book",
          parent_id: "missing-parent",
        }),
        item("leftover", { title: "Sweep shed", parent_id: "old" }),
        item("plumber", {
          title: "Hear back from plumber",
          status: "waiting",
          due_date: "2026-11-10",
        }),
        context("ctx-wood", {
          title: "Cedar boards",
          body: "Use cedar.",
          evidence: "Said so in October",
        }),
      ],
      brain_areas: [
        { id: "home", title: "Home" },
        { id: "personal", title: "Personal" },
      ],
      brain_dashboard: [
        {
          plan: JSON.stringify({
            groups: [
              {
                area_id: "personal",
                title: "Personal",
                item_ids: ["passport"],
              },
            ],
          }),
        },
      ],
      brain_captures: [
        { id: "m1", text: "ignored", source: "chat", created_at: "x" },
      ],
    },
  };
}
const byId = (file) => new Map(file.nodes.map((n) => [n.id, n]));

it("maps areas, items and context records", () => {
  const { file, summary } = transform(fixture());
  const nodes = byId(file);
  expect([...nodes.keys()].filter((id) => id.startsWith("area_"))).toEqual([
    "area_home",
    "area_personal",
    "area_other",
  ]);
  expect(nodes.get("garden")).toEqual({
    id: "garden",
    type: "task",
    title: "Plan garden beds",
    body: "Raised beds",
    status: "open",
    props: { priority: "normal", due_date: null, due_label: null },
    links: { in_area: ["area_home"] },
    updated_at: "2026-11-01T12:00:00.000Z",
  });
  // Sub-tasks get a parent and no area; a lasting label is kept.
  expect(nodes.get("seeds").links).toEqual({ parent: ["garden"] });
  expect(nodes.get("seeds").props.due_label).toBe("Before spring");
  // A relative label is dropped.
  expect(nodes.get("bike").props.due_label).toBeNull();
  // Area from the saved dashboard plan when the item has none of its own.
  expect(nodes.get("passport").links.in_area).toEqual(["area_personal"]);
  // Missing parent dropped; open top-level with no area goes to Other.
  expect(nodes.get("orphan").links).toEqual({ in_area: ["area_other"] });
  // A child of a closed parent is top-level, so it needs an area too.
  expect(nodes.get("leftover").links).toEqual({
    parent: ["old"],
    in_area: ["area_other"],
  });
  // Closed items with nowhere to go get no area.
  expect(nodes.get("old").links).toEqual({});
  // Context links become about links, keeping only migrated notes.
  expect(nodes.get("frames").links).toEqual({
    parent: ["garden"],
    about: ["ctx-wood"],
  });
  expect(nodes.get("ctx-wood")).toMatchObject({
    type: "note",
    status: "active",
    body: "Use cedar.\n\nSource: Said so in October",
  });
  expect(file.entries).toEqual([]);
  expect(summary).toEqual({
    nodes: {
      area: { active: 3 },
      note: { active: 1 },
      task: { open: 6, someday: 1, done: 1, waiting: 1 },
    },
    labels_dropped: 1,
    parents_dropped: 1,
    sent_to_other: 4,
    context_links_dropped: 1,
    notes_shortened: 0,
  });
});

it("reuses brain's own Other area and shortens over-long notes", () => {
  const data = fixture();
  data.tables.brain_areas.push({ id: "other", title: "Other things" });
  data.tables.brain_records.push(
    context("ctx-long", { body: "x".repeat(11990), evidence: "a long story" }),
  );
  const { file, summary } = transform(data);
  expect(file.nodes.filter((n) => n.id === "area_other")).toEqual([
    expect.objectContaining({ title: "Other things" }),
  ]);
  expect(byId(file).get("ctx-long").body).toHaveLength(12000);
  expect(summary.notes_shortened).toBe(1);
});

it("is deterministic", () => {
  expect(JSON.stringify(transform(fixture()))).toBe(
    JSON.stringify(transform(fixture())),
  );
});

it("rejects unexpected input", () => {
  expect(() => transform({ format: "other", version: 1 })).toThrow(
    /Not a brain export/,
  );
  const bad = (record) => {
    const data = fixture();
    data.tables.brain_records.push(record);
    return () => transform(data);
  };
  expect(bad(item("x", { status: "maybe" }))).toThrow(/unknown status/);
  expect(bad(item("y", { priority: "urgent" }))).toThrow(/unknown priority/);
  expect(bad(item("garden", {}))).toThrow(/share the ID garden/);
});

it("imports cleanly into an empty brain2 and keeps every task", () => {
  const { store } = openStore();
  const { file } = transform(fixture());
  expect(
    store.importFile(file, { captureId: "import-1", dryRun: false }),
  ).toEqual({
    nodes: file.nodes.length,
    entries: 0,
  });
  const counts = {};
  for (const status of ["open", "waiting", "someday", "done", "dropped"])
    counts[status] = store.listNodes({ type: "task", status: [status] }).length;
  expect(counts).toEqual({
    open: 6,
    waiting: 1,
    someday: 1,
    done: 1,
    dropped: 0,
  });
  expect(store.getNode("frames").links.about).toEqual(["ctx-wood"]);
});

it("compares the import with brain's view of the same data", () => {
  const { store } = openStore();
  const data = fixture();
  store.importFile(transform(data).file, {
    captureId: "import-1",
    dryRun: false,
  });
  const state = { views: { tasks: view(store, "2026-11-19") } };
  expect(compare(data, state, "2026-11-19")).toEqual([
    "OK open top-level tasks (6)",
    "OK children of garden (2)",
    "OK priorities (2)",
  ]);
  state.views.tasks.priorities.pop();
  expect(compare(data, state, "2026-11-19").at(-1)).toMatch(
    /^MISMATCH priorities: expected 2, got 1; missing /,
  );
});
