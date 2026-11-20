import { z } from "zod";
import type { TSchema } from "@earendil-works/pi-ai";
import type { ToolRegistration } from "@earendil-works/pi-durable";
import type { Store } from "./store";
import type { NodeType, TypeRegistry } from "./modules/types";
import type { LinkedNode, NodeRecord } from "./shared/contracts";

export type ToolContext = {
  store: Store;
  registry: TypeRegistry & { names: string[] };
  /** ID of the message whose run made this call, if any. */
  currentSource(): Promise<string | undefined>;
  /** Called after every successful write. */
  afterWrite(): Promise<void>;
};
type Args = Record<string, unknown>;

/** JSON Schema for a tool's parameters, in the form Pi validates against. */
export function toSchema(schema: z.ZodType) {
  const json = z.toJSONSchema(schema, { io: "input" }) as Record<
    string,
    unknown
  >;
  delete json.$schema;
  return json;
}

const output = (value: unknown) => ({
  output: [{ type: "text" as const, text: JSON.stringify(value) }],
});
// Tool errors go back to the model as data so it can correct itself.
const failure = (error: unknown) =>
  output({ error: error instanceof Error ? error.message : "Request failed" });

function tool(
  name: string,
  description: string,
  parameters: z.ZodObject,
  run: (args: Args, mutationId: string) => Promise<unknown> | unknown,
  write: boolean,
): ToolRegistration {
  return {
    name,
    description,
    parameters: toSchema(parameters) as unknown as TSchema,
    replay: "safe",
    ...(write ? { executionMode: "sequential" as const } : {}),
    execute: async (args, api) => {
      try {
        // Stable across reruns of the same call, so a replay is recognized.
        return output(
          await run(args as Args, `${api.conversationId}:${api.callId}`),
        );
      } catch (error) {
        return failure(error);
      }
    },
  };
}

const id = z
  .string()
  .describe("A record ID from an index, search, get or list");
const ids = z.array(z.string()).describe("Record IDs");
const date = z.iso.date().describe("YYYY-MM-DD");

export function linked(
  store: Store,
  rel: string,
  nodeId: string,
): LinkedNode | null {
  const node = store.getNode(nodeId);
  return node
    ? {
        rel,
        id: node.id,
        type: node.type,
        title: node.title,
        status: node.status,
      }
    : null;
}

/** A node with its links in both directions and its entries. */
export function nodeDetail(store: Store, nodeId: string, timelineLimit = 100) {
  const node = store.getNode(nodeId);
  if (!node) return null;
  // Entries on groups the node belongs to (such as a household) show too.
  const groups = node.links.member_of ?? [];
  const { facts, timeline } = store.entriesFor([node.id, ...groups], {
    limit: timelineLimit,
  });
  return {
    node,
    linked: Object.entries(node.links)
      .flatMap(([rel, targets]) => targets.map((t) => linked(store, rel, t)))
      .filter((link): link is LinkedNode => !!link),
    backlinks: store.backlinks(node.id).map(({ rel, node: from }) => ({
      rel,
      id: from.id,
      type: from.type,
      title: from.title,
      status: from.status,
    })),
    facts,
    timeline,
  };
}

/** The tools every module shares: reading, entries and merging. */
function sharedTools(ctx: ToolContext): ToolRegistration[] {
  const { store, registry } = ctx;
  const typeName = z.enum(registry.names as [string, ...string[]]);
  const write = async <T>(fn: (source: string | undefined) => T) => {
    const result = fn(await ctx.currentSource());
    await ctx.afterWrite();
    return result;
  };
  return [
    tool(
      "search",
      "Keyword search across records, timeline entries and past messages. Matches any of the words; try several wordings and likely misspellings. Returns up to 20 of each kind.",
      z.object({
        query: z.string().max(2000),
        types: z
          .array(typeName)
          .optional()
          .describe("Only return records of these types"),
      }),
      (a) => store.search(a.query as string, { types: a.types as string[] }),
      false,
    ),
    tool(
      "get",
      "Read one record in full: its links in both directions, standing facts, the newest 20 timeline entries and its 5 most recent changes.",
      z.object({ id }),
      (a) => {
        const detail = nodeDetail(store, a.id as string, 20);
        if (!detail) throw new Error(`No record with ID ${a.id}`);
        return { ...detail, changes: store.changesFor(a.id as string, 5) };
      },
      false,
    ),
    tool(
      "list",
      "List every record of one type, newest change first. Without status, closed records are left out. Use for exhaustive questions.",
      z.object({
        type: typeName,
        status: z.array(z.string()).optional(),
        linked_to: id.optional().describe("Only records that link to this ID"),
      }),
      (a) => {
        const type = registry.type(a.type as string)!;
        const closed = type.closed ?? [];
        return store.listNodes({
          type: a.type as string,
          status:
            (a.status as string[] | undefined) ??
            type.statuses.filter((status) => !closed.includes(status)),
          linkedTo: a.linked_to as string | undefined,
        });
      },
      false,
    ),
    tool(
      "add_entry",
      "Attach a short piece of text to one or more records. With occurred_on it is a dated timeline event; without it, a standing fact.",
      z.object({
        node_ids: ids.min(1),
        text: z.string().min(1).max(2000),
        occurred_on: date.nullable().optional(),
      }),
      (a, mutationId) =>
        write((sourceId) =>
          store.saveEntry({
            intent: "create",
            nodeIds: a.node_ids as string[],
            text: a.text as string,
            occurredOn: a.occurred_on as string | null | undefined,
            expectedVersion: 0,
            sourceId,
            mutationId,
          }),
        ),
      true,
    ),
    tool(
      "update_entry",
      "Change or delete an entry. Pass the version you last saw. Omitted fields are kept; occurred_on null makes it a standing fact.",
      z.object({
        id,
        version: z.number().int(),
        text: z.string().min(1).max(2000).optional(),
        occurred_on: date.nullable().optional(),
        node_ids: ids.min(1).optional(),
        delete: z.boolean().optional(),
      }),
      (a, mutationId) =>
        write((sourceId) =>
          store.saveEntry({
            intent: "update",
            id: a.id as string,
            text: a.text as string | undefined,
            occurredOn: a.occurred_on as string | null | undefined,
            nodeIds: a.node_ids as string[] | undefined,
            delete: a.delete as boolean | undefined,
            expectedVersion: a.version as number,
            sourceId,
            mutationId,
          }),
        ),
      true,
    ),
    tool(
      "merge",
      "Fold a duplicate record into another of the same type. Links and entries move to the kept record and the removed title becomes an alias where the type has aliases.",
      z.object({ keep_id: id, remove_id: id }),
      (a, mutationId) =>
        write((sourceId) =>
          store.mergeNodes({
            keepId: a.keep_id as string,
            removeId: a.remove_id as string,
            sourceId,
            mutationId,
          }),
        ),
      true,
    ),
  ];
}

/** Tool text explaining each link relation a type allows. */
function linkHelp(type: NodeType) {
  return Object.entries(type.links).map(
    ([rel, rule]) =>
      `links.${rel}: ${rule.many ? "IDs" : "the ID (at most one)"} of ${rule.to.join(" or ")} records. Replaces this relation; [] clears it.`,
  );
}

/** create_<type> and update_<type>, with typed parameters from the type's schema. */
function typeTools(ctx: ToolContext, name: string, type: NodeType) {
  const { store } = ctx;
  const linkShape = Object.fromEntries(
    Object.keys(type.links).map((rel) => [rel, z.array(z.string())]),
  );
  const fields = {
    title: z.string().min(1).max(300),
    body: z.string().max(12000).optional(),
    status: z
      .enum(type.statuses as unknown as [string, ...string[]])
      .optional(),
    ...type.props.shape,
    ...(Object.keys(linkShape).length
      ? { links: z.object(linkShape).partial().optional() }
      : {}),
  };
  const run =
    (intent: "create" | "update") => async (a: Args, mutationId: string) => {
      const { id, version, title, body, status, links, ...props } = a;
      const patch = {
        ...(title !== undefined ? { title: title as string } : {}),
        ...(body !== undefined ? { body: body as string } : {}),
        ...(status !== undefined ? { status: status as string } : {}),
        props,
      };
      const record: NodeRecord = store.saveNode({
        intent,
        id: id as string | undefined,
        type: name,
        patch,
        links: links as Record<string, string[]> | undefined,
        expectedVersion: intent === "create" ? 0 : (version as number),
        sourceId: await ctx.currentSource(),
        mutationId,
      });
      await ctx.afterWrite();
      return record;
    };
  const help = [type.describe, ...linkHelp(type)].join("\n");
  const tools: ToolRegistration[] = [];
  if (name !== "profile")
    tools.push(
      tool(
        `create_${name}`,
        `Create a new ${name}. ${help}`,
        z.object(fields),
        run("create"),
        true,
      ),
    );
  tools.push(
    tool(
      `update_${name}`,
      `Update a ${name}. Pass the version you last saw. Omitted fields are kept; null clears a field that allows it. ${help}`,
      z
        .object({ id, version: z.number().int(), ...fields })
        .partial()
        .required({
          id: true,
          version: true,
        }),
      run("update"),
      true,
    ),
  );
  return tools;
}

/** All tools offered to the model. */
export function toolsFor(ctx: ToolContext): ToolRegistration[] {
  return [
    ...sharedTools(ctx),
    ...ctx.registry.names.flatMap((name) =>
      typeTools(ctx, name, ctx.registry.type(name)!),
    ),
  ];
}
