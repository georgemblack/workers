import { z } from "zod";
import {
  ftsQuery,
  recordTypes,
  type Event,
  type Politician,
  type RecordType,
  type Sentiment,
} from "./domain";

type Cursor<T> = Iterable<T> & { toArray(): T[] };
export interface SQL {
  exec<
    T extends Record<string, SqlStorageValue> = Record<string, SqlStorageValue>,
  >(
    query: string,
    ...bindings: (string | number | null)[]
  ): Cursor<T>;
}
export type StoredRecord =
  ({ type: "politician" } & Politician) | ({ type: "event" } & Event);
export type EventFilter = {
  politician_id?: string;
  from?: string;
  to?: string;
  sentiment?: Sentiment;
  limit?: number;
};

export class Store {
  constructor(
    readonly sql: SQL,
    readonly transaction: <T>(fn: () => T) => T,
  ) {
    sql.exec(`CREATE TABLE IF NOT EXISTS politicians (
        id TEXT PRIMARY KEY, name TEXT NOT NULL, office TEXT NOT NULL, notes TEXT NOT NULL,
        version INTEGER NOT NULL, updated_at TEXT NOT NULL, source_id TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY, politician_id TEXT NOT NULL, date TEXT NOT NULL,
        sentiment TEXT NOT NULL CHECK (sentiment IN ('positive','neutral','negative')),
        summary TEXT NOT NULL, version INTEGER NOT NULL, updated_at TEXT NOT NULL, source_id TEXT NOT NULL);
      CREATE INDEX IF NOT EXISTS events_by_date ON events(date);
      CREATE INDEX IF NOT EXISTS events_by_politician ON events(politician_id, date);
      CREATE TABLE IF NOT EXISTS sources (
        event_id TEXT NOT NULL, position INTEGER NOT NULL, url TEXT NOT NULL, title TEXT NOT NULL,
        PRIMARY KEY (event_id, position));
      CREATE TABLE IF NOT EXISTS changes (
        id TEXT PRIMARY KEY, record_type TEXT NOT NULL, record_id TEXT NOT NULL, request TEXT NOT NULL,
        before_data TEXT, after_data TEXT, source_id TEXT NOT NULL, created_at TEXT NOT NULL);
      CREATE INDEX IF NOT EXISTS changes_by_record ON changes(record_id, created_at);
      CREATE TABLE IF NOT EXISTS captures (id TEXT PRIMARY KEY, text TEXT NOT NULL, source TEXT NOT NULL, created_at TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS archived_captures (id TEXT PRIMARY KEY);
      CREATE TABLE IF NOT EXISTS maintenance (command TEXT PRIMARY KEY);
      CREATE TABLE IF NOT EXISTS deliveries (id TEXT PRIMARY KEY, state TEXT NOT NULL DEFAULT 'pending', result TEXT);
      CREATE TABLE IF NOT EXISTS health (component TEXT PRIMARY KEY, last_success TEXT, last_error TEXT, last_error_at TEXT);
      CREATE VIRTUAL TABLE IF NOT EXISTS search_index USING fts5(id UNINDEXED, kind UNINDEXED, text);`);
    this.applyMaintenance();
  }

  // ---- Reading politicians and events ----

  private sourcesFor(eventId: string) {
    return this.sql
      .exec<{ url: string; title: string }>(
        "SELECT url, title FROM sources WHERE event_id = ? ORDER BY position",
        eventId,
      )
      .toArray()
      .map(({ url, title }) => ({ url, title }));
  }
  private eventRow(row: Record<string, SqlStorageValue>): Event {
    return {
      ...(row as unknown as Event),
      sources: this.sourcesFor(String(row.id)),
    };
  }
  get(id: string): StoredRecord | null {
    const politician = this.sql
      .exec("SELECT * FROM politicians WHERE id = ?", id)
      .toArray()[0];
    if (politician)
      return { type: "politician", ...(politician as unknown as Politician) };
    const event = this.sql
      .exec("SELECT * FROM events WHERE id = ?", id)
      .toArray()[0];
    return event ? { type: "event", ...this.eventRow(event) } : null;
  }
  /** Every politician, with a tally of their events by sentiment. */
  politicians() {
    return this.sql
      .exec<
        Politician & { positive: number; neutral: number; negative: number }
      >(
        `SELECT p.*,
          COALESCE(SUM(e.sentiment = 'positive'), 0) AS positive,
          COALESCE(SUM(e.sentiment = 'neutral'), 0) AS neutral,
          COALESCE(SUM(e.sentiment = 'negative'), 0) AS negative
        FROM politicians p LEFT JOIN events e ON e.politician_id = p.id
        GROUP BY p.id ORDER BY p.name COLLATE NOCASE`,
      )
      .toArray();
  }
  /** Events newest first, optionally narrowed by politician, date range, and sentiment. */
  events(filter: EventFilter = {}): Event[] {
    const where: string[] = [];
    const params: (string | number)[] = [];
    if (filter.politician_id) {
      where.push("politician_id = ?");
      params.push(filter.politician_id);
    }
    if (filter.from) {
      where.push("date >= ?");
      params.push(filter.from);
    }
    if (filter.to) {
      where.push("date <= ?");
      params.push(filter.to);
    }
    if (filter.sentiment) {
      where.push("sentiment = ?");
      params.push(filter.sentiment);
    }
    const limit = Math.min(Math.max(filter.limit ?? 200, 1), 5000);
    return this.sql
      .exec(
        `SELECT * FROM events ${where.length ? "WHERE " + where.join(" AND ") : ""}
        ORDER BY date DESC, updated_at DESC LIMIT ?`,
        ...params,
        limit,
      )
      .toArray()
      .map((row) => this.eventRow(row));
  }
  timeline() {
    return {
      politicians: this.politicians(),
      events: this.events({ limit: 5000 }),
    };
  }
  history(id: string) {
    return this.sql
      .exec(
        "SELECT id, before_data, after_data, source_id, created_at FROM changes WHERE record_id = ? ORDER BY created_at DESC LIMIT 10",
        id,
      )
      .toArray();
  }
  search(query: string) {
    const match = ftsQuery(query);
    if (!match) return [];
    return this.sql
      .exec<{ id: string; kind: string }>(
        "SELECT id, kind FROM search_index WHERE search_index MATCH ? ORDER BY rank LIMIT 30",
        match,
      )
      .toArray()
      .map((row) =>
        row.kind === "message"
          ? {
              type: "message",
              ...this.sql
                .exec("SELECT * FROM captures WHERE id = ?", row.id)
                .toArray()[0],
            }
          : this.get(row.id),
      )
      .filter(Boolean);
  }

  // ---- Changing politicians and events ----

  /**
   * Creates or updates a record. Every write is tied to the chat message that
   * asked for it, checked against the version the agent last read, and logged
   * in `changes`. Repeating a mutation_id returns the original result instead
   * of applying the change twice.
   */
  save(args: {
    type: RecordType;
    intent: "create" | "update";
    id?: string;
    data: unknown;
    expected_version?: number;
    source_id: string;
    mutation_id: string;
  }) {
    const request = JSON.stringify({
      type: args.type,
      intent: args.intent,
      id: args.id ?? null,
      data: args.data,
    });
    return this.transaction(() => {
      const prior = this.replayed(args.mutation_id, args.source_id, request);
      if (prior !== undefined) return prior;
      this.requireMessage(args.source_id);
      const schema = recordTypes[args.type];
      let previous: StoredRecord | null = null;
      if (args.intent === "update") {
        previous = args.id ? this.get(args.id) : null;
        if (!previous || previous.type !== args.type)
          throw new Error(`No ${args.type} with that ID`);
        if (previous.version !== args.expected_version)
          throw new Error("Version conflict: reload the record before editing");
      }
      const patch = z.record(z.string(), z.unknown()).parse(args.data);
      const fields = Object.keys(schema.shape);
      for (const key of Object.keys(patch))
        if (!fields.includes(key))
          throw new Error(`Unknown ${args.type} field: ${key}`);
      // Fields left out of an update keep their current values.
      const current = Object.fromEntries(
        fields.map((key) => [
          key,
          (previous as Record<string, unknown> | null)?.[key],
        ]),
      );
      const data = schema.parse({ ...current, ...patch });
      if (args.type === "event") {
        const owner = this.get((data as Event).politician_id);
        if (owner?.type !== "politician")
          throw new Error("politician_id must be an existing politician");
      }
      const id = previous?.id ?? crypto.randomUUID();
      const version = (previous?.version ?? 0) + 1;
      const now = new Date().toISOString();
      if (args.type === "politician") {
        const p = data as Politician;
        this.sql.exec(
          "INSERT OR REPLACE INTO politicians VALUES (?, ?, ?, ?, ?, ?, ?)",
          id,
          p.name,
          p.office,
          p.notes,
          version,
          now,
          args.source_id,
        );
      } else {
        const e = data as Event;
        this.sql.exec(
          "INSERT OR REPLACE INTO events VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          id,
          e.politician_id,
          e.date,
          e.sentiment,
          e.summary,
          version,
          now,
          args.source_id,
        );
        this.sql.exec("DELETE FROM sources WHERE event_id = ?", id);
        e.sources.forEach((source, position) =>
          this.sql.exec(
            "INSERT INTO sources VALUES (?, ?, ?, ?)",
            id,
            position,
            source.url,
            source.title,
          ),
        );
      }
      const record = this.get(id)!;
      this.logChange(
        args.mutation_id,
        record.type,
        id,
        request,
        previous,
        record,
        args.source_id,
        now,
      );
      this.reindex(record);
      return record;
    });
  }
  /** Deletes an event, or a politician who has no events left. */
  remove(args: {
    id: string;
    expected_version: number;
    source_id: string;
    mutation_id: string;
  }) {
    const request = JSON.stringify({ intent: "delete", id: args.id });
    return this.transaction(() => {
      const prior = this.replayed(args.mutation_id, args.source_id, request);
      if (prior !== undefined) return prior;
      this.requireMessage(args.source_id);
      const previous = this.get(args.id);
      if (!previous) throw new Error("Record not found");
      if (previous.version !== args.expected_version)
        throw new Error("Version conflict: reload the record before editing");
      if (previous.type === "politician") {
        if (this.events({ politician_id: args.id, limit: 1 }).length)
          throw new Error(
            "This politician still has events; delete or move them first",
          );
        this.sql.exec("DELETE FROM politicians WHERE id = ?", args.id);
      } else {
        this.sql.exec("DELETE FROM events WHERE id = ?", args.id);
        this.sql.exec("DELETE FROM sources WHERE event_id = ?", args.id);
      }
      this.sql.exec("DELETE FROM search_index WHERE id = ?", args.id);
      const result = { deleted: true, type: previous.type, id: args.id };
      this.logChange(
        args.mutation_id,
        previous.type,
        args.id,
        request,
        previous,
        null,
        args.source_id,
        new Date().toISOString(),
      );
      return result;
    });
  }
  private replayed(mutationId: string, sourceId: string, request: string) {
    const prior = this.sql
      .exec<{
        record_id: string;
        record_type: string;
        request: string;
        after_data: string | null;
        source_id: string;
      }>("SELECT * FROM changes WHERE id = ?", mutationId)
      .toArray()[0];
    if (!prior) return undefined;
    if (prior.source_id !== sourceId || prior.request !== request)
      throw new Error(
        "mutation_id was already used for a different change; use a new one",
      );
    return prior.after_data
      ? JSON.parse(prior.after_data)
      : { deleted: true, type: prior.record_type, id: prior.record_id };
  }
  private requireMessage(id: string) {
    if (
      !this.sql.exec("SELECT id FROM captures WHERE id = ?", id).toArray()
        .length
    )
      throw new Error("Unknown source message");
  }
  private logChange(
    mutationId: string,
    type: string,
    id: string,
    request: string,
    before: unknown,
    after: unknown,
    sourceId: string,
    now: string,
  ) {
    this.sql.exec(
      "INSERT INTO changes VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      mutationId,
      type,
      id,
      request,
      before ? JSON.stringify(before) : null,
      after ? JSON.stringify(after) : null,
      sourceId,
      now,
    );
  }
  // Event search text includes the politician's name, so a rename re-indexes their events.
  private reindex(record: StoredRecord) {
    const index = (r: StoredRecord) => {
      let text: string;
      if (r.type === "politician")
        text = [r.name, r.office, r.notes].join("\n");
      else {
        const owner = this.get(r.politician_id);
        text = [
          r.summary,
          r.date,
          r.sentiment,
          owner?.type === "politician" ? `${owner.name} ${owner.office}` : "",
          ...r.sources.map((s) => `${s.title} ${s.url}`),
        ].join("\n");
      }
      this.sql.exec("DELETE FROM search_index WHERE id = ?", r.id);
      this.sql.exec(
        "INSERT INTO search_index VALUES (?, ?, ?)",
        r.id,
        r.type,
        text,
      );
    };
    index(record);
    if (record.type === "politician")
      for (const event of this.events({
        politician_id: record.id,
        limit: 5000,
      }))
        index({ type: "event", ...event });
  }

  // ---- Chat messages and their processing ----

  capture(id: string, text: string, source: string) {
    return this.transaction(() => {
      const previous = this.sql
        .exec<{ text: string; source: string }>(
          "SELECT * FROM captures WHERE id = ?",
          id,
        )
        .toArray()[0];
      if (previous && (previous.text !== text || previous.source !== source))
        throw new Error("Capture ID already used for a different message");
      if (!previous) {
        this.sql.exec(
          "INSERT INTO captures VALUES (?, ?, ?, ?)",
          id,
          text,
          source,
          new Date().toISOString(),
        );
        this.sql.exec(
          "INSERT INTO search_index VALUES (?, 'message', ?)",
          id,
          text,
        );
        this.sql.exec("INSERT INTO deliveries (id) VALUES (?)", id);
      }
    });
  }
  accepted(id: string) {
    this.sql.exec(
      "UPDATE deliveries SET state='accepted' WHERE id=? AND state='pending'",
      id,
    );
  }
  result(id: string, result: unknown, done: boolean) {
    this.sql.exec(
      "UPDATE deliveries SET state=?, result=? WHERE id=?",
      done ? "done" : "accepted",
      JSON.stringify(result),
      id,
    );
  }
  deliveries() {
    return this.sql
      .exec<{ id: string; state: string }>(
        "SELECT id, state FROM deliveries WHERE state != 'done' AND COALESCE(json_extract(result,'$.status'),'') != 'parked' ORDER BY rowid LIMIT 30",
      )
      .toArray();
  }
  resumeParked() {
    this.sql.exec(
      "UPDATE deliveries SET result=NULL WHERE state='accepted' AND json_extract(result,'$.status')='parked'",
    );
  }
  completed(id: string) {
    return (
      this.sql
        .exec("SELECT id FROM deliveries WHERE id=? AND state='done'", id)
        .toArray().length > 0
    );
  }
  isArchived(id: string) {
    return (
      this.sql
        .exec("SELECT id FROM archived_captures WHERE id = ?", id)
        .toArray().length > 0
    );
  }
  health(component: string, error?: unknown) {
    if (error !== undefined)
      this.sql.exec(
        "INSERT INTO health (component,last_error,last_error_at) VALUES (?,?,?) ON CONFLICT(component) DO UPDATE SET last_error=excluded.last_error,last_error_at=excluded.last_error_at",
        component,
        String(error instanceof Error ? error.message : error).slice(0, 2000),
        new Date().toISOString(),
      );
    else
      this.sql.exec(
        "INSERT INTO health (component,last_success) VALUES (?,?) ON CONFLICT(component) DO UPDATE SET last_success=excluded.last_success,last_error=NULL",
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
        "SELECT c.*, d.result FROM captures c LEFT JOIN deliveries d ON d.id=c.id WHERE c.id NOT IN (SELECT id FROM archived_captures) ORDER BY c.created_at DESC, c.rowid DESC LIMIT 30",
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
              detail?: string;
            })
          : { status: "queued" },
      }));
  }
  exportData() {
    const existing = new Set(
      this.sql
        .exec<{ name: string }>(
          "SELECT name FROM sqlite_master WHERE type='table'",
        )
        .toArray()
        .map((row) => row.name),
    );
    const tables: Record<string, unknown[]> = {};
    for (const name of [
      "politicians",
      "events",
      "sources",
      "changes",
      "captures",
      "archived_captures",
      "deliveries",
      "health",
      "pi_durable_schema",
      "pi_durable_metadata",
      "pi_record_ids",
      "pi_conversations",
      "pi_entries",
      "pi_submissions",
      "pi_documents",
      "pi_document_revisions",
      "pi_tasks",
    ])
      if (existing.has(name))
        tables[name] = this.sql
          .exec(`SELECT * FROM ${name} ORDER BY rowid`)
          .toArray();
    return {
      format: "govtrack-export",
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
    return {
      politicians: count("politicians"),
      events: count("events"),
      captures: {
        pending: count("deliveries", "WHERE state != 'done'"),
        failed: count(
          "deliveries",
          "WHERE json_extract(result,'$.status') IN ('unanswered','parked')",
        ),
      },
      health: this.sql.exec("SELECT * FROM health").toArray(),
    };
  }
  // Runs before Pi opens its storage. Clears the chat transcript (but keeps every
  // politician, event, and change) when an operator queues `clear_conversation`.
  private applyMaintenance() {
    this.transaction(() => {
      if (
        !this.sql
          .exec(
            "SELECT command FROM maintenance WHERE command = 'clear_conversation'",
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
      // Never discard unfinished work; try again on a later restart.
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
        "INSERT OR IGNORE INTO archived_captures SELECT id FROM captures",
      );
      this.sql.exec("DELETE FROM deliveries");
      for (const table of [
        "pi_document_revisions",
        "pi_documents",
        "pi_tasks",
        "pi_submissions",
        "pi_entries",
        "pi_conversations",
        "pi_record_ids",
      ])
        if (tables.has(table)) this.sql.exec(`DELETE FROM ${table}`);
      this.sql.exec(
        "DELETE FROM maintenance WHERE command = 'clear_conversation'",
      );
    });
  }
}
