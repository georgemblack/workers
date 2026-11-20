import { DatabaseSync } from "node:sqlite";
import { beforeEach, describe, expect, it } from "vitest";
import { z } from "zod";
import { Store, type SQL } from "../src/store";
import type { NodeType, TypeRegistry } from "../src/modules/types";
import type { EntryRecord, ImportFile } from "../src/shared/contracts";

// A small stand-in for the real module registry (plan 03).
const types: Record<string, NodeType> = {
  task: {
    props: z.object({
      priority: z.enum(["high", "normal", "low"]).default("normal"),
      due: z.iso.date().nullable().default(null),
    }),
    statuses: ["open", "done"],
    closed: ["done"],
    links: {
      parent: { to: ["task"], many: false },
      in_area: { to: ["area"], many: false },
      about: { to: ["person", "group"], many: true },
    },
    describe: "A to-do.",
    validate(node) {
      if (node.title === "Forbidden") throw new Error("Not allowed");
    },
  },
  area: {
    props: z.object({}),
    statuses: ["active"],
    links: {},
    describe: "A life area.",
  },
  person: {
    props: z.object({
      aliases: z.array(z.string()).default([]),
      how_i_know: z.string().nullable().default(null),
    }),
    statuses: ["active", "archived"],
    links: {
      member_of: { to: ["group"], many: true },
      spouse_of: { to: ["person"], many: false },
    },
    describe: "A person.",
    searchText: (node) => (node.props.aliases as string[]).join(" "),
  },
  group: {
    props: z.object({ kind: z.string().default("household") }),
    statuses: ["active"],
    links: {},
    describe: "A group.",
  },
  profile: {
    props: z.object({}),
    statuses: ["active"],
    links: {},
    describe: "About the user.",
  },
};
const registry: TypeRegistry = { type: (name) => types[name] };

// Durable Object SQL, approximated with Node's built-in SQLite.
function open(db = new DatabaseSync(":memory:")) {
  const sql: SQL = {
    exec(query, ...bindings) {
      const statements = query.split(";").filter((part) => part.trim());
      let rows: any[] = [];
      for (const statement of statements) {
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
  return { db, store: new Store(sql, transaction, registry) };
}

const message = { text: "Renew passport", source: "chat" as const, refs: [] };
let store: Store;
let db: DatabaseSync;
let mutation = 0;
beforeEach(() => {
  ({ store, db } = open());
  store.capture("m1", message);
});
const create = (
  type: string,
  patch: Record<string, unknown>,
  links?: Record<string, string[]>,
) =>
  store.saveNode({
    intent: "create",
    type,
    patch,
    links,
    expectedVersion: 0,
    sourceId: "m1",
    mutationId: `mut-${++mutation}`,
  });
const update = (
  id: string,
  type: string,
  version: number,
  patch: Record<string, unknown>,
  links?: Record<string, string[]>,
) =>
  store.saveNode({
    intent: "update",
    id,
    type,
    patch,
    links,
    expectedVersion: version,
    sourceId: "m1",
    mutationId: `mut-${++mutation}`,
  });
const addEntry = (nodeIds: string[], text: string, occurredOn?: string) =>
  store.saveEntry({
    intent: "create",
    nodeIds,
    text,
    occurredOn,
    expectedVersion: 0,
    sourceId: "m1",
    mutationId: `mut-${++mutation}`,
  }) as EntryRecord;

describe("captures", () => {
  it("stores a capture once and rejects the same ID with different text", () => {
    store.capture("m1", message);
    expect(store.conversation()).toHaveLength(1);
    expect(store.deliveries()).toEqual([{ id: "m1", state: "pending" }]);
    expect(() => store.capture("m1", { ...message, text: "Fix bike" })).toThrow(
      /already used/,
    );
  });
  it("bumps the revision when a message arrives or a reply is stored", () => {
    const start = store.rev();
    store.capture("m2", { ...message, text: "Fix bike" });
    expect(store.rev()).toBe(start + 1);
    store.result("m2", { status: "done", text: "Noted." }, true);
    expect(store.rev()).toBe(start + 2);
    expect(store.completed("m2")).toBe(true);
    expect(store.conversation()[1].result.text).toBe("Noted.");
  });
  it("keeps hidden captures out of the conversation and stores refs", () => {
    store.capture("m2", { ...message, refs: ["task_abc"] });
    db.prepare("UPDATE captures SET hidden = 1 WHERE id = 'm1'").run();
    const messages = store.conversation();
    expect(messages.map((m) => m.id)).toEqual(["m2"]);
    expect(messages[0].refs).toEqual(["task_abc"]);
  });
});

describe("migrations", () => {
  it("run once and repair captures missing a delivery", () => {
    db.prepare("DELETE FROM deliveries").run();
    const reopened = open(db).store;
    expect(reopened.deliveries()).toEqual([{ id: "m1", state: "pending" }]);
    expect(
      db.prepare("SELECT value FROM meta WHERE key = 'schema'").get(),
    ).toEqual({ value: "2" });
    // Reopening again changes nothing and keeps existing data.
    open(db);
    expect(reopened.search("passport").messages).toHaveLength(1);
  });
  it("index captures stored before search existed", () => {
    const fresh = new DatabaseSync(":memory:");
    fresh.exec(`CREATE TABLE meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
      INSERT INTO meta VALUES ('schema', '1');
      CREATE TABLE captures (id TEXT PRIMARY KEY, text TEXT NOT NULL, source TEXT NOT NULL,
        refs TEXT NOT NULL DEFAULT '[]', created_at TEXT NOT NULL, hidden INTEGER NOT NULL DEFAULT 0);
      CREATE TABLE deliveries (id TEXT PRIMARY KEY, state TEXT NOT NULL DEFAULT 'pending', result TEXT);
      CREATE TABLE health (component TEXT PRIMARY KEY, last_success TEXT, last_error TEXT, last_error_at TEXT);
      INSERT INTO captures (id,text,source,created_at) VALUES ('old','Fix bike','chat','2026-11-01T00:00:00Z');`);
    expect(open(fresh).store.search("bike").messages[0].id).toBe("old");
  });
});

describe("nodes", () => {
  it("generates IDs, fills defaults and requires version 0 on create", () => {
    const task = create("task", { title: "Renew passport" });
    expect(task.id).toMatch(/^task_[0-9a-z]{10}$/);
    expect(task).toMatchObject({
      status: "open",
      body: "",
      props: { priority: "normal", due: null },
      links: { parent: [], in_area: [], about: [] },
      version: 1,
      source_id: "m1",
    });
    expect(() =>
      store.saveNode({
        intent: "create",
        type: "task",
        patch: { title: "Fix bike" },
        expectedVersion: 1,
        sourceId: "m1",
        mutationId: "bad",
      }),
    ).toThrow(/version 0/);
  });
  it("replays a committed mutation instead of applying it twice", () => {
    const args = {
      intent: "create" as const,
      type: "task",
      patch: { title: "Fix bike" },
      expectedVersion: 0,
      sourceId: "m1",
      mutationId: "call-1",
    };
    const first = store.saveNode(args);
    const rev = store.rev();
    expect(store.saveNode(args)).toEqual(first);
    expect(store.listNodes({ type: "task" })).toHaveLength(1);
    expect(store.rev()).toBe(rev);
    expect(() =>
      store.saveEntry({
        intent: "create",
        nodeIds: [first.id],
        text: "x",
        expectedVersion: 0,
        sourceId: "m1",
        mutationId: "call-1",
      }),
    ).toThrow(/another change/);
  });
  it("patches only supplied fields and rejects stale versions", () => {
    const task = create("task", {
      title: "Renew passport",
      body: "Photos needed",
      props: { priority: "high" },
    });
    const updated = update(task.id, "task", 1, {
      props: { due: "2026-11-24" },
    });
    expect(updated).toMatchObject({
      body: "Photos needed",
      props: { priority: "high", due: "2026-11-24" },
      version: 2,
    });
    expect(update(task.id, "task", 2, { props: { due: null } }).props.due).toBe(
      null,
    );
    expect(() => update(task.id, "task", 1, { title: "Old" })).toThrow(
      /Version conflict/,
    );
    expect(store.getNode(task.id)!.title).toBe("Renew passport");
  });
  it("rejects unknown sources, types, fields, statuses and type changes", () => {
    const task = create("task", { title: "Fix bike" });
    expect(() =>
      store.saveNode({
        intent: "create",
        type: "task",
        patch: { title: "Fix bike" },
        expectedVersion: 0,
        sourceId: "missing",
        mutationId: "x1",
      }),
    ).toThrow(/Unknown source/);
    expect(() => create("recipe", { title: "Soup" })).toThrow(
      /Unknown record type/,
    );
    expect(() =>
      create("task", { title: "A", props: { colour: "red" } }),
    ).toThrow(/Unknown field for task: colour/);
    expect(() => create("task", { title: "A", status: "maybe" })).toThrow(
      /must be one of: open, done/,
    );
    expect(() =>
      create("task", { title: "A", props: { due: "soon" } }),
    ).toThrow(/Invalid fields.due/);
    expect(() => create("task", { title: " " })).toThrow(/Invalid title/);
    expect(() => update(task.id, "area", 1, { title: "Home" })).toThrow(
      /is a task, not a area/,
    );
  });
  it("runs the type's validate hook and writes nothing when it fails", () => {
    const rev = store.rev();
    expect(() => create("task", { title: "Forbidden" })).toThrow("Not allowed");
    expect(store.listNodes({ type: "task" })).toHaveLength(0);
    expect(store.rev()).toBe(rev);
  });
  it("bumps the revision on every successful write", () => {
    const rev = store.rev();
    const task = create("task", { title: "Fix bike" });
    update(task.id, "task", 1, { status: "done" });
    addEntry([task.id], "Needs a new chain");
    expect(store.rev()).toBe(rev + 3);
  });
});

describe("links", () => {
  it("replace only the named relations", () => {
    const home = create("area", { title: "Home" });
    const parent = create("task", { title: "Plan garden beds" });
    const jane = create("person", { title: "Jane" });
    const task = create(
      "task",
      { title: "Buy seeds" },
      { parent: [parent.id], in_area: [home.id] },
    );
    const updated = update(task.id, "task", 1, {}, { about: [jane.id] });
    expect(updated.links).toEqual({
      parent: [parent.id],
      in_area: [home.id],
      about: [jane.id],
    });
    expect(update(task.id, "task", 2, {}, { parent: [] }).links.parent).toEqual(
      [],
    );
    expect(store.getNode(task.id)!.links.in_area).toEqual([home.id]);
  });
  it("enforce single targets, target types, existence and no self-links", () => {
    const a = create("task", { title: "Plan garden beds" });
    const b = create("task", { title: "Fix bike" });
    const home = create("area", { title: "Home" });
    expect(() =>
      create("task", { title: "x" }, { parent: [a.id, b.id] }),
    ).toThrow(/at most one/);
    expect(() => create("task", { title: "x" }, { parent: [home.id] })).toThrow(
      /must point to task, not area/,
    );
    expect(() =>
      create("task", { title: "x" }, { parent: ["task_missing"] }),
    ).toThrow(/no record with ID task_missing/);
    expect(() => create("task", { title: "x" }, { cousin: [a.id] })).toThrow(
      /Unknown link "cousin"/,
    );
    expect(() => update(a.id, "task", 1, {}, { parent: [a.id] })).toThrow(
      /link to itself/,
    );
  });
  it("can be read in both directions", () => {
    const home = create("area", { title: "Home" });
    const garden = create(
      "task",
      { title: "Plan garden beds" },
      { in_area: [home.id] },
    );
    create(
      "task",
      { title: "Buy seeds" },
      { parent: [garden.id], in_area: [home.id] },
    );
    create("task", { title: "Renew passport" });
    expect(
      store.listNodes({ type: "task", linkedTo: home.id }).map((n) => n.title),
    ).toEqual(["Buy seeds", "Plan garden beds"]);
    expect(
      store.backlinks(garden.id).map((b) => [b.rel, b.node.title]),
    ).toEqual([["parent", "Buy seeds"]]);
    expect(store.backlinks(home.id, "parent")).toEqual([]);
    expect(store.listNodes({ type: "task", status: ["done"] })).toEqual([]);
  });
});

describe("entries", () => {
  it("attach to several nodes and split into facts and timeline", () => {
    const jane = create("person", { title: "Jane" });
    const john = create("person", { title: "John" });
    const fact = addEntry([john.id], "Went to Platteville for school");
    const older = addEntry([jane.id, john.id], "Met at the park", "2026-11-10");
    const newer = addEntry(
      [jane.id],
      "Saw them at the park again",
      "2026-11-14",
    );
    expect(store.entriesFor([john.id])).toEqual({
      facts: [fact],
      timeline: [older],
    });
    expect(store.entriesFor([jane.id]).timeline.map((e) => e.id)).toEqual([
      newer.id,
      older.id,
    ]);
    // An entry on both nodes appears once when both are asked for.
    expect(store.entriesFor([jane.id, john.id]).timeline).toHaveLength(2);
    expect(store.entriesFor([jane.id], { limit: 1 }).timeline).toEqual([newer]);
    expect(older.id).toMatch(/^entry_[0-9a-z]{10}$/);
  });
  it("can be edited and soft-deleted", () => {
    const jane = create("person", { title: "Jane" });
    const entry = addEntry([jane.id], "Met at the park", "2026-11-10");
    const edit = (version: number, rest: Record<string, unknown>) =>
      store.saveEntry({
        intent: "update",
        id: entry.id,
        expectedVersion: version,
        sourceId: "m1",
        mutationId: `mut-${++mutation}`,
        ...rest,
      });
    expect(edit(1, { occurredOn: null })).toMatchObject({
      text: "Met at the park",
      occurred_on: null,
      version: 2,
    });
    expect(() => edit(1, { text: "stale" })).toThrow(/Version conflict/);
    expect(() => edit(2, { nodeIds: [] })).toThrow(/at least one node/);
    expect(() => edit(2, { occurredOn: "Tuesday" })).toThrow(/occurred_on/);
    expect(store.search("park").entries).toHaveLength(1);
    expect(edit(2, { delete: true })).toEqual({ deleted: true });
    expect(store.entriesFor([jane.id])).toEqual({ facts: [], timeline: [] });
    expect(store.search("park").entries).toHaveLength(0);
    expect(() => edit(3, { text: "back" })).toThrow(/No entry/);
  });
  it("reject missing nodes and over-long text", () => {
    expect(() => addEntry(["person_missing"], "Hello")).toThrow(/No record/);
    const jane = create("person", { title: "Jane" });
    expect(() => addEntry([jane.id], "x".repeat(2001))).toThrow(/Invalid text/);
  });
});

describe("merge", () => {
  it("moves links and entries, adds aliases and leaves no self-links", () => {
    const millers = create("group", { title: "Miller household" });
    const jane = create(
      "person",
      { title: "Jane Miller" },
      { member_of: [millers.id] },
    );
    const john = create("person", { title: "John" }, { spouse_of: [jane.id] });
    const dupe = create(
      "person",
      { title: "Jayne", props: { aliases: ["J"] } },
      { spouse_of: [john.id] },
    );
    update(john.id, "person", 1, {}, { spouse_of: [dupe.id] });
    const task = create(
      "task",
      { title: "Return casserole dish" },
      { about: [dupe.id, jane.id] },
    );
    const entry = addEntry([dupe.id], "Likes gardening");
    const kept = store.mergeNodes({
      keepId: jane.id,
      removeId: dupe.id,
      sourceId: "m1",
      mutationId: "merge-1",
    });
    expect(kept.props.aliases).toEqual(["Jayne", "J"]);
    expect(kept.links).toEqual({
      member_of: [millers.id],
      spouse_of: [john.id],
    });
    expect(kept.version).toBe(2);
    expect(store.getNode(dupe.id)).toBeNull();
    expect(store.getNode(john.id)!.links.spouse_of).toEqual([jane.id]);
    expect(store.getNode(task.id)!.links.about).toEqual([jane.id]);
    expect(store.entriesFor([jane.id]).facts.map((e) => e.id)).toEqual([
      entry.id,
    ]);
    expect(store.search("Jayne").nodes.map((n) => n.id)).toEqual([jane.id]);
    expect(store.changesFor(dupe.id, 5)[0].after).toEqual({
      merged_into: jane.id,
    });
    expect(
      db.prepare("SELECT count(*) AS n FROM links WHERE from_id = to_id").get(),
    ).toEqual({ n: 0 });
    // Replaying the merge returns the same result without changing anything.
    const rev = store.rev();
    expect(
      store.mergeNodes({
        keepId: jane.id,
        removeId: dupe.id,
        sourceId: "m1",
        mutationId: "merge-1",
      }),
    ).toEqual(kept);
    expect(store.rev()).toBe(rev);
  });
  it("refuses different types and merging a node into itself", () => {
    const jane = create("person", { title: "Jane" });
    const group = create("group", { title: "Miller household" });
    const merge = (keepId: string, removeId: string) =>
      store.mergeNodes({
        keepId,
        removeId,
        sourceId: "m1",
        mutationId: `mut-${++mutation}`,
      });
    expect(() => merge(jane.id, group.id)).toThrow(/types must match/);
    expect(() => merge(jane.id, jane.id)).toThrow(/into itself/);
  });
});

describe("search", () => {
  it("finds nodes by body, entries by a linked node's title, and messages", () => {
    const task = create("task", {
      title: "Fix bike",
      body: "Rear derailleur is bent",
    });
    const jonah = create("person", { title: "Jonah" });
    addEntry([jonah.id], "Started kindergarten", "2026-09-01");
    const found = store.search("derailleur");
    expect(found.nodes.map((n) => n.id)).toEqual([task.id]);
    expect(store.search("jonah").entries.map((e) => e.text)).toEqual([
      "Started kindergarten",
    ]);
    expect(store.search("passport").messages.map((m) => m.id)).toEqual(["m1"]);
    expect(store.search("derailleur", { types: ["person"] }).nodes).toEqual([]);
    expect(store.search("type-specific text").nodes).toEqual([]);
    // FTS operators and punctuation in user text are harmless.
    expect(store.search('NOT "AND* (bike')).toBeTruthy();
    expect(store.search("!!!")).toEqual({
      nodes: [],
      entries: [],
      messages: [],
    });
  });
  it("uses each type's extra search text and follows renames", () => {
    const jane = create("person", {
      title: "Jane Okafor",
      props: { aliases: ["JO"] },
    });
    expect(store.search("JO").nodes.map((n) => n.id)).toEqual([jane.id]);
    addEntry([jane.id], "Leads the design team");
    update(jane.id, "person", 1, { title: "Jane O." });
    expect(store.search("Okafor").entries).toHaveLength(0);
    expect(store.search("design").entries).toHaveLength(1);
  });
});

describe("import", () => {
  const file = (
    nodes: ImportFile["nodes"],
    entries: ImportFile["entries"] = [],
  ) => ({ format: "brain2-import", version: 1, nodes, entries }) as ImportFile;
  const node = (
    id: string,
    type: string,
    title: string,
    rest: object = {},
  ) => ({
    id,
    type,
    title,
    body: "",
    status: types[type].statuses[0],
    props: {},
    links: {},
    ...rest,
  });
  it("inserts nodes with their IDs, links between them, and entries", () => {
    const result = store.importAll(
      file(
        [
          node("legacy-garden", "task", "Plan garden beds", {
            links: { in_area: ["area-home"] },
          }),
          node("area-home", "area", "Home"),
        ],
        [
          {
            text: "Started in spring",
            occurred_on: null,
            node_ids: ["legacy-garden"],
          },
        ],
      ),
      "m1",
    );
    expect(result).toEqual({ nodes: 2, entries: 1 });
    expect(store.getNode("legacy-garden")!.links.in_area).toEqual([
      "area-home",
    ]);
    expect(store.entriesFor(["legacy-garden"]).facts).toHaveLength(1);
    expect(store.changesFor("legacy-garden", 5)).toHaveLength(1);
  });
  it("refuses an existing ID but updates the profile in place", () => {
    // Plan 03's migration creates the profile; stand in for it here.
    db.prepare(
      "INSERT INTO nodes VALUES ('profile','profile','About me','','active','{}',1,'2026-11-01','2026-11-01','m1')",
    ).run();
    store.importAll(
      file([
        node("profile", "profile", "About me", {
          body: "Lives in a small town",
        }),
      ]),
      "m1",
    );
    expect(store.getNode("profile")).toMatchObject({
      body: "Lives in a small town",
      version: 2,
    });
    store.importAll(file([node("area-home", "area", "Home")]), "m1");
    expect(() =>
      store.importAll(file([node("area-home", "area", "Home")]), "m1"),
    ).toThrow(/already exists/);
  });
  it("rolls back entirely when one record is invalid", () => {
    const rev = store.rev();
    expect(() =>
      store.importAll(
        file([
          node("area-home", "area", "Home"),
          node("bad-task", "task", "Fix bike", {
            links: { in_area: ["area-missing"] },
          }),
        ]),
        "m1",
      ),
    ).toThrow(/no record with ID area-missing/);
    expect(store.getNode("area-home")).toBeNull();
    expect(store.search("Home").nodes).toEqual([]);
    expect(store.rev()).toBe(rev);
  });
});
