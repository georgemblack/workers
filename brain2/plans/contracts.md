# Contracts

Exact shapes shared between plans. Plan 03 creates `src/shared/contracts.ts` containing these types verbatim; server and client both import from it. If an implementation needs a contract to change, stop and ask rather than diverging.

All dates are `YYYY-MM-DD` strings in the user's timezone (`TIMEZONE`). All timestamps are ISO 8601 UTC.

## Records

```ts
/** A node as the store returns it and as tools return it to the model. */
type NodeRecord = {
  id: string;                 // "<type>_<10 random base36 chars>", or a legacy brain ID
  type: string;
  title: string;
  body: string;
  status: string;
  props: Record<string, unknown>;      // validated by the type's schema
  links: Record<string, string[]>;     // outgoing only: rel → target IDs (always arrays)
  version: number;            // starts at 1
  created_at: string;
  updated_at: string;
  source_id: string;          // capture that caused the latest change
};

type EntryRecord = {
  id: string;                 // "entry_<10 random base36 chars>"
  text: string;               // max 2,000 chars
  occurred_on: string | null; // null = standing fact
  node_ids: string[];         // at least one
  version: number;
  created_at: string;
  updated_at: string;
  source_id: string;
};

type Capture = {
  id: string;                 // client UUID or server UUID
  text: string;
  source: "chat" | "apple-shortcuts" | "api" | "import";
  refs: string[];             // node IDs the user tapped or was viewing; validated, max 5
  created_at: string;
  hidden: boolean;
};
```

Limits: title 1–300 chars; body ≤ 12,000; entry text 1–2,000; capture text 1–16,000.

## Modules

```ts
type LinkRule = { to: string[]; many: boolean };   // allowed target node types

interface NodeType {
  props: z.ZodObject;                  // fields beyond title/body/status; every field optional or defaulted
  statuses: readonly [string, ...string[]];   // first is the default
  closed?: readonly string[];          // statuses left out of active views and prompt indexes
  links: Record<string, LinkRule>;
  describe: string;                    // one paragraph used in generated tool descriptions
  searchText?(node: NodeRecord): string;        // extra text to index beyond title + body
  validate?(node: NodeRecord, store: Store): void;  // throws Error with a model-readable message
}

interface Module {
  id: string;                          // "core" | "tasks" | "people" | ...
  title: string | null;                // dashboard tab label; null = no tab
  types: Record<string, NodeType>;
  instructions: string;
  index(store: Store, today: string): unknown;       // compact JSON for the prompt
  view?(store: Store, today: string): unknown;       // dashboard view model (required when title is set)
}
```

Type names are globally unique. Registered types and their owners:

| Module | Types |
|---|---|
| core | `note`, `profile` |
| tasks | `task`, `area` |
| people | `person`, `group`, `followup` |

Link relations (source → targets, cardinality):

| Rel | From | To | Many |
|---|---|---|---|
| `parent` | task | task | no |
| `in_area` | task | area | no |
| `about` | task | person, group, note | yes |
| `about` | followup | person, group | yes |
| `member_of` | person | group | yes |
| `member_of` | group | group | yes |
| `spouse_of` | person | person | no |
| `child_of` | person | person | yes |
| `sibling_of` | person | person | yes |

## Tools (names and parameters the model sees)

Shared:

```ts
search({ query: string, types?: string[] })
  → { nodes: NodeRecord[], entries: EntryRecord[], messages: { id, text, created_at }[] }   // max 20 each
get({ id: string })
  → { node: NodeRecord, linked: { rel, id, type, title, status }[], backlinks: { rel, id, type, title, status }[],
      facts: EntryRecord[], timeline: EntryRecord[] /* newest 20 */, changes: { created_at, source_id, before, after }[] /* newest 5 */ }
list({ type: string, status?: string[], linked_to?: string })
  → NodeRecord[]            // default: non-closed statuses
add_entry({ node_ids: string[], text: string, occurred_on?: string | null })
  → EntryRecord
update_entry({ id: string, version: number, text?: string, occurred_on?: string | null, node_ids?: string[], delete?: boolean })
  → EntryRecord | { deleted: true }
merge({ keep_id: string, remove_id: string })
  → NodeRecord              // the kept node
```

Generated for every registered type `T` except `profile` (which only gets `update_profile`):

```ts
create_T({ title: string, body?: string, status?: <enum>, ...props, links?: { [rel]: string[] } })  → NodeRecord
update_T({ id: string, version: number, title?, body?, status?, ...props, links?: { [rel]: string[] } })  → NodeRecord
```

- `links[rel]` replaces that relation's targets; relations not named are untouched; `[]` clears.
- Omitted fields are kept. `null` clears a nullable field.
- Errors are returned as `{ error: string }` tool output, never thrown, so the model can react.
- Read tools are `replay: "safe"`. Write tools are `replay: "safe"` and `executionMode: "sequential"`.

## HTTP API

Every route requires Access (or the localhost dev bypass). Service tokens may only `POST /api/messages`.

```ts
// POST /api/messages          → 202
type MessageRequest = { text: string; id?: string; source?: "chat" | "apple-shortcuts" | "api"; refs?: string[] };
type MessageResponse = { id: string; accepted: boolean };
// 400 invalid body · 409 same id, different text · 413 too large · 415 not JSON

// GET /api/state?rev=<number>  → 204 when unchanged, else 200
type StateResponse = {
  rev: number;
  messages: ChatMessage[];                 // last 30 visible captures, oldest first
  tabs: { id: string; title: string }[];   // modules with a view, in registry order
  views: { tasks: TasksView; people: PeopleView };   // keyed by module id
};
type ChatMessage = {
  id: string; text: string; source: Capture["source"]; created_at: string;
  refs: { id: string; title: string }[];
  status: "queued" | "running" | "done" | "unanswered" | "parked";
  reply_html: string;                      // rendered Markdown; "" until done
  detail?: string;                         // failure reason for "unanswered"
};

// GET /api/nodes/:id           → 200 NodeDetail | 404
type NodeDetail = {
  node: NodeRecord;
  linked: LinkedNode[];                    // outgoing
  backlinks: LinkedNode[];                 // incoming
  facts: EntryRecord[];                    // undated, oldest first
  timeline: EntryRecord[];                 // dated, newest first, max 100; includes entries on the node's households
};
type LinkedNode = { rel: string; id: string; type: string; title: string; status: string };

// POST /api/retry              → { ok: true }
// GET  /api/diagnostics        → { rev, captures: { pending, failed }, health: [...] }
// GET  /app.js, /app.css, /    → client bundle and shell
```

## View models

```ts
type Row = { id: string; title: string; subtitle: string; children: Row[] };

type TasksView = {
  priorities: Row[];                               // children always []
  areas: { id: string; title: string; items: Row[] }[];   // empty areas omitted; "Other" last
};

type PersonRow = { id: string; name: string; aliases: string[]; subtitle: string };   // subtitle = how_i_know
type PeopleView = {
  catch_up: { person: PersonRow; followups: { id: string; title: string; since: string }[] }[];
  birthdays: { id: string; name: string; date: string; in_days: number }[];      // next 30 days
  recent: { id: string; text: string; occurred_on: string; people: { id: string; name: string }[] }[];  // newest 10
  circles: {
    id: string | null; title: string;              // null id = "Everyone else"
    households: { id: string; title: string; people: PersonRow[] }[];
    people: PersonRow[];                           // circle members not in a listed household
  }[];
};
```

## Import format (plan 07)

```ts
type ImportFile = {
  format: "brain2-import";
  version: 1;
  nodes: {
    id: string; type: string; title: string; body: string; status: string;
    props: Record<string, unknown>; links: Record<string, string[]>;
    created_at?: string; updated_at?: string;
  }[];
  entries: { text: string; occurred_on: string | null; node_ids: string[] }[];
};
```

Import validates each node with the same module schemas as normal writes, and checks every link target exists in the file or the database.

## Fixtures

Use only this fictional cast in tests, evaluations and examples:

- Household "Miller": Jane and John (spouses), sons Jude and Jonah. Neighbors. John went to Platteville.
- A second Jane ("Jane Okafor") from work.
- Tasks: "Plan garden beds" (area Home) with children "Buy seeds" and "Build frames"; "Renew passport" (area Personal, due in 5 days); "Fix bike" (someday).
- Areas: Home, Personal, Other.
