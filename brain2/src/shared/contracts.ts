// Shapes shared by the server and the browser app. Mirrors plans/contracts.md;
// change that file first (and ask George) before changing anything here.

/** A node as the store returns it and as tools return it to the model. */
export type NodeRecord = {
  id: string; // "<type>_<10 random base36 chars>", or a legacy brain ID
  type: string;
  title: string;
  body: string;
  status: string;
  props: Record<string, unknown>; // validated by the type's schema
  links: Record<string, string[]>; // outgoing only: rel → target IDs (always arrays)
  version: number; // starts at 1
  created_at: string;
  updated_at: string;
  source_id: string; // capture that caused the latest change
};

export type EntryRecord = {
  id: string; // "entry_<10 random base36 chars>"
  text: string; // max 2,000 chars
  occurred_on: string | null; // null = standing fact
  node_ids: string[]; // at least one
  version: number;
  created_at: string;
  updated_at: string;
  source_id: string;
};

export type Capture = {
  id: string; // client UUID or server UUID
  text: string;
  source: "chat" | "apple-shortcuts" | "api" | "import";
  refs: string[]; // node IDs the user tapped or was viewing; validated, max 5
  created_at: string;
  hidden: boolean;
};

export const limits = {
  title: 300,
  body: 12_000,
  entry: 2_000,
  capture: 16_000,
} as const;

export type ImportFile = {
  format: "brain2-import";
  version: 1;
  nodes: {
    id: string;
    type: string;
    title: string;
    body: string;
    status: string;
    props: Record<string, unknown>;
    links: Record<string, string[]>;
    created_at?: string;
    updated_at?: string;
  }[];
  entries: { text: string; occurred_on: string | null; node_ids: string[] }[];
};

// ---- HTTP API ----

// POST /api/messages → 202
export type MessageRequest = {
  text: string;
  id?: string;
  source?: "chat" | "apple-shortcuts" | "api";
  refs?: string[];
};
export type MessageResponse = { id: string; accepted: boolean };

// GET /api/state?rev=<number> → 204 when unchanged, else 200
export type StateResponse = {
  rev: number;
  messages: ChatMessage[]; // last 30 visible captures, oldest first
  tabs: { id: string; title: string }[]; // modules with a view, in registry order
  views: { tasks: TasksView; people: PeopleView }; // keyed by module id
};
export type ChatMessage = {
  id: string;
  text: string;
  source: Capture["source"];
  created_at: string;
  refs: { id: string; title: string }[];
  status: "queued" | "running" | "done" | "unanswered" | "parked";
  reply_html: string; // rendered Markdown; "" until done
  detail?: string; // failure reason for "unanswered"
};

// GET /api/nodes/:id → 200 NodeDetail | 404
export type NodeDetail = {
  node: NodeRecord;
  linked: LinkedNode[]; // outgoing
  backlinks: LinkedNode[]; // incoming
  facts: EntryRecord[]; // undated, oldest first
  timeline: EntryRecord[]; // dated, newest first, max 100; includes entries on the node's households
};
export type LinkedNode = {
  rel: string;
  id: string;
  type: string;
  title: string;
  status: string;
};

// ---- View models ----

export type Row = {
  id: string;
  title: string;
  subtitle: string;
  children: Row[];
};

export type TasksView = {
  priorities: Row[]; // children always []
  areas: { id: string; title: string; items: Row[] }[]; // empty areas omitted; "Other" last
};

export type PersonRow = {
  id: string;
  name: string;
  aliases: string[];
  subtitle: string; // how_i_know
};
export type PeopleView = {
  catch_up: {
    person: PersonRow;
    followups: { id: string; title: string; since: string }[];
  }[];
  birthdays: { id: string; name: string; date: string; in_days: number }[]; // next 30 days
  recent: {
    id: string;
    text: string;
    occurred_on: string;
    people: { id: string; name: string }[];
  }[]; // newest 10
  circles: {
    id: string | null; // null id = "Everyone else"
    title: string;
    households: { id: string; title: string; people: PersonRow[] }[];
    people: PersonRow[]; // circle members not in a listed household
  }[];
};
