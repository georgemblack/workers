import { DurableObject } from "cloudflare:workers";
import { createModels } from "@earendil-works/pi-ai/models";
import { createRegistry, Harness } from "@earendil-works/pi-durable";
import { PiHarness } from "agents/harness/pi";
import { Lifecycle } from "agents/lifecycle";

import { Store, captureInput, type CaptureRow } from "./store";
import { createBrainAI } from "./model";
import { BackgroundWork } from "./background";
import { modules, registry } from "./modules";
import { toolsFor, nodeDetail } from "./tools";
import { messageText, sections, today } from "./prompt";
import { renderMarkdown } from "./markdown";
import type {
  ChatMessage,
  ImportFile,
  NodeDetail,
  StateResponse,
} from "./shared/contracts";

export interface Env {
  BRAIN: DurableObjectNamespace<Brain2>;
  AI: Ai;
  MODEL: string;
  AI_GATEWAY: string;
  TIMEZONE: string;
  ACCESS_AUD: string;
  LOCAL_DEV?: string;
}

export class Brain2 extends DurableObject<Env> {
  store = new Store(
    this.ctx.storage.sql,
    (fn) => this.ctx.storage.transactionSync(fn),
    registry,
  );
  ai = createBrainAI(this.env.AI, this.env.AI_GATEWAY);
  registry = createRegistry();
  harness = new PiHarness({
    harness: ({ storage, context, onWake }) => {
      this.installExtension();
      const models = createModels();
      models.setProvider(this.ai.provider);
      const contextWindow = this.ai(this.env.MODEL).contextWindow;
      return Harness.open(
        storage,
        {
          models,
          registry: this.registry,
          onWake,
          onReport: (error, info) =>
            console.error(
              "brain2 agent report",
              info.type,
              error instanceof Error ? error.message : "Agent error",
            ),
          settings: {
            retry: { enabled: true, maxRetries: 3, baseDelayMs: 1000 },
            // Stored records are the memory, not the chat history, so compact
            // once the conversation passes about 25K tokens.
            compaction: {
              reserveTokens: Math.max(16384, contextWindow - 25_000),
              keepRecentTokens: 8_000,
            },
            afterFailedRun: "continue",
          },
        },
        context,
      );
    },
    defaults: { model: this.ai(this.env.MODEL), thinkingLevel: "low" },
  });
  background = new BackgroundWork(this.store, () => this.reconcileCaptures());
  lifecycle = Lifecycle.install(this).use(this.harness).use(this.background);

  /** Submits stored captures Pi hasn't seen and records finished replies. */
  private async reconcileCaptures() {
    let pending = false;
    const operations = await this.harness.pending();
    for (const delivery of this.store.deliveries()) {
      if (delivery.state === "pending") {
        await this.submitCapture(this.store.getCapture(delivery.id));
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
  private async submitCapture(capture: CaptureRow) {
    await this.ensureModel();
    const receipt = await this.harness.submit(
      messageText(this.store, capture, this.env.TIMEZONE),
      { operationId: capture.id },
    );
    this.store.accepted(capture.id);
    return receipt;
  }

  installExtension() {
    this.registry.install({
      name: "brain2",
      tools: toolsFor({
        store: this.store,
        registry,
        currentSource: () => this.currentSource(),
        afterWrite: () => this.background.schedule(),
      }),
      sections: sections(this.store, modules, this.env),
    });
  }
  /**
   * The message whose run is making a tool call. Pi runs one conversation, so
   * this is the running operation; when a follow-up joined the same run, the
   * newest one wins.
   */
  private async currentSource() {
    const running = (await this.harness.pending()).filter(
      (operation) => operation.status === "running",
    );
    return running.at(-1)?.operationId;
  }

  // Pi persists the model choice with its session. Defaults only affect new
  // sessions, so apply configuration changes without resetting the chat.
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
    const { id = crypto.randomUUID(), ...data } = captureInput.parse(input);
    this.store.capture(id, data);
    if (this.store.completed(id)) return { id, accepted: false };
    // The durable delivery row and job exist before Pi submission; retries repair any gap.
    await this.background.schedule();
    const receipt = await this.submitCapture(this.store.getCapture(id));
    return { id, accepted: receipt.accepted };
  }
  /** Everything the browser shows, or null when nothing changed since `rev`. */
  stateSnapshot(rev?: number): StateResponse | null {
    const current = this.store.rev();
    if (rev === current) return null;
    const date = today(this.env.TIMEZONE);
    const views: Record<string, unknown> = {};
    for (const module of modules)
      if (module.title && module.view)
        views[module.id] = module.view(this.store, date);
    return {
      rev: current,
      messages: this.store.conversation().map((message): ChatMessage => {
        const status = (
          ["queued", "running", "done", "unanswered", "parked"].includes(
            message.result.status,
          )
            ? message.result.status
            : "queued"
        ) as ChatMessage["status"];
        return {
          id: message.id,
          text: message.text,
          source: message.source as ChatMessage["source"],
          created_at: message.created_at,
          refs: message.refs
            .map((id) => this.store.getNode(id))
            .filter((node) => node !== null)
            .map((node) => ({ id: node.id, title: node.title })),
          status,
          reply_html:
            status === "done" && message.result.text
              ? renderMarkdown(message.result.text)
              : "",
          ...(status === "unanswered"
            ? { detail: message.result.detail ?? message.result.reason }
            : {}),
        };
      }),
      tabs: modules
        .filter((module) => module.title && module.view)
        .map((module) => ({ id: module.id, title: module.title! })),
      views: views as StateResponse["views"],
    };
  }
  nodeDetail(id: string): NodeDetail | null {
    return nodeDetail(this.store, id);
  }
  /** Imports a brain2 import file (plan 07). Errors come back as data. */
  importFile(file: ImportFile, dryRun: boolean) {
    try {
      const result = this.store.importFile(file, {
        captureId: `import-${Date.now()}`,
        dryRun,
      });
      return { ok: true, ...result, errors: [] as string[] };
    } catch (error) {
      return {
        ok: false,
        nodes: 0,
        entries: 0,
        errors: [error instanceof Error ? error.message : String(error)],
      };
    }
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
