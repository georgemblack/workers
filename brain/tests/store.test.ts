import { DatabaseSync } from "node:sqlite";
import { describe, it, expect, beforeEach } from "vitest";
import { Store, type SQL } from "../src/store";
import { groupItems, itemInput } from "../src/domain";
let store: Store;
beforeEach(() => {
  const db = new DatabaseSync(":memory:");
  const sql: SQL = {
    exec(query, ...bindings) {
      let rows: Record<string, unknown>[] = [];
      if (query.includes("CREATE TABLE")) db.exec(query);
      else {
        const statement = db.prepare(query);
        if (statement.columns().length) rows = statement.all(...bindings);
        else statement.run(...bindings);
      }
      return {
        toArray: () => rows,
        [Symbol.iterator]: () => rows[Symbol.iterator](),
      } as ReturnType<SQL["exec"]>;
    },
  } as SQL;
  store = new Store(sql, (fn) => {
    db.exec("BEGIN");
    try {
      const result = fn();
      db.exec("COMMIT");
      return result;
    } catch (e) {
      db.exec("ROLLBACK");
      throw e;
    }
  });
  store.capture("message-1", "Buy diapers for the baby", "api");
});
const save = (
  id: string,
  data: unknown,
  expected_version = 0,
  mutation_id = `create-${id}`,
) =>
  store.save({
    id,
    kind: "item",
    data,
    expected_version,
    source_id: "message-1",
    mutation_id,
  });
describe("conversation cleanup", () => {
  function prepareConversation(status = "terminal") {
    store.sql
      .exec(`CREATE TABLE pi_entries (id INTEGER PRIMARY KEY, record TEXT);
      CREATE TABLE pi_conversations (id INTEGER PRIMARY KEY);
      CREATE TABLE pi_submissions (id INTEGER PRIMARY KEY, status TEXT);
      CREATE TABLE pi_tasks (id INTEGER PRIMARY KEY, status TEXT);
      CREATE TABLE pi_documents (id INTEGER PRIMARY KEY);
      CREATE TABLE pi_document_revisions (id INTEGER PRIMARY KEY);
      CREATE TABLE pi_record_ids (id INTEGER PRIMARY KEY);
      CREATE TABLE pi_durable_metadata (next_id INTEGER);
      INSERT INTO pi_entries VALUES (1, 'old conversation');
      INSERT INTO pi_conversations VALUES (1);
      INSERT INTO pi_documents VALUES (1);
      INSERT INTO pi_document_revisions VALUES (1);
      INSERT INTO pi_record_ids VALUES (1);
      INSERT INTO pi_durable_metadata VALUES (100);
      INSERT INTO brain_maintenance VALUES ('clear_conversation');`);
    store.sql.exec("INSERT INTO pi_tasks VALUES (1, ?)", status);
    store.sql.exec(
      "INSERT INTO pi_submissions VALUES (1, ?)",
      status === "terminal" ? "done" : "placed",
    );
  }
  function reopen() {
    store = new Store(store.sql, store.transaction);
  }
  it("deletes the conversation while preserving records, audit evidence, search, and future chat", () => {
    save("supplies", { title: "Buy diapers" });
    const original = store.get("supplies");
    prepareConversation();
    reopen();
    for (const table of [
      "pi_entries",
      "pi_conversations",
      "pi_tasks",
      "pi_submissions",
      "pi_documents",
      "pi_document_revisions",
      "pi_record_ids",
    ]) {
      expect(store.sql.exec(`SELECT * FROM ${table}`).toArray()).toEqual([]);
    }
    expect(
      store.sql.exec("SELECT * FROM pi_durable_metadata").toArray(),
    ).toEqual([{ next_id: 100 }]);
    expect(store.get("supplies")).toEqual(original);
    expect(
      store.sql.exec("SELECT * FROM brain_changes").toArray(),
    ).toHaveLength(1);
    expect(
      store.sql.exec("SELECT * FROM brain_captures").toArray(),
    ).toHaveLength(1);
    expect(store.search("diapers").length).toBeGreaterThan(0);
    expect(store.recentCaptures()).toEqual([]);
    expect(store.isArchived("message-1")).toBe(true);
    // Retrying an archived ID leaves it archived and still checks for conflicts.
    store.capture("message-1", "Buy diapers for the baby", "api");
    expect(store.recentCaptures()).toEqual([]);
    expect(() =>
      store.capture("message-1", "Something different", "api"),
    ).toThrow("Capture ID already");
    store.capture("message-2", "Bought the diapers", "chat");
    expect(store.recentCaptures().map((m) => m.id)).toEqual(["message-2"]);
    // Cleanup is consumed once, so later restarts retain the new chat.
    reopen();
    expect(store.recentCaptures().map((m) => m.id)).toEqual(["message-2"]);
  });
  it("defers cleanup until unfinished processing has settled", () => {
    prepareConversation("running");
    reopen();
    expect(store.recentCaptures()).toHaveLength(1);
    expect(store.sql.exec("SELECT * FROM pi_entries").toArray()).toHaveLength(
      1,
    );
    expect(
      store.sql.exec("SELECT * FROM brain_maintenance").toArray(),
    ).toHaveLength(1);
    store.sql.exec("UPDATE pi_tasks SET status = 'terminal'");
    // Queued input also prevents cleanup, even without a running task.
    reopen();
    expect(store.isArchived("message-1")).toBe(false);
    store.sql.exec("UPDATE pi_submissions SET status = 'done'");
    reopen();
    expect(store.isArchived("message-1")).toBe(true);
    expect(store.sql.exec("SELECT * FROM pi_entries").toArray()).toEqual([]);
  });
});
describe("durable personal records", () => {
  it("keeps why and inherited timing with a linked supplies item", () => {
    save("supplies", {
      title: "Baby supplies",
      why: "Ready before arrival",
      timing: "Before baby arrives",
      timing_source: "inherited",
    });
    save("diapers", {
      title: "Buy size 1 diapers",
      parent_id: "supplies",
      why: "Have essentials ready",
      timing: "Before baby arrives",
      timing_source: "inherited",
    });
    expect(store.get("diapers")).toMatchObject({
      parent_id: "supplies",
      due_date: null,
      why: "Have essentials ready",
    });
    expect(store.search("diapers").length).toBeGreaterThan(0);
  });
  it("does not apply replayed mutations twice", () => {
    const first = save("diapers", { title: "Buy diapers" });
    expect(save("diapers", { title: "Buy diapers" })).toEqual(first);
    expect(
      store.sql.exec("SELECT * FROM brain_changes").toArray(),
    ).toHaveLength(1);
  });
  it("rejects stale edits and preserves evidence", () => {
    save("car", { title: "Pay off car" });
    save("car", { title: "Pay off car", status: "done" }, 1, "finish-car");
    expect(() =>
      save("car", { title: "Car payment", status: "open" }, 1, "stale"),
    ).toThrow("Version conflict");
    expect(store.get("car").status).toBe("done");
    expect(
      store.sql
        .exec("SELECT * FROM brain_changes WHERE record_id = 'car'")
        .toArray(),
    ).toHaveLength(2);
  });
  it("rejects cycles, missing parents, and invalid context without partial writes", () => {
    save("parent", { title: "Prepare" });
    save("child", { title: "Supplies", parent_id: "parent" });
    expect(() =>
      save("parent", { title: "Prepare", parent_id: "child" }, 1, "cycle"),
    ).toThrow("cycle");
    expect(() =>
      save("orphan", { title: "Orphan", parent_id: "missing" }),
    ).toThrow("Parent");
    expect(() =>
      save("bad", { title: "Bad", context_ids: ["missing"] }),
    ).toThrow("Unknown context");
    expect(store.get("parent").parent_id).toBeNull();
  });
  it("deduplicates capture retries and rejects reused IDs with different contents", () => {
    store.capture("message-1", "Buy diapers for the baby", "api");
    expect(() => store.capture("message-1", "Something else", "api")).toThrow(
      "different message",
    );
    expect(
      store.sql.exec("SELECT * FROM brain_captures").toArray(),
    ).toHaveLength(1);
  });
  it("searches old messages safely even with punctuation or FTS operators", () => {
    expect(store.search('diapers OR "baby" * - :')).toHaveLength(1);
    expect(store.search('" : *')).toEqual([]);
  });
  it("keeps closed items out of active views without erasing history", () => {
    save("done", { title: "Bought supplies", status: "done" });
    save("dropped", { title: "Old idea", status: "dropped" });
    save("open", { title: "Export receipt", priority: "high" });
    expect(groupItems(store.list()).map((g) => g.title)).toEqual([
      "High priority",
    ]);
    expect(store.list()).toHaveLength(3);
  });
  it("undoes an item change without deleting history or overwriting newer work", () => {
    save("car", { title: "Pay car" });
    save("car", { title: "Pay car", status: "done" }, 1, "done-car");
    expect(store.undo("done-car").status).toBe("open");
    expect(store.get("car").version).toBe(3);
    expect(() => store.undo("done-car")).toThrow("Version conflict");
    save("idea", { title: "Maybe research a desk" });
    expect(store.undo("create-idea").status).toBe("dropped");
  });
  it("rejects mutation ID collisions across records", () => {
    save("one", { title: "One" }, 0, "shared");
    expect(() => save("two", { title: "Two" }, 0, "shared")).toThrow(
      "another change",
    );
  });
  it("retains latest version in the durable indexing outbox", () => {
    save("one", { title: "Original" });
    save("one", { title: "Updated" }, 1, "update");
    store.sql.exec(
      "DELETE FROM brain_index_outbox WHERE id = ? AND version = ?",
      "one",
      1,
    );
    expect(
      store.sql.exec("SELECT * FROM brain_index_outbox").toArray(),
    ).toEqual([{ id: "one", version: 2 }]);
  });
});

it("publishes derived plans without mutating tasks and rejects stale model results", () => {
  save("doula", { title: "Book doula", priority: "high" });
  const original = store.get("doula");
  const { revision } = store.dashboardState();
  const plan = {
    highlights: [{ item_id: "doula", reason: "Book support" }],
    groups: [
      {
        area_id: "family",
        title: "Family",
        summary: "Arrange support",
        item_ids: ["doula"],
        featured_item_ids: ["doula"],
      },
    ],
  };
  expect(store.publishDashboard(plan, revision)).toBe(true);
  expect(store.get("doula")).toEqual(original);
  expect(store.areas().some((a) => a.id === "family")).toBe(true);
  save("diapers", { title: "Buy diapers" });
  expect(store.publishDashboard(plan, revision)).toBe(false);
  expect(store.dashboardState().saved?.revision).toBe(revision);
  expect(store.dashboardState().revision).toBeGreaterThan(revision);
  expect(() =>
    store.publishDashboard(
      { ...plan, highlights: [{ item_id: "invented", reason: "Invalid" }] },
      store.dashboardState().revision,
    ),
  ).toThrow();
  expect(store.dashboardState().saved?.plan).toEqual(plan);
});
