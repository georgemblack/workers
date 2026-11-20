import { z } from "zod";
import {
  limits,
  type EntryRecord,
  type ImportFile,
  type NodeRecord,
} from "./shared/contracts";
import type { NodeType, TypeRegistry } from "./modules/types";

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
  text: z.string().trim().min(1).max(limits.capture),
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
type NodeRow = {
  id: string;
  type: string;
  title: string;
  body: string;
  status: string;
  props: string;
  version: number;
  created_at: string;
  updated_at: string;
  source_id: string;
};
type EntryRow = {
  id: string;
  text: string;
  occurred_on: string | null;
  version: number;
  created_at: string;
  updated_at: string;
  source_id: string;
  deleted: number;
};
type NodePatch = {
  title?: string;
  body?: string;
  status?: string;
  props?: Record<string, unknown>;
};

// Applied in order, each once. Later plans append; never edit a shipped entry.
const migrations = [
  `CREATE TABLE captures (id TEXT PRIMARY KEY, text TEXT NOT NULL, source TEXT NOT NULL,
     refs TEXT NOT NULL DEFAULT '[]', created_at TEXT NOT NULL, hidden INTEGER NOT NULL DEFAULT 0);
   CREATE TABLE deliveries (id TEXT PRIMARY KEY, state TEXT NOT NULL DEFAULT 'pending', result TEXT);
   CREATE TABLE health (component TEXT PRIMARY KEY, last_success TEXT, last_error TEXT, last_error_at TEXT);`,
  `CREATE TABLE nodes (id TEXT PRIMARY KEY, type TEXT NOT NULL, title TEXT NOT NULL,
     body TEXT NOT NULL DEFAULT '', status TEXT NOT NULL, props TEXT NOT NULL, version INTEGER NOT NULL,
     created_at TEXT NOT NULL, updated_at TEXT NOT NULL, source_id TEXT NOT NULL);
   CREATE INDEX nodes_type ON nodes(type, status);
   CREATE TABLE links (from_id TEXT NOT NULL, rel TEXT NOT NULL, to_id TEXT NOT NULL,
     PRIMARY KEY (from_id, rel, to_id));
   CREATE INDEX links_to ON links(to_id, rel);
   CREATE TABLE entries (id TEXT PRIMARY KEY, text TEXT NOT NULL, occurred_on TEXT,
     version INTEGER NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
     source_id TEXT NOT NULL, deleted INTEGER NOT NULL DEFAULT 0);
   CREATE TABLE entry_nodes (entry_id TEXT NOT NULL, node_id TEXT NOT NULL,
     PRIMARY KEY (entry_id, node_id));
   CREATE INDEX entry_nodes_node ON entry_nodes(node_id);
   CREATE TABLE changes (id TEXT PRIMARY KEY, target TEXT NOT NULL, target_id TEXT NOT NULL,
     before_data TEXT, after_data TEXT NOT NULL, source_id TEXT NOT NULL, created_at TEXT NOT NULL);
   CREATE INDEX changes_target ON changes(target_id, created_at);
   CREATE VIRTUAL TABLE search USING fts5(id UNINDEXED, kind UNINDEXED, text);
   INSERT INTO search (id, kind, text) SELECT id, 'message', text FROM captures WHERE hidden = 0;`,
  // The profile always exists. Records the store creates itself cite the hidden "system" capture.
  `INSERT OR IGNORE INTO captures (id,text,source,created_at,hidden)
     VALUES ('system','Created by brain2','import',strftime('%Y-%m-%dT%H:%M:%fZ','now'),1);
   INSERT OR IGNORE INTO nodes (id,type,title,body,status,props,version,created_at,updated_at,source_id)
     VALUES ('profile','profile','About me','','active','{}',1,
       strftime('%Y-%m-%dT%H:%M:%fZ','now'),strftime('%Y-%m-%dT%H:%M:%fZ','now'),'system');
   INSERT INTO search (id,kind,text) VALUES ('profile','node','About me');`,
];

const date = z.iso.date();
const title = z.string().trim().min(1).max(limits.title);
const body = z.string().max(limits.body);
const entryText = z.string().trim().min(1).max(limits.entry);

/** Random "<prefix>_<10 base36 chars>" ID. */
export function newId(prefix: string) {
  const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
  const bytes = crypto.getRandomValues(new Uint8Array(10));
  return prefix + "_" + [...bytes].map((b) => alphabet[b % 36]).join("");
}

/**
 * Adds the joined form of words split by punctuation ("Wi-Fi" also becomes
 * "WiFi"), so a search for "wifi" finds them. Search splits on punctuation.
 */
export function searchable(text: string) {
  const joined = (
    text.match(/[\p{L}\p{N}]+(?:[^\s\p{L}\p{N}][\p{L}\p{N}]+)+/gu) ?? []
  ).map((word) => word.replace(/[^\p{L}\p{N}]/gu, ""));
  return [text, ...new Set(joined)].join("\n");
}

// Bump when the way search text is built changes; existing rows get rebuilt.
const searchVersion = "2";

/** Turns free text into a safe FTS5 query: any of the words, each quoted. */
export function ftsQuery(query: string) {
  return (query.match(/[\p{L}\p{N}]+/gu) ?? [])
    .slice(0, 20)
    .map((word) => `"${word}"`)
    .join(" OR ");
}

export class Store {
  constructor(
    readonly sql: SQL,
    readonly transaction: <T>(fn: () => T) => T,
    readonly registry: TypeRegistry,
  ) {
    this.migrate();
    this.rebuildSearch();
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
  /** Rebuilds every search row once after the way search text is built changes. */
  private rebuildSearch() {
    if (this.meta("search") === searchVersion) return;
    this.transaction(() => {
      this.sql.exec("DELETE FROM search");
      for (const row of this.sql
        .exec<{
          id: string;
          text: string;
        }>("SELECT id,text FROM captures WHERE hidden = 0")
        .toArray())
        this.index(row.id, "message", row.text);
      for (const row of this.sql.exec<NodeRow>("SELECT * FROM nodes").toArray())
        this.indexNode(this.toNode(row));
      for (const row of this.sql
        .exec<{ id: string }>("SELECT id FROM entries WHERE deleted = 0")
        .toArray())
        this.indexEntry(row.id);
      this.setMeta("search", searchVersion);
    });
  }
  private index(id: string, kind: "message" | "node" | "entry", text: string) {
    this.sql.exec(
      "INSERT INTO search (id,kind,text) VALUES (?,?,?)",
      id,
      kind,
      searchable(text),
    );
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

  // ---- Captures and deliveries ----

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
          // Keep only refs to records that exist, at most five.
          JSON.stringify(
            [...new Set(input.refs)]
              .filter((ref) => this.getNode(ref))
              .slice(0, 5),
          ),
          new Date().toISOString(),
        );
        this.sql.exec("INSERT INTO deliveries (id) VALUES (?)", id);
        this.index(id, "message", input.text);
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

  // ---- Nodes ----

  getNode(id: string): NodeRecord | null {
    const row = this.sql
      .exec<NodeRow>("SELECT * FROM nodes WHERE id=?", id)
      .toArray()[0];
    return row ? this.toNode(row) : null;
  }
  private toNode(row: NodeRow): NodeRecord {
    const links: Record<string, string[]> = {};
    for (const rel of Object.keys(this.registry.type(row.type)?.links ?? {}))
      links[rel] = [];
    for (const link of this.sql
      .exec<{
        rel: string;
        to_id: string;
      }>("SELECT rel,to_id FROM links WHERE from_id=? ORDER BY rowid", row.id)
      .toArray())
      (links[link.rel] ??= []).push(link.to_id);
    return {
      id: row.id,
      type: row.type,
      title: row.title,
      body: row.body,
      status: row.status,
      props: JSON.parse(row.props),
      links,
      version: row.version,
      created_at: row.created_at,
      updated_at: row.updated_at,
      source_id: row.source_id,
    };
  }
  /** Nodes of one type, newest change first. */
  listNodes(q: {
    type: string;
    status?: string[];
    linkedTo?: string;
  }): NodeRecord[] {
    let query = "SELECT DISTINCT n.* FROM nodes n";
    const bindings: (string | number)[] = [];
    if (q.linkedTo) {
      query += " JOIN links l ON l.from_id=n.id AND l.to_id=?";
      bindings.push(q.linkedTo);
    }
    query += " WHERE n.type=?";
    bindings.push(q.type);
    if (q.status?.length) {
      query += ` AND n.status IN (${q.status.map(() => "?").join(",")})`;
      bindings.push(...q.status);
    }
    query += " ORDER BY n.updated_at DESC, n.rowid DESC";
    return this.sql
      .exec<NodeRow>(query, ...bindings)
      .toArray()
      .map((row) => this.toNode(row));
  }
  /** Nodes that link to this one, optionally through a single relation. */
  backlinks(id: string, rel?: string) {
    return this.sql
      .exec<{ rel: string; from_id: string }>(
        `SELECT rel,from_id FROM links WHERE to_id=? ${rel ? "AND rel=?" : ""} ORDER BY rowid`,
        ...(rel ? [id, rel] : [id]),
      )
      .toArray()
      .map((link) => ({ rel: link.rel, node: this.getNode(link.from_id)! }));
  }

  saveNode(a: {
    intent: "create" | "update";
    id?: string;
    type: string;
    patch: NodePatch;
    links?: Record<string, string[]>;
    expectedVersion: number;
    sourceId: string | undefined;
    mutationId: string;
  }): NodeRecord {
    return this.transaction(() => {
      const replay = this.replay<NodeRecord>(a.mutationId, "node", a.id);
      if (replay) return replay;
      this.requireSource(a.sourceId);
      let previous: NodeRecord | null = null;
      if (a.intent === "create") {
        if (a.expectedVersion !== 0)
          throw new Error("New records must use version 0");
      } else {
        previous = a.id ? this.getNode(a.id) : null;
        if (!previous) throw new Error(`No ${a.type} with ID ${a.id}`);
        if (previous.type !== a.type)
          throw new Error(`${a.id} is a ${previous.type}, not a ${a.type}`);
        if (previous.version !== a.expectedVersion)
          throw new Error("Version conflict: reload before editing");
      }
      const type = this.requireType(a.type);
      const node = this.buildNode(
        type,
        previous ?? {
          id: newId(a.type),
          type: a.type,
          title: "",
          body: "",
          status: type.statuses[0],
          props: {},
          links: {},
        },
        a.patch,
      );
      if (a.links) this.checkLinks(type, node.id, a.links);
      for (const [rel, targets] of Object.entries(a.links ?? {}))
        node.links[rel] = [...new Set(targets)];
      const now = new Date().toISOString();
      const record: NodeRecord = {
        ...node,
        version: (previous?.version ?? 0) + 1,
        created_at: previous?.created_at ?? now,
        updated_at: now,
        source_id: a.sourceId,
      };
      type.validate?.(record, this);
      this.writeNode(record, a.links ?? {});
      if (previous && previous.title !== record.title)
        this.reindexEntriesOf(record.id);
      this.recordChange(
        a.mutationId,
        "node",
        record.id,
        previous,
        record,
        a.sourceId,
      );
      this.bumpRev();
      return record;
    });
  }
  /** Applies a patch to a node and validates the fields that don't involve links. */
  private buildNode(
    type: NodeType,
    base: Pick<
      NodeRecord,
      "id" | "type" | "title" | "body" | "status" | "props" | "links"
    >,
    patch: NodePatch,
  ) {
    for (const key of Object.keys(patch.props ?? {}))
      if (!(key in type.props.shape))
        throw new Error(`Unknown field for ${base.type}: ${key}`);
    const status = patch.status ?? base.status;
    if (!type.statuses.includes(status))
      throw new Error(
        `Status for ${base.type} must be one of: ${type.statuses.join(", ")}`,
      );
    return {
      id: base.id,
      type: base.type,
      title: parse(title, patch.title ?? base.title, "title"),
      body: parse(body, patch.body ?? base.body, "body"),
      status,
      props: parse(
        type.props,
        { ...base.props, ...patch.props },
        "fields",
      ) as Record<string, unknown>,
      // Every relation the type allows is present, as [] when unused.
      links: {
        ...Object.fromEntries(Object.keys(type.links).map((rel) => [rel, []])),
        ...structuredClone(base.links),
      } as Record<string, string[]>,
    };
  }
  private checkLinks(
    type: NodeType,
    fromId: string,
    links: Record<string, string[]>,
  ) {
    for (const [rel, targets] of Object.entries(links)) {
      const rule = type.links[rel];
      if (!rule) throw new Error(`Unknown link "${rel}"`);
      const unique = [...new Set(targets)];
      if (!rule.many && unique.length > 1)
        throw new Error(`Link "${rel}" takes at most one target`);
      for (const target of unique) {
        if (target === fromId)
          throw new Error(`A record cannot link to itself (${rel})`);
        const node = this.getNode(target);
        if (!node)
          throw new Error(`Link "${rel}": no record with ID ${target}`);
        if (!rule.to.includes(node.type))
          throw new Error(
            `Link "${rel}" must point to ${rule.to.join(" or ")}, not ${node.type}`,
          );
      }
    }
  }
  /** Writes the node row, replaces the named link relations, and updates search. */
  private writeNode(record: NodeRecord, links: Record<string, string[]>) {
    this.sql.exec(
      "INSERT OR REPLACE INTO nodes (id,type,title,body,status,props,version,created_at,updated_at,source_id) VALUES (?,?,?,?,?,?,?,?,?,?)",
      record.id,
      record.type,
      record.title,
      record.body,
      record.status,
      JSON.stringify(record.props),
      record.version,
      record.created_at,
      record.updated_at,
      record.source_id,
    );
    for (const rel of Object.keys(links)) {
      this.sql.exec(
        "DELETE FROM links WHERE from_id=? AND rel=?",
        record.id,
        rel,
      );
      for (const target of record.links[rel])
        this.sql.exec(
          "INSERT INTO links (from_id,rel,to_id) VALUES (?,?,?)",
          record.id,
          rel,
          target,
        );
    }
    this.indexNode(record);
  }
  private indexNode(record: NodeRecord) {
    const extra = this.registry.type(record.type)?.searchText?.(record) ?? "";
    this.sql.exec("DELETE FROM search WHERE id=? AND kind='node'", record.id);
    this.index(
      record.id,
      "node",
      [record.title, record.body, extra].filter(Boolean).join("\n"),
    );
  }

  // ---- Entries ----

  getEntry(id: string): EntryRecord | null {
    const row = this.sql
      .exec<EntryRow>("SELECT * FROM entries WHERE id=? AND deleted=0", id)
      .toArray()[0];
    return row ? this.toEntry(row) : null;
  }
  private toEntry(row: EntryRow): EntryRecord {
    return {
      id: row.id,
      text: row.text,
      occurred_on: row.occurred_on,
      node_ids: this.sql
        .exec<{
          node_id: string;
        }>(
          "SELECT node_id FROM entry_nodes WHERE entry_id=? ORDER BY rowid",
          row.id,
        )
        .toArray()
        .map((r) => r.node_id),
      version: row.version,
      created_at: row.created_at,
      updated_at: row.updated_at,
      source_id: row.source_id,
    };
  }

  saveEntry(a: {
    intent: "create" | "update";
    id?: string;
    text?: string;
    occurredOn?: string | null;
    nodeIds?: string[];
    delete?: boolean;
    expectedVersion: number;
    sourceId: string | undefined;
    mutationId: string;
  }): EntryRecord | { deleted: true } {
    return this.transaction(() => {
      const replay = this.replay<EntryRecord & { deleted?: true }>(
        a.mutationId,
        "entry",
        a.id,
      );
      if (replay) return replay.deleted ? { deleted: true } : replay;
      this.requireSource(a.sourceId);
      let previous: EntryRecord | null = null;
      if (a.intent === "create") {
        if (a.expectedVersion !== 0)
          throw new Error("New entries must use version 0");
        if (a.delete) throw new Error("Cannot delete an entry being created");
      } else {
        previous = a.id ? this.getEntry(a.id) : null;
        if (!previous) throw new Error(`No entry with ID ${a.id}`);
        if (previous.version !== a.expectedVersion)
          throw new Error("Version conflict: reload before editing");
      }
      const now = new Date().toISOString();
      const record: EntryRecord = {
        id: previous?.id ?? newId("entry"),
        text: parse(entryText, a.text ?? previous?.text, "text"),
        occurred_on: parse(
          date.nullable(),
          a.occurredOn === undefined
            ? (previous?.occurred_on ?? null)
            : a.occurredOn,
          "occurred_on",
        ),
        node_ids: [...new Set(a.nodeIds ?? previous?.node_ids ?? [])],
        version: (previous?.version ?? 0) + 1,
        created_at: previous?.created_at ?? now,
        updated_at: now,
        source_id: a.sourceId,
      };
      this.checkEntryNodes(record.node_ids);
      this.writeEntry(record, !!a.delete);
      this.recordChange(
        a.mutationId,
        "entry",
        record.id,
        previous,
        a.delete ? { ...record, deleted: true } : record,
        a.sourceId,
      );
      this.bumpRev();
      return a.delete ? { deleted: true } : record;
    });
  }
  private checkEntryNodes(nodeIds: string[]) {
    if (!nodeIds.length) throw new Error("An entry needs at least one node ID");
    for (const id of nodeIds)
      if (!this.getNode(id)) throw new Error(`No record with ID ${id}`);
  }
  private writeEntry(record: EntryRecord, deleted: boolean) {
    this.sql.exec(
      "INSERT OR REPLACE INTO entries (id,text,occurred_on,version,created_at,updated_at,source_id,deleted) VALUES (?,?,?,?,?,?,?,?)",
      record.id,
      record.text,
      record.occurred_on,
      record.version,
      record.created_at,
      record.updated_at,
      record.source_id,
      deleted ? 1 : 0,
    );
    this.sql.exec("DELETE FROM entry_nodes WHERE entry_id=?", record.id);
    for (const id of record.node_ids)
      this.sql.exec(
        "INSERT INTO entry_nodes (entry_id,node_id) VALUES (?,?)",
        record.id,
        id,
      );
    this.indexEntry(record.id);
  }
  /** Entry search text is the entry plus the titles of the nodes it is about. */
  private indexEntry(id: string) {
    this.sql.exec("DELETE FROM search WHERE id=? AND kind='entry'", id);
    const entry = this.getEntry(id);
    if (!entry) return;
    const titles = entry.node_ids.map((nodeId) => this.getNode(nodeId)?.title);
    this.index(id, "entry", [entry.text, ...titles].filter(Boolean).join("\n"));
  }
  private reindexEntriesOf(nodeId: string) {
    for (const row of this.sql
      .exec<{
        entry_id: string;
      }>("SELECT entry_id FROM entry_nodes WHERE node_id=?", nodeId)
      .toArray())
      this.indexEntry(row.entry_id);
  }

  /**
   * Live entries attached to any of the given nodes. Facts (undated) come
   * oldest first; the timeline (dated) comes newest first.
   */
  entriesFor(nodeIds: string[], opts: { limit?: number } = {}) {
    if (!nodeIds.length) return { facts: [], timeline: [] };
    const rows = this.sql
      .exec<EntryRow>(
        `SELECT DISTINCT e.* FROM entries e JOIN entry_nodes en ON en.entry_id=e.id
         WHERE e.deleted=0 AND en.node_id IN (${nodeIds.map(() => "?").join(",")})
         ORDER BY e.created_at, e.rowid`,
        ...nodeIds,
      )
      .toArray();
    const facts = rows
      .filter((row) => row.occurred_on === null)
      .map((row) => this.toEntry(row));
    const timeline = rows
      .filter((row) => row.occurred_on !== null)
      .reverse()
      .sort((x, y) => y.occurred_on!.localeCompare(x.occurred_on!))
      .slice(0, opts.limit ?? 100)
      .map((row) => this.toEntry(row));
    return { facts, timeline };
  }

  // ---- Merge ----

  /** Folds one node into another of the same type, keeping its links and entries. */
  mergeNodes(a: {
    keepId: string;
    removeId: string;
    sourceId: string | undefined;
    mutationId: string;
  }): NodeRecord {
    return this.transaction(() => {
      const replay = this.replay<NodeRecord>(a.mutationId, "node", a.keepId);
      if (replay) return replay;
      this.requireSource(a.sourceId);
      if (a.keepId === a.removeId)
        throw new Error("Cannot merge a record into itself");
      const keep = this.getNode(a.keepId);
      const remove = this.getNode(a.removeId);
      if (!keep) throw new Error(`No record with ID ${a.keepId}`);
      if (!remove) throw new Error(`No record with ID ${a.removeId}`);
      if (keep.type !== remove.type)
        throw new Error(
          `Cannot merge a ${remove.type} into a ${keep.type}; types must match`,
        );
      const type = this.requireType(keep.type);

      // Outgoing links: copy to the kept node, unless that would make it link
      // to itself or give a single-target relation a second target.
      for (const [rel, targets] of Object.entries(remove.links)) {
        if (type.links[rel] && !type.links[rel].many && keep.links[rel]?.length)
          continue;
        for (const target of targets)
          if (target !== keep.id)
            this.sql.exec(
              "INSERT OR IGNORE INTO links (from_id,rel,to_id) VALUES (?,?,?)",
              keep.id,
              rel,
              target,
            );
      }
      // Incoming links: point them at the kept node instead.
      this.sql.exec(
        "INSERT OR IGNORE INTO links (from_id,rel,to_id) SELECT from_id,rel,? FROM links WHERE to_id=? AND from_id!=?",
        keep.id,
        remove.id,
        keep.id,
      );
      this.sql.exec(
        "DELETE FROM links WHERE from_id=? OR to_id=?",
        remove.id,
        remove.id,
      );
      const entryIds = this.sql
        .exec<{
          entry_id: string;
        }>("SELECT entry_id FROM entry_nodes WHERE node_id=?", remove.id)
        .toArray()
        .map((row) => row.entry_id);
      this.sql.exec(
        "INSERT OR IGNORE INTO entry_nodes (entry_id,node_id) SELECT entry_id,? FROM entry_nodes WHERE node_id=?",
        keep.id,
        remove.id,
      );
      this.sql.exec("DELETE FROM entry_nodes WHERE node_id=?", remove.id);
      this.sql.exec("DELETE FROM nodes WHERE id=?", remove.id);
      this.sql.exec("DELETE FROM search WHERE id=? AND kind='node'", remove.id);

      let props = keep.props;
      if ("aliases" in type.props.shape) {
        const names = [
          ...((keep.props.aliases as string[] | undefined) ?? []),
          remove.title,
          ...((remove.props.aliases as string[] | undefined) ?? []),
        ];
        props = parse(
          type.props,
          {
            ...keep.props,
            aliases: [...new Set(names)].filter((name) => name !== keep.title),
          },
          "fields",
        ) as Record<string, unknown>;
      }
      const record: NodeRecord = {
        ...this.getNode(keep.id)!,
        props,
        version: keep.version + 1,
        updated_at: new Date().toISOString(),
        source_id: a.sourceId,
      };
      this.writeNode(record, {});
      for (const id of entryIds) this.indexEntry(id);
      this.recordChange(
        a.mutationId,
        "node",
        keep.id,
        keep,
        record,
        a.sourceId,
      );
      this.recordChange(
        a.mutationId + ":removed",
        "node",
        remove.id,
        remove,
        { merged_into: keep.id },
        a.sourceId,
      );
      this.bumpRev();
      return record;
    });
  }

  // ---- Search and history ----

  /** Keyword search across nodes, entries and messages; up to 20 of each. */
  search(query: string, opts: { types?: string[] } = {}) {
    const result = {
      nodes: [] as NodeRecord[],
      entries: [] as EntryRecord[],
      messages: [] as { id: string; text: string; created_at: string }[],
    };
    const match = ftsQuery(query);
    if (!match) return result;
    const rows = this.sql
      .exec<{ id: string; kind: string }>(
        "SELECT id,kind FROM search WHERE search MATCH ? ORDER BY rank LIMIT 300",
        match,
      )
      .toArray();
    for (const row of rows) {
      if (row.kind === "node" && result.nodes.length < 20) {
        const node = this.getNode(row.id);
        if (node && (!opts.types || opts.types.includes(node.type)))
          result.nodes.push(node);
      } else if (row.kind === "entry" && result.entries.length < 20) {
        const entry = this.getEntry(row.id);
        if (entry) result.entries.push(entry);
      } else if (row.kind === "message" && result.messages.length < 20) {
        const capture = this.getCapture(row.id);
        if (capture && !capture.hidden)
          result.messages.push({
            id: capture.id,
            text: capture.text,
            created_at: capture.created_at,
          });
      }
    }
    return result;
  }

  /** The newest changes to one node or entry. */
  changesFor(targetId: string, limit: number) {
    return this.sql
      .exec<{
        created_at: string;
        source_id: string;
        before_data: string | null;
        after_data: string;
      }>(
        "SELECT created_at,source_id,before_data,after_data FROM changes WHERE target_id=? ORDER BY created_at DESC, rowid DESC LIMIT ?",
        targetId,
        limit,
      )
      .toArray()
      .map((row) => ({
        created_at: row.created_at,
        source_id: row.source_id,
        before: row.before_data ? JSON.parse(row.before_data) : null,
        after: JSON.parse(row.after_data),
      }));
  }

  // ---- Import (plan 07) ----

  /** Loads an export from brain in one transaction; any invalid record aborts all of it. */
  importAll(file: ImportFile, sourceId: string) {
    return this.transaction(() => {
      if (file.format !== "brain2-import" || file.version !== 1)
        throw new Error("Not a brain2 import file (version 1)");
      this.requireSource(sourceId);
      const now = new Date().toISOString();
      const records: {
        record: NodeRecord;
        previous: NodeRecord | null;
        links: Record<string, string[]>;
      }[] = [];
      for (const input of file.nodes) {
        const previous = this.getNode(input.id);
        // The profile always exists, so an import updates it rather than adding one.
        if (
          previous &&
          !(input.type === "profile" && previous.type === "profile")
        )
          throw new Error(`Record ${input.id} already exists`);
        const type = this.requireType(input.type);
        const node = this.buildNode(
          type,
          {
            id: input.id,
            type: input.type,
            title: "",
            body: "",
            status: type.statuses[0],
            props: previous?.props ?? {},
            links: previous?.links ?? {},
          },
          {
            title: input.title,
            body: input.body,
            status: input.status,
            props: input.props,
          },
        );
        const links = input.links ?? {};
        for (const [rel, targets] of Object.entries(links))
          node.links[rel] = [...new Set(targets)];
        const record: NodeRecord = {
          ...node,
          version: (previous?.version ?? 0) + 1,
          created_at: previous?.created_at ?? input.created_at ?? now,
          updated_at: input.updated_at ?? now,
          source_id: sourceId,
        };
        // Insert first without links, so links between imported nodes resolve.
        this.writeNode({ ...record, links: {} }, {});
        records.push({ record, previous, links });
      }
      for (const { record, previous, links } of records) {
        const type = this.requireType(record.type);
        this.checkLinks(type, record.id, links);
        type.validate?.(record, this);
        this.writeNode(record, links);
        this.recordChange(
          "import:" + record.id,
          "node",
          record.id,
          previous,
          record,
          sourceId,
        );
      }
      for (const input of file.entries) {
        const record: EntryRecord = {
          id: newId("entry"),
          text: parse(entryText, input.text, "entry text"),
          occurred_on: parse(date.nullable(), input.occurred_on, "occurred_on"),
          node_ids: [...new Set(input.node_ids)],
          version: 1,
          created_at: now,
          updated_at: now,
          source_id: sourceId,
        };
        this.checkEntryNodes(record.node_ids);
        this.writeEntry(record, false);
        this.recordChange(
          "import:" + record.id,
          "entry",
          record.id,
          null,
          record,
          sourceId,
        );
      }
      this.bumpRev();
      return { nodes: file.nodes.length, entries: file.entries.length };
    });
  }

  // ---- Shared helpers ----

  /**
   * Returns the committed result when this mutation already ran (a replayed
   * tool call), so the same change is never applied twice.
   */
  private replay<T>(mutationId: string, target: string, targetId?: string) {
    const row = this.sql
      .exec<{
        target: string;
        target_id: string;
        after_data: string;
      }>(
        "SELECT target,target_id,after_data FROM changes WHERE id=?",
        mutationId,
      )
      .toArray()[0];
    if (!row) return null;
    if (row.target !== target || (targetId && row.target_id !== targetId))
      throw new Error("Mutation ID already belongs to another change");
    return JSON.parse(row.after_data) as T;
  }
  private requireSource(
    sourceId: string | undefined,
  ): asserts sourceId is string {
    if (!sourceId) throw new Error("No message is being processed");
    if (!this.getCapture(sourceId)) throw new Error("Unknown source message");
  }
  private requireType(name: string) {
    const type = this.registry.type(name);
    if (!type) throw new Error(`Unknown record type: ${name}`);
    return type;
  }
  private recordChange(
    id: string,
    target: "node" | "entry",
    targetId: string,
    before: unknown,
    after: unknown,
    sourceId: string,
  ) {
    this.sql.exec(
      "INSERT INTO changes (id,target,target_id,before_data,after_data,source_id,created_at) VALUES (?,?,?,?,?,?,?)",
      id,
      target,
      targetId,
      before ? JSON.stringify(before) : null,
      JSON.stringify(after),
      sourceId,
      new Date().toISOString(),
    );
  }
}

/** Parses a value, turning zod errors into one short, model-readable message. */
function parse<T>(schema: z.ZodType<T>, value: unknown, field: string): T {
  const result = schema.safeParse(value);
  if (result.success) return result.data;
  const issue = result.error.issues[0];
  const path = issue.path.length ? `${field}.${issue.path.join(".")}` : field;
  throw new Error(`Invalid ${path}: ${issue.message}`);
}
