import { DatabaseSync } from "node:sqlite";
import { describe, it, expect, beforeEach } from "vitest";
import { Store, type SQL } from "../src/store";
import { itemInput } from "../src/domain";
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
    expect(store.conversation()).toEqual([]);
    expect(store.isArchived("message-1")).toBe(true);
    // Retrying an archived ID leaves it archived and still checks for conflicts.
    store.capture("message-1", "Buy diapers for the baby", "api");
    expect(store.conversation()).toEqual([]);
    expect(() =>
      store.capture("message-1", "Something different", "api"),
    ).toThrow("Capture ID already");
    store.capture("message-2", "Bought the diapers", "chat");
    expect(store.conversation().map((m) => m.id)).toEqual(["message-2"]);
    // Cleanup is consumed once, so later restarts retain the new chat.
    reopen();
    expect(store.conversation().map((m) => m.id)).toEqual(["message-2"]);
  });
  it("defers cleanup until unfinished processing has settled", () => {
    prepareConversation("running");
    reopen();
    expect(store.conversation()).toHaveLength(1);
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
  it("keeps notes and a soft target with a linked supplies item", () => {
    save("supplies", {
      title: "Baby supplies",
      notes: "Ready before arrival",
      target: "Before baby arrives",
    });
    save("diapers", {
      title: "Buy size 1 diapers",
      parent_id: "supplies",
      notes: "Have essentials ready",
    });
    expect(store.get("diapers")).toMatchObject({
      parent_id: "supplies",
      due_date: null,
      target: "",
      notes: "Have essentials ready",
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
    expect(
      store
        .list()
        .filter((i) => !["done", "dropped"].includes(i.status))
        .map((i) => i.title),
    ).toEqual(["Export receipt"]);
    expect(store.list()).toHaveLength(3);
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
    groups: [{ area_id: "family", title: "Family", item_ids: ["doula"] }],
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
      { groups: [{ ...plan.groups[0], item_ids: ["invented"] }] },
      store.dashboardState().revision,
    ),
  ).toThrow();
  expect(store.dashboardState().saved?.plan).toEqual(plan);
});

it("patches only supplied fields and requires explicit clearing", () => {
  save("parent", { title: "Baby supplies" });
  save("diapers", {
    title: "Buy diapers",
    notes: "Prepare for baby",
    parent_id: "parent",
    priority: "high",
    due_date: "2026-12-15",
    context_ids: [],
  });
  const updated = save("diapers", { status: "done" }, 1, "finish-diapers");
  expect(updated).toMatchObject({
    title: "Buy diapers",
    notes: "Prepare for baby",
    parent_id: "parent",
    priority: "high",
    due_date: "2026-12-15",
    status: "done",
  });
  expect(
    save("diapers", { due_date: null, notes: "" }, 2, "clear-fields"),
  ).toMatchObject({
    due_date: null,
    notes: "",
    status: "done",
    parent_id: "parent",
  });
  expect(() =>
    save("diapers", { invented_field: true }, 3, "bad-field"),
  ).toThrow("Unknown record field");
});
it("distinguishes creating from updating and exports audit/source data", () => {
  const args = {
    id: "record",
    kind: "item" as const,
    data: { title: "Record" },
    expected_version: 0,
    source_id: "message-1",
    mutation_id: "create",
  };
  expect(() => store.save({ ...args, intent: "update" })).toThrow("not found");
  store.save({ ...args, intent: "create" });
  expect(() =>
    store.save({
      ...args,
      intent: "create",
      mutation_id: "second-create",
      expected_version: 1,
    }),
  ).toThrow("already exists");
  const exported = store.exportData();
  expect(exported.format).toBe("brain-export");
  expect(exported.tables.brain_records).toHaveLength(1);
  expect(exported.tables.brain_changes).toHaveLength(1);
  expect(exported.tables.brain_captures).toHaveLength(1);
  expect(exported.tables).not.toHaveProperty("_cf_METADATA");
});
it("tracks delivery receipts and exposes processing/index diagnostics", () => {
  expect(store.deliveries()).toEqual([{ id: "message-1", state: "pending" }]);
  store.accepted("message-1");
  store.result("message-1", { status: "done", text: "Saved" }, true);
  expect(store.deliveries()).toEqual([]);
  expect(store.conversation()[0].result).toEqual({
    status: "done",
    text: "Saved",
  });
  store.health("index", new Error("Temporarily unavailable"));
  expect(store.diagnostics().health[0]).toMatchObject({
    component: "index",
    last_error: "Temporarily unavailable",
  });
  store.health("index");
  expect(store.diagnostics().health[0].last_error).toBeNull();
});

it("upgrades older items to notes and target once, with an audit trail", () => {
  store.sql.exec(
    "INSERT INTO brain_records VALUES ('old', 'item', ?, 3, '2026-10-01', 'message-1')",
    JSON.stringify({
      title: "Book doula",
      why: "Support after birth",
      details: "Email the agency",
      status: "waiting",
      priority: "high",
      priority_reason: "User said so",
      parent_id: null,
      area_id: null,
      timing: "October–November",
      timing_source: "explicit",
      due_date: null,
      scheduled_at: null,
      follow_up_at: "2026-11-05",
      waiting_for: "a reply",
      context_ids: [],
      needs_clarification: "",
    }),
  );
  store = new Store(store.sql, store.transaction);
  store = new Store(store.sql, store.transaction);
  expect(store.get("old")).toEqual({
    id: "old",
    kind: "item",
    version: 4,
    updated_at: expect.any(String),
    source_id: "upgrade-item-fields-2026-11",
    title: "Book doula",
    notes:
      "Support after birth\n\nEmail the agency\n\nWaiting for: a reply\n\nTiming: October–November",
    status: "waiting",
    priority: "high",
    parent_id: null,
    area_id: null,
    due_date: "2026-11-05",
    target: "",
    context_ids: [],
  });
  const changes = store.sql
    .exec<{ before_data: string }>(
      "SELECT before_data FROM brain_changes WHERE record_id = 'old'",
    )
    .toArray();
  expect(changes).toHaveLength(1);
  expect(JSON.parse(changes[0].before_data).priority_reason).toBe(
    "User said so",
  );
  expect(store.conversation().map((m) => m.id)).not.toContain(
    "upgrade-item-fields-2026-11",
  );
});
