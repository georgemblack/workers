# 02 — Store core

**Read first:** `../AGENTS.md`, `00-architecture.md`, `contracts.md` (Records, Modules).
**Depends on:** 01.
**Goal:** extend `src/store.ts` with nodes, links, entries, audit and search. The store knows nothing about tasks or people; it is handed a type registry.

Reference: `../brain/src/store.ts` (`save`, `write`, `search`) and `../brain/tests/store.test.ts` show the transaction, idempotency and version-check patterns to keep.

## Schema (append as migration 2)

```sql
CREATE TABLE nodes (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL,
  props TEXT NOT NULL,           -- JSON
  version INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  source_id TEXT NOT NULL
);
CREATE INDEX nodes_type ON nodes(type, status);

CREATE TABLE links (
  from_id TEXT NOT NULL, rel TEXT NOT NULL, to_id TEXT NOT NULL,
  PRIMARY KEY (from_id, rel, to_id)
);
CREATE INDEX links_to ON links(to_id, rel);

CREATE TABLE entries (
  id TEXT PRIMARY KEY,
  text TEXT NOT NULL,
  occurred_on TEXT,              -- NULL = standing fact
  version INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  source_id TEXT NOT NULL,
  deleted INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE entry_nodes (
  entry_id TEXT NOT NULL, node_id TEXT NOT NULL,
  PRIMARY KEY (entry_id, node_id)
);
CREATE INDEX entry_nodes_node ON entry_nodes(node_id);

CREATE TABLE changes (
  id TEXT PRIMARY KEY,           -- mutation ID
  target TEXT NOT NULL,          -- 'node' | 'entry'
  target_id TEXT NOT NULL,
  before_data TEXT,
  after_data TEXT NOT NULL,
  source_id TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX changes_target ON changes(target_id, created_at);

CREATE VIRTUAL TABLE search USING fts5(id UNINDEXED, kind UNINDEXED, text);
-- kind: 'node' | 'entry' | 'message'
```

Captures are indexed into `search` as `message` when stored (move that into `capture()`).

## Constructor

```ts
new Store(sql, transaction, registry)
// registry: { type(name): NodeType | undefined }   — see contracts.md
```

Tests pass a small fake registry. Plan 03 passes the real one.

## API

```ts
getNode(id): NodeRecord | null
listNodes(q: { type: string; status?: string[]; linkedTo?: string }): NodeRecord[]   // updated_at DESC
backlinks(id: string, rel?: string): { rel: string; node: NodeRecord }[]

saveNode(a: {
  intent: "create" | "update";
  id?: string;                 // update only (or import)
  type: string;
  patch: { title?: string; body?: string; status?: string; props?: Record<string, unknown> };
  links?: Record<string, string[]>;
  expectedVersion: number;     // 0 on create
  sourceId: string;
  mutationId: string;
}): NodeRecord

saveEntry(a: {
  intent: "create" | "update";
  id?: string;
  text?: string; occurredOn?: string | null; nodeIds?: string[]; delete?: boolean;
  expectedVersion: number;
  sourceId: string;
  mutationId: string;
}): EntryRecord | { deleted: true }

entriesFor(nodeIds: string[], opts?: { limit?: number }): { facts: EntryRecord[]; timeline: EntryRecord[] }
mergeNodes(a: { keepId: string; removeId: string; sourceId: string; mutationId: string }): NodeRecord
search(query: string, opts?: { types?: string[] }): { nodes: NodeRecord[]; entries: EntryRecord[]; messages: {...}[] }
changesFor(targetId: string, limit: number)
importAll(file: ImportFile, sourceId: string): { nodes: number; entries: number }   // used by plan 07
```

## `saveNode` rules, in order, inside one transaction

1. If a `changes` row with this `mutationId` exists, return its `after_data` (replay). If it belongs to a different target, throw.
2. `sourceId` must be an existing capture.
3. Create: generate `id` as `<type>_<10 base36 chars>`; `expectedVersion` must be 0. Update: node must exist, `type` must match, `version` must equal `expectedVersion` (else "Version conflict: reload before editing").
4. Look up the type in the registry; unknown type throws.
5. Merge: start from the previous node (or defaults on create); apply `patch`. `props` is a shallow patch: omitted keys kept, `null` kept as `null` if the schema allows it. Parse the merged props with the type's zod schema. `status` must be in `statuses`; default is the first.
6. Links: for each relation in `links`, check the rule exists for this type, every target exists, each target's type is allowed, and `many: false` has at most one target. Replace that relation's rows. Relations not present are untouched.
7. Build the `NodeRecord`, call the type's `validate` hook if any.
8. Write `nodes`, replace `links` rows, insert `changes` (before/after are full `NodeRecord` JSON), replace the `search` row (`title + body + searchText(node)`), bump `meta.rev`.

`saveEntry` follows the same pattern: at least one node ID, all must exist; `text` limit; soft delete sets `deleted = 1` and removes the search row; search text is the entry text plus the titles of its nodes.

`mergeNodes`: both nodes exist and share a type. Re-point incoming and outgoing links and `entry_nodes` rows from the removed node to the kept one (ignoring rows that would duplicate or self-link). If the type's props schema has an `aliases` array, append the removed title and aliases. Delete the removed node and its search row. Record two changes (`<mutationId>` for the kept node, `<mutationId>:removed` with `after_data` `{"merged_into": keepId}`).

`search`: reuse brain's `ftsQuery` (OR of quoted words). Return up to 20 per kind, ranked; skip deleted entries; `types` filters nodes.

`importAll`: one transaction; refuses if any incoming node ID already exists (the one exception is `profile`, which is updated in place); inserts nodes with the IDs given (validated like `saveNode` steps 4–7, links checked after all nodes are inserted), then entries; one change row per record with mutation ID `import:<id>`.

## Tests (`tests/store.test.ts`, node:sqlite, fake registry)

Port brain's cases: replay returns the committed record; conflicting version; unknown source; unknown fields rejected; capture retry and conflict. Add:

- generated ID format; create with `expectedVersion != 0` fails
- link replacement touches only named relations; `many: false` enforced; wrong target type rejected; missing target rejected
- `backlinks` and `listNodes({ linkedTo })`
- entry on two nodes appears under both; undated vs dated split; edit; soft delete hides it from `entriesFor` and `search`
- merge moves links and entries, adds aliases, leaves no self-links
- search finds a node by body text, an entry by a linked node's title, and a capture
- every write bumps `rev`; a failed write does not
- migrations run once on an empty database and are a no-op on the second construction
- `importAll` refuses a file whose node ID already exists, updates `profile` in place, and rolls back entirely on one invalid node

## Done when

`check` and `test` pass, and `src/store.ts` imports nothing from `src/modules/` except types.
