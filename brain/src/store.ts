import { contextInput, ftsQuery, itemInput, type Item } from "./domain";

type Cursor<T> = Iterable<T> & { toArray(): T[] };
export interface SQL {
  exec<
    T extends Record<string, SqlStorageValue> = Record<string, SqlStorageValue>,
  >(
    query: string,
    ...bindings: (string | number | null)[]
  ): Cursor<T>;
}
export class Store {
  constructor(
    readonly sql: SQL,
    readonly transaction: <T>(fn: () => T) => T,
  ) {
    sql.exec(`CREATE TABLE IF NOT EXISTS brain_records (
      id TEXT PRIMARY KEY, kind TEXT NOT NULL, data TEXT NOT NULL, version INTEGER NOT NULL,
      updated_at TEXT NOT NULL, source_id TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS brain_changes (id TEXT PRIMARY KEY, record_id TEXT NOT NULL, before_data TEXT, after_data TEXT NOT NULL, source_id TEXT NOT NULL, created_at TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS brain_captures (id TEXT PRIMARY KEY, text TEXT NOT NULL, source TEXT NOT NULL, created_at TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS brain_archived_captures (id TEXT PRIMARY KEY);
      CREATE TABLE IF NOT EXISTS brain_maintenance (command TEXT PRIMARY KEY);
      CREATE TABLE IF NOT EXISTS brain_index_outbox (id TEXT PRIMARY KEY, version INTEGER NOT NULL);
      CREATE VIRTUAL TABLE IF NOT EXISTS brain_fts USING fts5(id UNINDEXED, kind UNINDEXED, text);
      CREATE INDEX IF NOT EXISTS brain_records_kind ON brain_records(kind);`);
    this.applyMaintenance();
  }
  // Runs before Pi opens its storage, so it cannot retain a cached transcript.
  // Only account-level operators can queue this command through the SQL API.
  private applyMaintenance() {
    this.transaction(() => {
      if (
        !this.sql
          .exec(
            "SELECT command FROM brain_maintenance WHERE command = 'clear_conversation'",
          )
          .toArray().length
      )
        return;
      const tables = new Set(
        this.sql
          .exec<{ name: string }>(
            "SELECT name FROM sqlite_master WHERE type = 'table'",
          )
          .toArray()
          .map((row) => row.name),
      );
      // Never discard queued or interrupted work. Leave the command pending
      // and let Pi finish; an idle object restart can then apply it.
      if (
        tables.has("pi_tasks") &&
        this.sql
          .exec("SELECT id FROM pi_tasks WHERE status != 'terminal' LIMIT 1")
          .toArray().length
      )
        return;
      if (
        tables.has("pi_submissions") &&
        this.sql
          .exec(
            "SELECT id FROM pi_submissions WHERE status IN ('queued', 'placed') LIMIT 1",
          )
          .toArray().length
      )
        return;
      this.sql.exec(
        "INSERT OR IGNORE INTO brain_archived_captures SELECT id FROM brain_captures",
      );
      // Keep Pi's schema version and monotonic ID/commit allocators, but remove
      // conversation content, tool outputs, run state, and old operation receipts.
      for (const table of [
        "pi_document_revisions",
        "pi_documents",
        "pi_tasks",
        "pi_submissions",
        "pi_entries",
        "pi_conversations",
        "pi_record_ids",
      ]) {
        if (tables.has(table)) this.sql.exec(`DELETE FROM ${table}`);
      }
      this.sql.exec(
        "DELETE FROM brain_maintenance WHERE command = 'clear_conversation'",
      );
    });
  }
  isArchived(id: string) {
    return (
      this.sql
        .exec("SELECT id FROM brain_archived_captures WHERE id = ?", id)
        .toArray().length > 0
    );
  }
  recentCaptures() {
    return this.sql
      .exec<{ id: string; text: string; source: string; created_at: string }>(
        "SELECT * FROM brain_captures WHERE source != 'manual' AND id NOT IN (SELECT id FROM brain_archived_captures) ORDER BY created_at DESC, rowid DESC LIMIT 60",
      )
      .toArray()
      .reverse();
  }
  get(id: string) {
    const row = this.sql
      .exec<{
        id: string;
        kind: string;
        data: string;
        version: number;
        updated_at: string;
        source_id: string;
      }>("SELECT * FROM brain_records WHERE id = ?", id)
      .toArray()[0];
    return row
      ? {
          ...JSON.parse(row.data),
          id: row.id,
          kind: row.kind,
          version: row.version,
          updated_at: row.updated_at,
          source_id: row.source_id,
        }
      : null;
  }
  list(kind = "item"): Item[] {
    return this.sql
      .exec<{ id: string }>(
        "SELECT id FROM brain_records WHERE kind = ? ORDER BY updated_at DESC",
        kind,
      )
      .toArray()
      .map((row) => this.get(row.id));
  }
  save(args: {
    id: string;
    kind: "item" | "context";
    data: unknown;
    expected_version: number;
    source_id: string;
    mutation_id: string;
  }) {
    return this.transaction(() => {
      const priorChange = this.sql
        .exec<{ after_data: string }>(
          "SELECT after_data FROM brain_changes WHERE id = ?",
          args.mutation_id,
        )
        .toArray()[0];
      if (priorChange) {
        const committed = JSON.parse(priorChange.after_data);
        if (committed.id !== args.id || committed.source_id !== args.source_id)
          throw new Error("Mutation ID already belongs to another change");
        return committed;
      }
      if (
        !this.sql
          .exec("SELECT id FROM brain_captures WHERE id = ?", args.source_id)
          .toArray().length
      )
        throw new Error("Unknown source message");
      const previous = this.get(args.id);
      if ((previous?.version ?? 0) !== args.expected_version)
        throw new Error("Version conflict: reload the record before editing");
      if (previous && previous.kind !== args.kind)
        throw new Error("Cannot change record kind");
      const data =
        args.kind === "item"
          ? itemInput.parse(args.data)
          : contextInput.parse(args.data);
      if (args.kind === "item") {
        const item = itemInput.parse(data);
        let ancestor = item.parent_id;
        const visited = new Set([args.id]);
        while (ancestor) {
          if (visited.has(ancestor))
            throw new Error("Parent relationship would form a cycle");
          visited.add(ancestor);
          const parent = this.get(ancestor);
          if (!parent || parent.kind !== "item")
            throw new Error("Parent must be an existing item");
          ancestor = parent.parent_id;
        }
        for (const id of item.context_ids)
          if (this.get(id)?.kind !== "context")
            throw new Error("Unknown context record");
      }
      const now = new Date().toISOString();
      const record = {
        ...data,
        id: args.id,
        kind: args.kind,
        version: args.expected_version + 1,
        updated_at: now,
        source_id: args.source_id,
      };
      this.sql.exec(
        "INSERT OR REPLACE INTO brain_records VALUES (?, ?, ?, ?, ?, ?)",
        args.id,
        args.kind,
        JSON.stringify(data),
        record.version,
        now,
        args.source_id,
      );
      this.sql.exec(
        "INSERT INTO brain_changes VALUES (?, ?, ?, ?, ?, ?)",
        args.mutation_id,
        args.id,
        previous ? JSON.stringify(previous) : null,
        JSON.stringify(record),
        args.source_id,
        now,
      );
      this.sql.exec("DELETE FROM brain_fts WHERE id = ?", args.id);
      this.sql.exec(
        "INSERT INTO brain_fts VALUES (?, ?, ?)",
        args.id,
        args.kind,
        JSON.stringify(data),
      );
      this.sql.exec(
        "INSERT OR REPLACE INTO brain_index_outbox VALUES (?, ?)",
        args.id,
        record.version,
      );
      return record;
    });
  }
  search(query: string) {
    const match = ftsQuery(query);
    if (!match) return [];
    return this.sql
      .exec<{ id: string; kind: string }>(
        "SELECT id, kind FROM brain_fts WHERE brain_fts MATCH ? ORDER BY rank LIMIT 30",
        match,
      )
      .toArray()
      .map((row) =>
        row.kind === "message"
          ? this.sql
              .exec("SELECT * FROM brain_captures WHERE id = ?", row.id)
              .toArray()[0]
          : this.get(row.id),
      );
  }
  undo(changeId: string) {
    const change = this.sql
      .exec<{
        record_id: string;
        before_data: string | null;
        after_data: string;
      }>("SELECT * FROM brain_changes WHERE id = ?", changeId)
      .toArray()[0];
    if (!change) throw new Error("Change not found");
    const current = this.get(change.record_id);
    const after = JSON.parse(change.after_data);
    if (!current || current.version !== after.version)
      throw new Error("Version conflict: a newer change exists");
    if (current.kind !== "item")
      throw new Error("Only item changes can be undone here");
    const source = `manual-${crypto.randomUUID()}`;
    this.capture(source, `Undo change ${changeId}`, "manual");
    return this.save({
      id: current.id,
      kind: "item",
      expected_version: current.version,
      source_id: source,
      mutation_id: source,
      data: change.before_data
        ? JSON.parse(change.before_data)
        : { ...current, status: "dropped" },
    });
  }
  capture(id: string, text: string, source: string) {
    return this.transaction(() => {
      const previous = this.sql
        .exec<{ text: string; source: string }>(
          "SELECT * FROM brain_captures WHERE id = ?",
          id,
        )
        .toArray()[0];
      if (previous && (previous.text !== text || previous.source !== source))
        throw new Error("Capture ID already used for a different message");
      if (!previous) {
        this.sql.exec(
          "INSERT INTO brain_captures VALUES (?, ?, ?, ?)",
          id,
          text,
          source,
          new Date().toISOString(),
        );
        this.sql.exec(
          "INSERT INTO brain_fts VALUES (?, 'message', ?)",
          id,
          text,
        );
      }
    });
  }
}
