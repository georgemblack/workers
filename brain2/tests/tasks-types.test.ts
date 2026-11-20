import { DatabaseSync } from "node:sqlite";
import { beforeEach, expect, it } from "vitest";
import { Store, type SQL } from "../src/store";
import { registry } from "../src/modules";

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
  const transaction = <T>(fn: () => T) => {
    db.exec("SAVEPOINT tx");
    try {
      const result = fn();
      db.exec("RELEASE tx");
      return result;
    } catch (error) {
      db.exec("ROLLBACK TO tx");
      db.exec("RELEASE tx");
      throw error;
    }
  };
  return new Store(sql, transaction, registry);
}

let store: Store;
let n = 0;
let home: string;
beforeEach(() => {
  store = openStore();
  store.capture("m1", { text: "Plan garden beds", source: "chat", refs: [] });
  home = save("create", "area", { title: "Home" }).id;
});
function save(
  intent: "create" | "update",
  type: string,
  patch: Record<string, unknown>,
  links?: Record<string, string[]>,
  id?: string,
) {
  const version = id ? store.getNode(id)!.version : 0;
  return store.saveNode({
    intent,
    id,
    type,
    patch,
    links,
    expectedVersion: version,
    sourceId: "m1",
    mutationId: `m-${++n}`,
  });
}
const create = (
  title: string,
  links: Record<string, string[]> = {},
  props = {},
) => save("create", "task", { title, props }, links);

it("rejects a parent loop", () => {
  const garden = create("Plan garden beds", { in_area: [home] });
  const frames = create("Build frames", { parent: [garden.id] });
  const boards = create("Cut boards", { parent: [frames.id] });
  expect(() =>
    save("update", "task", {}, { parent: [boards.id] }, garden.id),
  ).toThrow("A task cannot be inside its own sub-tasks");
  expect(store.getNode(garden.id)!.links.parent).toEqual([]);
});

it("rejects relative timing labels and accepts lasting ones", () => {
  for (const label of ["This weekend", "Tonight", "next week", "Soon"])
    expect(() =>
      create("Call the plumber", { in_area: [home] }, { due_label: label }),
    ).toThrow(/due_label must stay true/);
  const task = create(
    "Clean gutters",
    { in_area: [home] },
    { due_label: "Mid-November", due_date: "2026-11-15" },
  );
  expect(task.props).toMatchObject({ due_label: "Mid-November" });
});

it("requires an area for top-level tasks only", () => {
  expect(() => create("Renew passport")).toThrow(
    "Top-level tasks need an area (links.in_area)",
  );
  const garden = create("Plan garden beds", { in_area: [home] });
  expect(create("Buy seeds", { parent: [garden.id] }).links.in_area).toEqual(
    [],
  );
  // Closed tasks and sub-tasks of closed parents follow the same rule.
  expect(
    save("create", "task", { title: "Old chore", status: "done" }).status,
  ).toBe("done");
  save("update", "task", { status: "done" }, undefined, garden.id);
  expect(() => create("Build frames", { parent: [garden.id] })).toThrow(
    /need an area/,
  );
});

it("links tasks to notes", () => {
  const note = save("create", "note", { title: "Fence paint colour" });
  const task = create("Repaint the fence", {
    in_area: [home],
    about: [note.id],
  });
  expect(task.links.about).toEqual([note.id]);
  expect(store.backlinks(note.id).map((b) => b.node.title)).toEqual([
    "Repaint the fence",
  ]);
});
