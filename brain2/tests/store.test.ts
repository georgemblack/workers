import { DatabaseSync } from "node:sqlite";
import { expect, it } from "vitest";
import { Store, type SQL } from "../src/store";

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
  return { db, store: new Store(sql, transaction) };
}
const message = { text: "Renew passport", source: "chat" as const, refs: [] };

it("stores a capture once and rejects the same ID with different text", () => {
  const { store } = open();
  store.capture("m1", message);
  store.capture("m1", message);
  expect(store.conversation()).toHaveLength(1);
  expect(store.deliveries()).toEqual([{ id: "m1", state: "pending" }]);
  expect(() => store.capture("m1", { ...message, text: "Fix bike" })).toThrow(
    /already used/,
  );
});
it("bumps the revision when a message arrives or a reply is stored", () => {
  const { store } = open();
  expect(store.rev()).toBe(0);
  store.capture("m1", message);
  expect(store.rev()).toBe(1);
  store.result("m1", { status: "done", text: "Noted." }, true);
  expect(store.rev()).toBe(2);
  expect(store.completed("m1")).toBe(true);
  expect(store.conversation()[0].result.text).toBe("Noted.");
});
it("keeps hidden captures out of the conversation and stores refs", () => {
  const { store, db } = open();
  store.capture("m1", { ...message, refs: ["task_abc"] });
  store.capture("m2", { ...message, text: "Fix bike" });
  db.prepare("UPDATE captures SET hidden = 1 WHERE id = 'm2'").run();
  const messages = store.conversation();
  expect(messages.map((m) => m.id)).toEqual(["m1"]);
  expect(messages[0].refs).toEqual(["task_abc"]);
});
it("applies migrations once and repairs captures missing a delivery", () => {
  const { db, store } = open();
  store.capture("m1", message);
  db.prepare("DELETE FROM deliveries").run();
  const reopened = open(db).store;
  expect(reopened.deliveries()).toEqual([{ id: "m1", state: "pending" }]);
  expect(
    db.prepare("SELECT value FROM meta WHERE key = 'schema'").get(),
  ).toEqual({ value: "1" });
});
