import { DurableObject } from "cloudflare:workers";
import { createModels } from "@earendil-works/pi-ai/models";
import { createRegistry, Harness } from "@earendil-works/pi-durable";
import { PiHarness } from "agents/harness/pi";
import { Lifecycle } from "agents/lifecycle";

import { Store, captureInput, type CaptureRow } from "./store";
import { createBrainAI } from "./model";
import { BackgroundWork } from "./background";

export interface Env {
  BRAIN: DurableObjectNamespace<Brain2>;
  AI: Ai;
  MODEL: string;
  AI_GATEWAY: string;
  TIMEZONE: string;
  ACCESS_AUD: string;
  LOCAL_DEV?: string;
}

// Placeholder until plan 03 assembles the real prompt from modules.
const preamble = "You are brain2. Reply briefly.";

export class Brain2 extends DurableObject<Env> {
  store = new Store(this.ctx.storage.sql, (fn) =>
    this.ctx.storage.transactionSync(fn),
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
      `Sent at: ${capture.created_at}\nTimezone: ${this.env.TIMEZONE}\nSource: ${capture.source}\n\n${capture.text}`,
      { operationId: capture.id },
    );
    this.store.accepted(capture.id);
    return receipt;
  }

  installExtension() {
    this.registry.install({
      name: "brain2",
      tools: [],
      sections: [
        { key: "preamble", render: () => preamble, tag: false },
        {
          key: "clock",
          render: () =>
            `Today: ${new Date().toLocaleDateString("en-CA", { timeZone: this.env.TIMEZONE })}. User timezone: ${this.env.TIMEZONE}.`,
        },
      ],
    });
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
  conversationSnapshot() {
    return { messages: this.store.conversation() };
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
