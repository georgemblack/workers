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

export const captureInput = z.object({
  id: z
    .string()
    .regex(/^[a-zA-Z0-9_-]{1,100}$/)
    .optional(),
  text: z.string().trim().min(1).max(16000),
  source: z.enum(["chat", "apple-shortcuts", "api"]).default("apple-shortcuts"),
  refs: z.array(z.string().max(100)).max(5).default([]),
});
export type CaptureInput = z.infer<typeof captureInput>;

export type CaptureRow = {
  id: string;
  text: string;
  source: string;
  refs: string;
  created_at: string;
  hidden: number;
};

// Applied in order, each once. Later plans append; never edit a shipped entry.
const migrations = [
  `CREATE TABLE captures (id TEXT PRIMARY KEY, text TEXT NOT NULL, source TEXT NOT NULL,
     refs TEXT NOT NULL DEFAULT '[]', created_at TEXT NOT NULL, hidden INTEGER NOT NULL DEFAULT 0);
   CREATE TABLE deliveries (id TEXT PRIMARY KEY, state TEXT NOT NULL DEFAULT 'pending', result TEXT);
   CREATE TABLE health (component TEXT PRIMARY KEY, last_success TEXT, last_error TEXT, last_error_at TEXT);`,
];

export class Store {
  constructor(
    readonly sql: SQL,
    readonly transaction: <T>(fn: () => T) => T,
  ) {
    this.migrate();
    // Any capture without a delivery row (for example, one stored just before
    // the object was evicted) gets one, so background work picks it up.
    sql.exec(
      "INSERT OR IGNORE INTO deliveries (id) SELECT id FROM captures WHERE source != 'import'",
    );
  }

  private migrate() {
    this.transaction(() => {
      this.sql.exec(
        "CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT NOT NULL)",
      );
      const applied = Number(this.meta("schema") ?? 0);
      for (let i = applied; i < migrations.length; i++)
        this.sql.exec(migrations[i]);
      if (applied < migrations.length)
        this.setMeta("schema", String(migrations.length));
    });
  }
  private meta(key: string) {
    return this.sql
      .exec<{ value: string }>("SELECT value FROM meta WHERE key=?", key)
      .toArray()[0]?.value;
  }
  private setMeta(key: string, value: string) {
    this.sql.exec(
      "INSERT INTO meta (key,value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value",
      key,
      value,
    );
  }

  /** A counter that changes whenever anything the browser shows changes. */
  rev() {
    return Number(this.meta("rev") ?? 0);
  }
  bumpRev() {
    this.setMeta("rev", String(this.rev() + 1));
  }

  capture(id: string, input: Omit<CaptureInput, "id">) {
    return this.transaction(() => {
      const previous = this.getCapture(id);
      if (
        previous &&
        (previous.text !== input.text || previous.source !== input.source)
      )
        throw new Error("Capture ID already used for a different message");
      if (!previous) {
        this.sql.exec(
          "INSERT INTO captures (id,text,source,refs,created_at) VALUES (?,?,?,?,?)",
          id,
          input.text,
          input.source,
          JSON.stringify(input.refs),
          new Date().toISOString(),
        );
        this.sql.exec("INSERT INTO deliveries (id) VALUES (?)", id);
        this.bumpRev();
      }
    });
  }
  getCapture(id: string) {
    return this.sql
      .exec<CaptureRow>("SELECT * FROM captures WHERE id=?", id)
      .toArray()[0];
  }
  accepted(id: string) {
    this.sql.exec(
      "UPDATE deliveries SET state='accepted' WHERE id=? AND state='pending'",
      id,
    );
  }
  result(id: string, result: unknown, done: boolean) {
    this.transaction(() => {
      this.sql.exec(
        "UPDATE deliveries SET state=?,result=? WHERE id=?",
        done ? "done" : "accepted",
        JSON.stringify(result),
        id,
      );
      this.bumpRev();
    });
  }
  /** Deliveries still in flight, excluding ones parked until a manual retry. */
  deliveries() {
    return this.sql
      .exec<{ id: string; state: string }>(
        "SELECT id,state FROM deliveries WHERE state != 'done' AND COALESCE(json_extract(result,'$.status'),'') != 'parked' ORDER BY rowid LIMIT 30",
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
  /** The last 30 visible messages, oldest first, with their delivery results. */
  conversation() {
    return this.sql
      .exec<CaptureRow & { result: string | null }>(
        "SELECT c.*,d.result FROM captures c LEFT JOIN deliveries d ON d.id=c.id WHERE c.hidden = 0 ORDER BY c.created_at DESC,c.rowid DESC LIMIT 30",
      )
      .toArray()
      .reverse()
      .map(({ result, refs, hidden, ...capture }) => ({
        ...capture,
        refs: JSON.parse(refs) as string[],
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
  diagnostics() {
    const count = (where: string) =>
      this.sql
        .exec<{ n: number }>(`SELECT count(*) AS n FROM deliveries ${where}`)
        .toArray()[0].n;
    return {
      rev: this.rev(),
      captures: {
        pending: count("WHERE state != 'done'"),
        failed: count(
          "WHERE json_extract(result,'$.status') IN ('unanswered','parked')",
        ),
      },
      health: this.sql.exec("SELECT * FROM health").toArray(),
    };
  }
}
