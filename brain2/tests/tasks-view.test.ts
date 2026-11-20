import { DatabaseSync } from "node:sqlite";
import { beforeEach, expect, it } from "vitest";
import { Store, type SQL } from "../src/store";
import { registry } from "../src/modules";
import { tasks } from "../src/modules/tasks";
import { subtitle, view } from "../src/modules/tasks/view";
import { today as localToday } from "../src/prompt";
import type { NodeRecord, Row, TasksView } from "../src/shared/contracts";

function openStore() {
  const db = new DatabaseSync(":memory:");
  const sql: SQL = {
    exec(query, ...bindings) {
      let rows: any[] = [];
      for (const statement of query.split(";").filter((p) => p.trim())) {
        const prepared = db.prepare(statement);
        rows = prepared.columns().length
          ? prepared.all(...bindings).map((row) => ({ ...row }))
          : (prepared.run(...bindings), []);
      }
      return {
        [Symbol.iterator]: () => rows.values(),
        toArray: () => rows,
      } as any;
    },
  };
  return new Store(sql, (fn) => fn(), registry);
}

const today = "2026-10-23";
let store: Store;
let n = 0;
const ids = new Map<string, string>(); // fixture name → generated ID
beforeEach(() => {
  store = openStore();
  store.capture("m1", { text: "Plan garden beds", source: "chat", refs: [] });
  ids.clear();
  area("Home");
  area("Personal");
});
function area(title: string) {
  const node = store.saveNode({
    intent: "create",
    type: "area",
    patch: { title },
    expectedVersion: 0,
    sourceId: "m1",
    mutationId: `m-${++n}`,
  });
  ids.set(title, node.id);
  return node;
}
function task(
  title: string,
  o: {
    status?: string;
    priority?: string;
    due_date?: string;
    due_label?: string;
    parent?: string;
    area?: string;
  } = {},
) {
  const node = store.saveNode({
    intent: "create",
    type: "task",
    patch: {
      title,
      ...(o.status ? { status: o.status } : {}),
      props: {
        ...(o.priority ? { priority: o.priority } : {}),
        ...(o.due_date ? { due_date: o.due_date } : {}),
        ...(o.due_label ? { due_label: o.due_label } : {}),
      },
    },
    links: {
      ...(o.parent ? { parent: [ids.get(o.parent)!] } : {}),
      ...(o.parent ? {} : { in_area: [ids.get(o.area ?? "Home")!] }),
    },
    expectedVersion: 0,
    sourceId: "m1",
    mutationId: `m-${++n}`,
  });
  ids.set(title, node.id);
  return node;
}
function set(title: string, patch: Record<string, unknown>) {
  const node = store.getNode(ids.get(title)!)!;
  store.saveNode({
    intent: "update",
    id: node.id,
    type: node.type,
    patch,
    expectedVersion: node.version,
    sourceId: "m1",
    mutationId: `m-${++n}`,
  });
}
// Rows as nested titles, so expectations read like the dashboard.
const titles = (rows: Row[]): unknown[] =>
  rows.map((r) =>
    r.children.length ? [r.title, titles(r.children)] : r.title,
  );
const areas = (v: TasksView) => v.areas.map((a) => [a.title, titles(a.items)]);

it("nests every sub-task under its parent, at any depth", () => {
  task("Plan garden beds");
  task("Buy seeds", { parent: "Plan garden beds" });
  task("Build frames", { parent: "Plan garden beds" });
  task("Cut boards", { parent: "Build frames" });
  task("Pick a spot", { parent: "Plan garden beds", status: "done" });
  expect(areas(view(store, today))).toEqual([
    [
      "Home",
      [["Plan garden beds", [["Build frames", ["Cut boards"]], "Buy seeds"]]],
    ],
  ]);
});

it("treats a sub-task of a closed parent as top-level, under Other", () => {
  task("Plan garden beds");
  task("Buy seeds", { parent: "Plan garden beds" });
  set("Plan garden beds", { status: "done" });
  expect(areas(view(store, today))).toEqual([["Other", ["Buy seeds"]]]);
});

it("puts high-priority and soon-due work first, but not someday or future follow-ups", () => {
  task("Book dentist", { priority: "high" });
  task("Renew passport", { due_date: "2026-10-28", area: "Personal" });
  task("Clean gutters", { due_date: "2026-11-20" });
  task("Fix bike", { priority: "high", status: "someday" });
  task("Hear back from plumber", { status: "waiting", due_date: "2026-10-23" });
  task("Hear back from roofer", { status: "waiting", due_date: "2026-11-01" });
  task("Plan garden beds");
  task("Buy seeds", { parent: "Plan garden beds", priority: "high" });
  const v = view(store, today);
  expect(v.priorities.map((p) => p.title)).toEqual([
    "Hear back from plumber",
    "Renew passport",
    "Book dentist",
    "Buy seeds",
  ]);
  expect(v.priorities.every((p) => p.children.length === 0)).toBe(true);
  // Priorities are a digest: the same tasks still show in their area.
  expect(areas(v)[0][1]).toContainEqual(["Plan garden beds", ["Buy seeds"]]);
});

it("sorts someday last, then by due date, priority and title", () => {
  task("Fix bike", { status: "someday", due_date: "2026-10-25" });
  task("Wash car", { priority: "low" });
  task("Clean gutters", { due_date: "2026-11-20" });
  task("Mow lawn", { priority: "high" });
  task("Bake bread");
  expect(areas(view(store, today))).toEqual([
    [
      "Home",
      ["Clean gutters", "Mow lawn", "Bake bread", "Wash car", "Fix bike"],
    ],
  ]);
});

it("orders areas by creation, omits empty ones, and keeps Other last", () => {
  area("Garage");
  task("Fix bike", { area: "Garage" });
  task("Renew passport", { area: "Personal" });
  task("Plan garden beds");
  task("Buy seeds", { parent: "Plan garden beds" });
  set("Plan garden beds", { status: "dropped" });
  expect(areas(view(store, today))).toEqual([
    ["Personal", ["Renew passport"]],
    ["Garage", ["Fix bike"]],
    ["Other", ["Buy seeds"]],
  ]);
  // A user's own "Other" area is used for unplaced tasks and stays last.
  area("Other");
  task("Wash car", { area: "Other" });
  const v = view(store, today);
  expect(v.areas.at(-1)).toMatchObject({
    id: ids.get("Other"),
    title: "Other",
  });
  expect(titles(v.areas.at(-1)!.items)).toEqual(["Buy seeds", "Wash car"]);
});

it("moves tasks in an archived area to Other", () => {
  task("Renew passport", { area: "Personal" });
  set("Personal", { status: "archived" });
  expect(areas(view(store, today))).toEqual([["Other", ["Renew passport"]]]);
});

it("formats timing, preferring an explicit label", () => {
  const at = (props: Record<string, unknown>, status = "open") =>
    subtitle(
      {
        status,
        props: {
          priority: "normal",
          due_date: null,
          due_label: null,
          ...props,
        },
      } as unknown as NodeRecord & { props: never },
      today,
    );
  expect(at({})).toBe("");
  expect(at({ due_label: "Mid-November", due_date: "2026-11-15" })).toBe(
    "Mid-November",
  );
  expect(at({ due_date: "2026-11-30" })).toBe("By Nov 30");
  expect(at({ due_date: "2026-10-27" })).toBe("By Tue, Oct 27");
  expect(at({ due_date: "2026-10-24" })).toBe("Tomorrow");
  expect(at({ due_date: "2026-10-23" })).toBe("Today");
  expect(at({ due_date: "2026-10-20" })).toBe("Overdue since Oct 20");
  expect(at({ due_date: "2027-01-15" })).toBe("By Jan 15, 2027");
  expect(at({ due_date: "2026-11-02" }, "waiting")).toBe("Follow up Nov 2");
  expect(at({ due_date: "2026-10-22" }, "waiting")).toBe("Follow up now");
});

it("uses the user's local calendar date", () => {
  expect(localToday("America/Chicago", new Date("2026-10-23T02:00:00Z"))).toBe(
    "2026-10-22",
  );
});

it("indexes areas and open tasks for the prompt", () => {
  task("Plan garden beds");
  task("Buy seeds", { parent: "Plan garden beds", priority: "high" });
  task("Fix bike", { status: "done" });
  const index = tasks.index(store, today) as {
    areas: unknown[];
    tasks: { title: string; parent: string | null; area: string | null }[];
    truncated: boolean;
  };
  expect(index.areas).toEqual([
    { id: ids.get("Home"), title: "Home" },
    { id: ids.get("Personal"), title: "Personal" },
  ]);
  expect(index.tasks).toEqual([
    {
      id: ids.get("Buy seeds"),
      title: "Buy seeds",
      status: "open",
      priority: "high",
      due_date: null,
      parent: ids.get("Plan garden beds"),
      area: null,
    },
    {
      id: ids.get("Plan garden beds"),
      title: "Plan garden beds",
      status: "open",
      priority: "normal",
      due_date: null,
      parent: null,
      area: ids.get("Home"),
    },
  ]);
  expect(index.truncated).toBe(false);
});
