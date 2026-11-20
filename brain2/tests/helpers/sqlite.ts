import { DatabaseSync } from "node:sqlite";
import { Store, type SQL } from "../../src/store";
import { registry } from "../../src/modules";
import type { TypeRegistry } from "../../src/modules/types";

/** A store on Node's built-in SQLite, standing in for Durable Object storage. */
export function openStore(reg: TypeRegistry = registry) {
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
  return { db, store: new Store(sql, transaction, reg) };
}

/** Small helpers for writing records in tests, all credited to message "m1". */
export function writer(store: Store) {
  let n = 0;
  store.capture("m1", { text: "Fixture message", source: "chat", refs: [] });
  const create = (
    type: string,
    title: string,
    props: Record<string, unknown> = {},
    links: Record<string, string[]> = {},
  ) =>
    store.saveNode({
      intent: "create",
      type,
      patch: { title, props },
      links,
      expectedVersion: 0,
      sourceId: "m1",
      mutationId: `w-${++n}`,
    });
  const update = (
    id: string,
    patch: Record<string, unknown>,
    links?: Record<string, string[]>,
  ) => {
    const node = store.getNode(id)!;
    return store.saveNode({
      intent: "update",
      id,
      type: node.type,
      patch,
      links,
      expectedVersion: node.version,
      sourceId: "m1",
      mutationId: `w-${++n}`,
    });
  };
  const entry = (
    nodeIds: string[],
    text: string,
    occurredOn: string | null = null,
  ) =>
    store.saveEntry({
      intent: "create",
      nodeIds,
      text,
      occurredOn,
      expectedVersion: 0,
      sourceId: "m1",
      mutationId: `w-${++n}`,
    });
  return { create, update, entry };
}
