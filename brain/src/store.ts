import { contextInput, ftsQuery, itemInput, type Item } from "./domain";
import {
  defaultAreas,
  validatePlan,
  type SavedPlan,
  type Area,
} from "./dashboard";
import { z } from "zod";

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
      CREATE TABLE IF NOT EXISTS brain_deliveries (id TEXT PRIMARY KEY, state TEXT NOT NULL DEFAULT 'pending', result TEXT);
      CREATE TABLE IF NOT EXISTS brain_health (component TEXT PRIMARY KEY, last_success TEXT, last_error TEXT, last_error_at TEXT);
      CREATE TABLE IF NOT EXISTS brain_areas (id TEXT PRIMARY KEY, title TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS brain_dashboard (id INTEGER PRIMARY KEY CHECK(id=1), revision INTEGER NOT NULL DEFAULT 0, plan TEXT, plan_revision INTEGER, generated_at TEXT);
      INSERT OR IGNORE INTO brain_dashboard (id,revision) VALUES (1,0);
      CREATE VIRTUAL TABLE IF NOT EXISTS brain_fts USING fts5(id UNINDEXED, kind UNINDEXED, text);
      CREATE INDEX IF NOT EXISTS brain_records_kind ON brain_records(kind);`);
    this.applyMaintenance();
    // One-time catch-up for existing captures; completed receipts persist across restarts.
    sql.exec(
      "INSERT OR IGNORE INTO brain_deliveries (id) SELECT id FROM brain_captures WHERE source != 'manual' AND id NOT IN (SELECT id FROM brain_archived_captures)",
    );
    for (const area of defaultAreas)
      this.sql.exec(
        "INSERT OR IGNORE INTO brain_areas VALUES (?, ?)",
        area.id,
        area.title,
      );
  }
  accepted(id: string) {
    this.sql.exec(
      "UPDATE brain_deliveries SET state='accepted' WHERE id=? AND state='pending'",
      id,
    );
  }
  result(id: string, result: unknown, done: boolean) {
    this.sql.exec(
      "UPDATE brain_deliveries SET state=?,result=? WHERE id=?",
      done ? "done" : "accepted",
      JSON.stringify(result),
      id,
    );
  }
  deliveries() {
    return this.sql
      .exec<{ id: string; state: string }>(
        "SELECT id,state FROM brain_deliveries WHERE state != 'done' AND COALESCE(json_extract(result,'$.status'),'') != 'parked' ORDER BY rowid LIMIT 30",
      )
      .toArray();
  }
  resumeParked() {
    this.sql.exec(
      "UPDATE brain_deliveries SET result=NULL WHERE state='accepted' AND json_extract(result,'$.status')='parked'",
    );
  }
  completed(id: string) {
    return (
      this.sql
        .exec("SELECT id FROM brain_deliveries WHERE id=? AND state='done'", id)
        .toArray().length > 0
    );
  }
  health(component: string, error?: unknown) {
    if (error !== undefined)
      this.sql.exec(
        "INSERT INTO brain_health (component,last_error,last_error_at) VALUES (?,?,?) ON CONFLICT(component) DO UPDATE SET last_error=excluded.last_error,last_error_at=excluded.last_error_at",
        component,
        String(error instanceof Error ? error.message : error).slice(0, 2000),
        new Date().toISOString(),
      );
    else
      this.sql.exec(
        "INSERT INTO brain_health (component,last_success) VALUES (?,?) ON CONFLICT(component) DO UPDATE SET last_success=excluded.last_success,last_error=NULL",
        component,
        new Date().toISOString(),
      );
  }
  conversation() {
    return this.sql
      .exec<{
        id: string;
        text: string;
        source: string;
        created_at: string;
        result: string | null;
      }>(
        "SELECT c.*,d.result FROM brain_captures c LEFT JOIN brain_deliveries d ON d.id=c.id WHERE c.source != 'manual' AND c.id NOT IN (SELECT id FROM brain_archived_captures) ORDER BY c.created_at DESC,c.rowid DESC LIMIT 60",
      )
      .toArray()
      .reverse()
      .map(({ result, ...capture }) => ({
        ...capture,
        result: result
          ? (JSON.parse(result) as {
              status: string;
              text?: string;
              reason?: string;
            })
          : { status: "queued" },
      }));
  }
  exportData() {
    const tables: Record<string, unknown[]> = {};
    const existing = new Set(
      this.sql
        .exec<{ name: string }>(
          "SELECT name FROM sqlite_master WHERE type='table'",
        )
        .toArray()
        .map((row) => row.name),
    );
    for (const name of [
      "brain_records",
      "brain_changes",
      "brain_captures",
      "brain_archived_captures",
      "brain_deliveries",
      "brain_areas",
      "brain_dashboard",
      "brain_health",
      "pi_durable_schema",
      "pi_durable_metadata",
      "pi_record_ids",
      "pi_conversations",
      "pi_entries",
      "pi_submissions",
      "pi_documents",
      "pi_document_revisions",
      "pi_tasks",
    ]) {
      if (existing.has(name))
        tables[name] = this.sql
          .exec(`SELECT * FROM ${name} ORDER BY rowid`)
          .toArray();
    }
    return {
      format: "brain-export",
      version: 1,
      exported_at: new Date().toISOString(),
      tables,
    };
  }
  diagnostics() {
    const count = (table: string, where = "") =>
      this.sql
        .exec<{ n: number }>(`SELECT count(*) AS n FROM ${table} ${where}`)
        .toArray()[0].n;
    const { revision, saved } = this.dashboardState();
    return {
      dashboard: {
        revision,
        plan_revision: saved?.revision ?? null,
        last_success: saved?.generated_at ?? null,
        stale: saved?.revision !== revision,
      },
      captures: {
        pending: count("brain_deliveries", "WHERE state != 'done'"),
        failed: count(
          "brain_deliveries",
          "WHERE json_extract(result,'$.status') IN ('unanswered','parked')",
        ),
      },
      index_backlog: count("brain_index_outbox"),
      health: this.sql.exec("SELECT * FROM brain_health").toArray(),
    };
  }
  areas(): Area[] {
    return this.sql
      .exec<Area>("SELECT * FROM brain_areas ORDER BY rowid")
      .toArray();
  }
  dashboardState() {
    const row = this.sql
      .exec<{
        revision: number;
        plan: string | null;
        plan_revision: number | null;
        generated_at: string | null;
      }>("SELECT * FROM brain_dashboard WHERE id=1")
      .toArray()[0];
    return {
      revision: row.revision,
      saved:
        row.plan && row.generated_at
          ? ({
              revision: row.plan_revision!,
              generated_at: row.generated_at,
              plan: JSON.parse(row.plan),
            } as SavedPlan)
          : null,
    };
  }
  publishDashboard(input: unknown, revision: number) {
    return this.transaction(() => {
      if (this.dashboardState().revision !== revision) return false;
      const plan = validatePlan(input, this.list());
      for (const group of plan.groups)
        this.sql.exec(
          "INSERT OR IGNORE INTO brain_areas VALUES (?, ?)",
          group.area_id,
          group.title,
        );
      this.sql.exec(
        "UPDATE brain_dashboard SET plan=?,plan_revision=?,generated_at=? WHERE id=1",
        JSON.stringify(plan),
        revision,
        new Date().toISOString(),
      );
      return true;
    });
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
      this.sql.exec("DELETE FROM brain_deliveries");
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
    intent?: "create" | "update";
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
      if (args.intent === "create" && previous)
        throw new Error("Record already exists; use update_record");
      if (args.intent === "update" && !previous)
        throw new Error("Record not found; use create_record");
      if ((previous?.version ?? 0) !== args.expected_version)
        throw new Error("Version conflict: reload the record before editing");
      if (previous && previous.kind !== args.kind)
        throw new Error("Cannot change record kind");
      const schema = args.kind === "item" ? itemInput : contextInput;
      const patch = z.record(z.string(), z.unknown()).parse(args.data);
      const metadata = new Set([
        "id",
        "kind",
        "version",
        "updated_at",
        "source_id",
      ]);
      for (const key of Object.keys(patch)) {
        if (metadata.has(key)) delete patch[key];
        else if (!(key in schema.shape))
          throw new Error(`Unknown record field: ${key}`);
      }
      // Omitted fields retain their current values; explicit null/empty values clear them.
      const data = schema.parse({ ...previous, ...patch });
      if (args.kind === "item") {
        const item = itemInput.parse(data);
        if (
          item.area_id &&
          !this.areas().some((area) => area.id === item.area_id)
        )
          throw new Error("Unknown area");
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
      this.sql.exec(
        "UPDATE brain_dashboard SET revision=revision+1 WHERE id=1",
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
        if (source !== "manual")
          this.sql.exec("INSERT INTO brain_deliveries (id) VALUES (?)", id);
      }
    });
  }
}
