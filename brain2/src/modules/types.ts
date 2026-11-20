import type { z } from "zod";
import type { NodeRecord } from "../shared/contracts";
import type { Store } from "../store";

/** Which node types a relation may point at, and whether it allows several. */
export type LinkRule = { to: string[]; many: boolean };

export interface NodeType {
  props: z.ZodObject; // fields beyond title/body/status; every field optional or defaulted
  statuses: readonly [string, ...string[]]; // first is the default
  closed?: readonly string[]; // statuses left out of active views and prompt indexes
  links: Record<string, LinkRule>;
  describe: string; // one paragraph used in generated tool descriptions
  searchText?(node: NodeRecord): string; // extra text to index beyond title + body
  validate?(node: NodeRecord, store: Store): void; // throws Error with a model-readable message
}

export interface Module {
  id: string; // "core" | "tasks" | "people" | ...
  title: string | null; // dashboard tab label; null = no tab
  types: Record<string, NodeType>;
  instructions: string;
  index(store: Store, today: string): unknown; // compact JSON for the prompt
  view?(store: Store, today: string): unknown; // dashboard view model (required when title is set)
}

/** How the store looks up node types. Plan 03 builds this from the modules. */
export interface TypeRegistry {
  type(name: string): NodeType | undefined;
}
