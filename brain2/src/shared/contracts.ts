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
