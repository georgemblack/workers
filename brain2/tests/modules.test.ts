import { DatabaseSync } from "node:sqlite";
import { expect, it } from "vitest";
import { z } from "zod";
import { validateToolArguments } from "@earendil-works/pi-ai";
import { Store, type SQL } from "../src/store";
import { createRegistry, modules, registry } from "../src/modules";
import type { Module } from "../src/modules/types";
import { toolsFor, type ToolContext } from "../src/tools";
import { sections } from "../src/prompt";

function openStore(reg = registry) {
  const db = new DatabaseSync(":memory:");
  const sql: SQL = {
    exec(query, ...bindings) {
      let rows: any[] = [];
      for (const statement of query.split(";").filter((p) => p.trim())) {
        const prepared = db.prepare(statement);
        rows = prepared.columns().length
          ? prepared.all(...bindings).map((row) => ({ ...row }))
          : (prepared.run(...bindings), []);
      }
      return {
        [Symbol.iterator]: () => rows.values(),
        toArray: () => rows,
      } as any;
    },
  };
  return new Store(sql, (fn) => fn(), reg);
}
const context = (
  reg: ToolContext["registry"] = registry,
  store = openStore(reg),
): ToolContext => ({
  store,
  registry: reg,
  currentSource: async () => undefined,
  afterWrite: async () => {},
});
const module = (id: string, types: Module["types"]): Module => ({
  id,
  title: null,
  types,
  instructions: "",
  index: () => null,
});
const plain = {
  props: z.object({}),
  statuses: ["open"] as const,
  links: {},
  describe: "A thing.",
};

it("refuses duplicate type names and links to unknown types", () => {
  expect(() =>
    createRegistry([
      module("a", { thing: plain }),
      module("b", { thing: plain }),
    ]),
  ).toThrow(/defined twice/);
  expect(() =>
    createRegistry([
      module("a", {
        thing: { ...plain, links: { owner: { to: ["ghost"], many: false } } },
      }),
    ]),
  ).toThrow(/unknown type "ghost"/);
});

it("generates the expected tools and schemas", () => {
  const tools = toolsFor(context());
  expect(tools.map((t) => t.name)).toEqual([
    "search",
    "get",
    "list",
    "add_entry",
    "update_entry",
    "merge",
    "create_note",
    "update_note",
    "update_profile",
  ]);
  // Schema changes should show up in review.
  expect(
    Object.fromEntries(tools.map((t) => [t.name, t.parameters])),
  ).toMatchSnapshot();
});

it("lets the model clear nullable fields and has Pi reject wrong types", () => {
  const reg = createRegistry([
    module("x", {
      reminder: {
        ...plain,
        props: z.object({
          due: z.iso.date().nullable().default(null),
          tags: z.array(z.string()).default([]),
        }),
        links: { about: { to: ["reminder"], many: true } },
      },
    }),
  ]);
  const tools = toolsFor(context(reg));
  const update = tools.find((t) => t.name === "update_reminder")!;
  const create = tools.find((t) => t.name === "create_reminder")!;
  const call = (args: object, tool = update) =>
    validateToolArguments(tool, {
      type: "toolCall",
      id: "c1",
      name: tool.name,
      arguments: args,
    } as any);
  expect(call({ id: "r1", version: 1, due: null })).toEqual({
    id: "r1",
    version: 1,
    due: null,
  });
  expect(
    call({ title: "Call the dentist", due: "2026-12-01" }, create),
  ).toMatchObject({
    due: "2026-12-01",
  });
  expect(() => call({ id: "r1", version: 1, tags: { a: 1 } })).toThrow(
    /Validation failed/,
  );
  expect(() => call({ version: 1 })).toThrow(/Validation failed/);
  expect(() =>
    call({ title: "x", links: { about: "r1-not-a-list" } }, create),
  ).toThrow(/Validation failed/);
  expect(() => call({ title: "x", status: "maybe" }, create)).toThrow(
    /Validation failed/,
  );
});

it("keeps the assembled prompt under 40,000 characters with 300 notes", async () => {
  const store = openStore();
  store.capture("m1", { text: "Renew passport", source: "chat", refs: [] });
  for (let i = 0; i < 300; i++)
    store.saveNode({
      intent: "create",
      type: "note",
      patch: {
        title: `Note ${i}: where the spare keys and the garage code are kept`,
        body: "x".repeat(500),
      },
      expectedVersion: 0,
      sourceId: "m1",
      mutationId: `m-${i}`,
    });
  const rendered = await Promise.all(
    sections(store, modules, { TIMEZONE: "America/Chicago" }).map((s) =>
      s.render(),
    ),
  );
  const text = rendered.join("\n");
  expect(text).toContain("Today: ");
  expect(text).toContain("(empty)");
  expect(text.length).toBeLessThan(40_000);
  // The note index is capped at 100 titles.
  expect(text.match(/garage code/g)).toHaveLength(100);
});
