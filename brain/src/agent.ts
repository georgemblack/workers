import { DurableObject } from "cloudflare:workers";
import { Type } from "@earendil-works/pi-ai";
import { createModels } from "@earendil-works/pi-ai/models";
import {
  createRegistry,
  Harness,
  type ToolRegistration,
} from "@earendil-works/pi-durable";
import { PiHarness } from "agents/harness/pi";
import { Lifecycle } from "agents/lifecycle";

import { Store } from "./store";
import { captureInput, itemInput, status } from "./domain";
import { instructions } from "./prompt";
import { createBrainAI } from "./model";

export interface Env {
  BRAIN: DurableObjectNamespace<Brain>;
  AI: Ai;
  MEMORY?: VectorizeIndex;
  MODEL: string;
  AI_GATEWAY: string;
  TIMEZONE: string;
  ACCESS_AUD: string;
  LOCAL_DEV?: string;
}
const output = (value: unknown) => ({
  output: [{ type: "text" as const, text: JSON.stringify(value) }],
});
const Search = Type.Object({ query: Type.String({ maxLength: 2000 }) });
const Get = Type.Object({ id: Type.String() });
const List = Type.Object({ include_closed: Type.Optional(Type.Boolean()) });
const Save = Type.Object({
  id: Type.String({ maxLength: 100 }),
  kind: Type.Union([Type.Literal("item"), Type.Literal("context")]),
  data: Type.String({
    description:
      "Full JSON object. Item: {title,why,details,status:inbox|open|waiting|someday|done|dropped,priority:high|normal|low,priority_reason,parent_id:string|null,timing,due_date:YYYY-MM-DD|null,scheduled_at:ISO|null,timing_source:explicit|inherited|inferred|none,context_ids:string[],needs_clarification}. Context: {title,body,evidence}.",
  }),
  expected_version: Type.Integer({ minimum: 0 }),
  source_id: Type.String(),
  mutation_id: Type.String({ maxLength: 150 }),
});

export class Brain extends DurableObject<Env> {
  store = new Store(this.ctx.storage.sql, (fn) =>
    this.ctx.storage.transactionSync(fn),
  );
  ai = createBrainAI(this.env.AI, this.env.AI_GATEWAY);
  registry = createRegistry();
  harness = new PiHarness({
    harness: ({ storage, context, onWake }) => {
      this.installTools();
      const models = createModels();
      models.setProvider(this.ai.provider);
      return Harness.open(
        storage,
        {
          models,
          registry: this.registry,
          onWake,
          onReport: (error, info) =>
            console.error(
              "brain agent report",
              info.type,
              error instanceof Error ? error.message : "Agent error",
            ),
          settings: {
            retry: { enabled: true, maxRetries: 3, baseDelayMs: 1000 },
            afterFailedRun: "continue",
          },
        },
        context,
      );
    },
    defaults: { model: this.ai(this.env.MODEL), thinkingLevel: "low" },
  });
  lifecycle = Lifecycle.install(this).use(this.harness);

  installTools() {
    const search: ToolRegistration<typeof Search> = {
      name: "search_records",
      description:
        "Search items, context, and original messages by keywords and meaning. Try multiple formulations. Returns current SQL records; use get_record to expand relationships.",
      parameters: Search,
      replay: "safe",
      execute: async ({ query }) => {
        const lexical = this.store.search(query);
        let semantic: unknown[] = [];
        if (this.env.MEMORY) {
          try {
            await this.indexRecords();
            const embedding = await this.embed(query);
            const results = await this.env.MEMORY.query(embedding, {
              topK: 15,
              returnMetadata: "none",
            });
            semantic = results.matches
              .map((match) => this.store.get(match.id))
              .filter(Boolean);
          } catch {
            /* Keyword search remains available if semantic retrieval fails. */
          }
        }
        return output({ lexical, semantic });
      },
    };
    const get: ToolRegistration<typeof Get> = {
      name: "get_record",
      description:
        "Read a record, its parent, linked context, children and recent change evidence.",
      parameters: Get,
      replay: "safe",
      execute: async ({ id }) => {
        const record = this.store.get(id);
        return output({
          record,
          parent: record?.parent_id ? this.store.get(record.parent_id) : null,
          context: (record?.context_ids ?? []).map((key: string) =>
            this.store.get(key),
          ),
          children: this.store.list().filter((item) => item.parent_id === id),
          related: this.store
            .list()
            .filter((item) => item.context_ids.includes(id)),
          changes: this.store.sql
            .exec(
              "SELECT * FROM brain_changes WHERE record_id = ? ORDER BY created_at DESC LIMIT 10",
              id,
            )
            .toArray(),
        });
      },
    };
    const list: ToolRegistration<typeof List> = {
      name: "list_items",
      description:
        "Get all current items for exhaustive questions, planning, or finding everything affected by a change.",
      parameters: List,
      replay: "safe",
      execute: async ({ include_closed }) =>
        output(
          this.store
            .list()
            .filter(
              (item) =>
                include_closed || !["done", "dropped"].includes(item.status),
            ),
        ),
    };
    const save: ToolRegistration<typeof Save> = {
      name: "save_record",
      description:
        "Create or replace a validated item/context record. Full data required. Updates require expected_version from a read. source_id must be the original message ID. Stable mutation_id prevents replay duplicates.",
      parameters: Save,
      executionMode: "sequential",
      replay: "safe",
      execute: async (args) => {
        try {
          const record = this.store.save({
            ...args,
            data: JSON.parse(args.data),
          });
          // SQLite outbox survives interruption or embedding failure.
          try {
            await this.indexRecords();
          } catch {
            /* Retried by subsequent retrieval and dashboard visits. */
          }
          return output(record);
        } catch (error) {
          return output({
            error: error instanceof Error ? error.message : "Invalid mutation",
          });
        }
      },
    };
    this.registry.install({
      name: "brain",
      tools: [search, get, list, save],
      sections: [
        { key: "preamble", render: () => instructions, tag: false },
        {
          key: "clock",
          render: () =>
            `Now: ${new Date().toISOString()}. User timezone: ${this.env.TIMEZONE}.`,
        },
        {
          key: "known_context",
          render: () => JSON.stringify(this.store.list("context")),
        },
      ],
    });
  }
  async embed(text: string) {
    const result = await this.env.AI.run("@cf/baai/bge-base-en-v1.5", {
      text: [text.slice(0, 6000)],
    });
    if (!("data" in result) || !result.data?.[0])
      throw new Error("Embedding unavailable");
    return result.data[0];
  }
  async indexRecords() {
    if (!this.env.MEMORY) return;
    const rows = this.store.sql
      .exec<{ id: string; version: number }>(
        "SELECT * FROM brain_index_outbox LIMIT 5",
      )
      .toArray();
    for (const row of rows) {
      const record = this.store.get(row.id);
      if (!record) continue;
      const values = await this.embed(JSON.stringify(record));
      await this.env.MEMORY.upsert([{ id: row.id, values }]);
      this.store.sql.exec(
        "DELETE FROM brain_index_outbox WHERE id = ? AND version = ?",
        row.id,
        row.version,
      );
    }
  }
  // Pi persists the model choice with its session. Defaults only affect new
  // sessions, so apply configuration changes without resetting chat or memory.
  private modelReady?: Promise<void>;
  private ensureModel() {
    if (!this.modelReady) {
      this.modelReady = this.harness
        .session()
        .setModel(this.ai(this.env.MODEL))
        .catch((error) => {
          this.modelReady = undefined;
          throw error;
        });
    }
    return this.modelReady;
  }
  async capture(input: unknown) {
    const data = captureInput.parse(input);
    const id = data.id ?? crypto.randomUUID();
    this.store.capture(id, data.text, data.source);
    // A retry of a cleared message must not rerun its already-applied mutations.
    if (this.store.isArchived(id)) return { id, accepted: false };
    await this.ensureModel();
    const row = this.store.sql
      .exec<{ created_at: string }>(
        "SELECT created_at FROM brain_captures WHERE id = ?",
        id,
      )
      .toArray()[0];
    const receipt = await this.harness.submit(
      `Message ID: ${id}\nSent at: ${row.created_at}\nTimezone: ${this.env.TIMEZONE}\nSource: ${data.source}\n\n${data.text}`,
      { operationId: id },
    );
    return { id, accepted: receipt.accepted };
  }
  async snapshot() {
    await this.ensureModel();
    this.ctx.waitUntil(this.indexRecords().catch(() => {}));
    const pending = await this.harness.pending();
    const captures = this.store.recentCaptures();
    const messages = [];
    for (const capture of captures) {
      const operation = pending.find((op) => op.operationId === capture.id);
      // Re-submission repairs a crash between storing a capture and Pi accepting it.
      await this.capture(capture);
      const current =
        operation ??
        (await this.harness.pending()).find(
          (op) => op.operationId === capture.id,
        );
      messages.push({
        ...capture,
        result: current
          ? { status: current.status }
          : await this.harness.wait(capture.id),
      });
    }
    return {
      items: this.store.list(),
      context: this.store.list("context"),
      messages,
      changes: this.store.sql
        .exec("SELECT * FROM brain_changes ORDER BY created_at DESC LIMIT 30")
        .toArray(),
      index_backlog: this.store.sql
        .exec<{ n: number }>("SELECT count(*) AS n FROM brain_index_outbox")
        .toArray()[0].n,
    };
  }
  async edit(id: string, input: unknown): Promise<{ id: string }> {
    const body = input as {
      status?: unknown;
      expected_version?: number;
      title?: string;
      details?: string;
      priority?: string;
    };
    const current = this.store.get(id);
    if (!current || current.kind !== "item") throw new Error("Item not found");
    const source = `manual-${crypto.randomUUID()}`;
    this.store.capture(
      source,
      `Manual edit of ${id}: ${JSON.stringify(body)}`,
      "manual",
    );
    this.store.save({
      id,
      kind: "item",
      expected_version: body.expected_version ?? -1,
      source_id: source,
      mutation_id: source,
      data: itemInput.parse({
        ...current,
        ...body,
        status:
          body.status === undefined
            ? current.status
            : status.parse(body.status),
      }),
    });
    return { id };
  }
  async undo(changeId: string): Promise<{ id: string }> {
    const record = this.store.undo(changeId);
    return { id: record.id };
  }
  async retry() {
    await this.harness.session().retry();
    return { ok: true };
  }
}
