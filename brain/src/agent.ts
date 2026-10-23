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
import { captureInput } from "./domain";
import { instructions } from "./prompt";
import { createBrainAI } from "./model";
import { DashboardOrganizer } from "./organizer";
import { BackgroundWork } from "./background";
import { contextForPrompt } from "./context";
import { active, buildDashboard, organizerInstructions } from "./dashboard";

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
      "For creation supply a new record; for updates supply only changed fields. Item fields: {title,why,details,status:inbox|open|waiting|someday|done|dropped,priority:high|normal|low,priority_reason,parent_id:string|null,area_id:existing area ID|null,timing,due_date:YYYY-MM-DD|null,scheduled_at:ISO|null,follow_up_at:YYYY-MM-DD|null,waiting_for:string,timing_source:explicit|inherited|inferred|none,context_ids:string[],needs_clarification}. Context: {title,body,evidence,core:boolean (only true for core personal/family facts)}.",
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
  organizer = new DashboardOrganizer(
    this.store,
    async () =>
      (await this.harness.pending()).some(
        (operation) => operation.status !== "parked",
      ),
    () => this.refreshDashboard(),
  );
  background = new BackgroundWork(
    this.store,
    () => this.reconcileCaptures(),
    () => this.indexRecords(),
    !!this.env.MEMORY,
  );
  lifecycle = Lifecycle.install(this)
    .use(this.harness)
    .use(this.organizer)
    .use(this.background);

  private async reconcileCaptures() {
    let pending = false;
    const operations = await this.harness.pending();
    for (const delivery of this.store.deliveries()) {
      if (delivery.state === "pending") {
        const capture = this.store.sql
          .exec<{
            id: string;
            text: string;
            source: string;
            created_at: string;
          }>("SELECT * FROM brain_captures WHERE id=?", delivery.id)
          .toArray()[0];
        if (this.store.isArchived(delivery.id)) continue;
        await this.submitCapture(capture);
        pending = true;
        continue;
      }
      const operation = operations.find((op) => op.operationId === delivery.id);
      if (operation) {
        this.store.result(delivery.id, { status: operation.status }, false);
        if (operation.status !== "parked") pending = true;
      } else
        this.store.result(
          delivery.id,
          await this.harness.wait(delivery.id),
          true,
        );
    }
    return (
      pending || this.store.deliveries().some((d) => d.state === "pending")
    );
  }
  private async submitCapture(capture: {
    id: string;
    text: string;
    source: string;
    created_at: string;
  }) {
    await this.ensureModel();
    const receipt = await this.harness.submit(
      `Message ID: ${capture.id}\nSent at: ${capture.created_at}\nTimezone: ${this.env.TIMEZONE}\nSource: ${capture.source}\n\n${capture.text}`,
      { operationId: capture.id },
    );
    this.store.accepted(capture.id);
    if (receipt.accepted) await this.scheduleDashboard();
    return receipt;
  }

  private async scheduleDashboard() {
    try {
      await this.organizer.schedule();
    } catch (error) {
      console.error("Dashboard scheduling failed", error);
    }
  }
  private async refreshDashboard() {
    const { revision, saved } = this.store.dashboardState();
    const items = this.store.list().filter(active);
    if (!items.length) {
      this.store.publishDashboard({ highlights: [], groups: [] }, revision);
      return;
    }
    const response = await this.ai.completeSimple(
      this.ai(this.env.MODEL),
      {
        systemPrompt: organizerInstructions,
        messages: [
          {
            role: "user",
            timestamp: Date.now(),
            content: JSON.stringify({
              now: new Date().toISOString(),
              timezone: this.env.TIMEZONE,
              areas: this.store.areas(),
              items,
              context: this.store.list("context"),
              previous_plan: saved?.plan,
            }),
          },
        ],
      },
      {
        reasoning: "low",
        maxTokens: 10000,
        signal: AbortSignal.timeout(90000),
      },
    );
    if (response.stopReason === "error") throw new Error(response.errorMessage);
    const text = response.content
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join("\n")
      .trim()
      .replace(/^```(?:json)?\s*/, "")
      .replace(/\s*```$/, "");
    this.store.publishDashboard(JSON.parse(text), revision);
  }

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
    const saveTool = (
      name: string,
      intent?: "create" | "update",
    ): ToolRegistration<typeof Save> => ({
      name,
      ...(intent ? {} : { deferred: true as const }),
      description:
        intent === "create"
          ? "Create a new item/context record. Use expected_version=0 and the original source message ID."
          : "Update an existing item/context record using only changed fields in data. Omitted fields are preserved; null, empty string, or [] explicitly clears a field. Read the record first and supply its expected_version. Use the original source message ID and a stable mutation_id.",
      parameters: Save,
      executionMode: "sequential",
      replay: "safe",
      execute: async (args) => {
        try {
          const record = this.store.save({
            ...args,
            intent,
            data: JSON.parse(args.data),
          });
          await this.scheduleDashboard();
          await this.background.schedule();
          return output(record);
        } catch (error) {
          return output({
            error: error instanceof Error ? error.message : "Invalid mutation",
          });
        }
      },
    });
    this.registry.install({
      name: "brain",
      tools: [
        search,
        get,
        list,
        saveTool("create_record", "create"),
        saveTool("update_record", "update"),
        saveTool("save_record"),
      ],
      sections: [
        { key: "preamble", render: () => instructions, tag: false },
        {
          key: "clock",
          render: () =>
            `Today: ${new Date().toLocaleDateString("en-CA", { timeZone: this.env.TIMEZONE })}. User timezone: ${this.env.TIMEZONE}.`,
        },
        {
          key: "known_context",
          render: () =>
            JSON.stringify(
              contextForPrompt(
                this.store.list("context") as unknown as Array<{
                  id: string;
                  title: string;
                  body: string;
                  core?: boolean;
                }>,
              ),
            ),
        },
        { key: "areas", render: () => JSON.stringify(this.store.areas()) },
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
    await this.lifecycle.start();
    const data = captureInput.parse(input);
    const id = data.id ?? crypto.randomUUID();
    this.store.capture(id, data.text, data.source);
    // A retry of a cleared message must not rerun its already-applied mutations.
    if (this.store.isArchived(id) || this.store.completed(id))
      return { id, accepted: false };
    // The durable delivery row and job exist before Pi submission; retries repair any gap.
    await this.background.schedule();
    const row = this.store.sql
      .exec<{ id: string; text: string; source: string; created_at: string }>(
        "SELECT * FROM brain_captures WHERE id=?",
        id,
      )
      .toArray()[0];
    const receipt = await this.submitCapture(row);
    return { id, accepted: receipt.accepted };
  }
  dashboardSnapshot() {
    const items = this.store.list();
    const { revision, saved } = this.store.dashboardState();
    const display = (item: import("./domain").Item) => {
      const {
        id,
        title,
        parent_id,
        timing,
        due_date,
        scheduled_at,
        follow_up_at,
        timing_source,
        needs_clarification,
      } = item;
      return {
        id,
        title,
        parent_id,
        timing,
        due_date,
        scheduled_at,
        follow_up_at,
        timing_source,
        needs_clarification,
      };
    };
    const view = buildDashboard(
      items,
      this.store.areas(),
      saved,
      revision,
      this.env.TIMEZONE,
    );
    return {
      items: items.filter(active).map(display),
      dashboard: {
        ...view,
        highlights: view.highlights.map((h) => ({
          ...h,
          item: display(h.item),
        })),
        groups: view.groups.map((g) => ({
          ...g,
          featured: g.featured.map(display),
          remaining: g.remaining.map(display),
          waiting: g.waiting.map(display),
          optional: g.optional.map(display),
        })),
      },
    };
  }
  conversationSnapshot() {
    return { messages: this.store.conversation() };
  }
  exportData() {
    return { ...this.store.exportData(), timezone: this.env.TIMEZONE };
  }
  diagnostics() {
    return this.store.diagnostics();
  }
  async retry() {
    await this.harness.session().retry();
    this.store.resumeParked();
    await this.background.schedule();
    return { ok: true };
  }
}
