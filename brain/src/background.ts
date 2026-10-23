import {
  LifecycleCapability,
  type LifecycleJobOutcome,
} from "agents/lifecycle";
import type { Store } from "./store";

/** Repairs capture/submit gaps, caches completed replies, and drains vector writes. */
export class BackgroundWork extends LifecycleCapability {
  constructor(
    private store: Store,
    private reconcile: () => Promise<boolean>,
    private index: () => Promise<void>,
    private indexEnabled = true,
  ) {
    super("brain-background");
  }
  async onStart() {
    await this.schedule();
  }
  async schedule() {
    if (this.lifecycle.status() === "zero") await this.lifecycle.ready();
    const existing = this.lifecycle.jobs.get("reconcile");
    if (!existing || existing.time > Date.now() + 2000)
      await this.lifecycle.jobs.push({
        id: "reconcile",
        fn: "reconcile",
        time: Date.now() + 1000,
        singleflight: true,
        hungTimeoutSeconds: 120,
      });
  }
  async onJob(): Promise<LifecycleJobOutcome> {
    try {
      const pending = await this.reconcile();
      if (this.indexEnabled)
        try {
          await this.index();
          this.store.health("index");
        } catch (error) {
          this.store.health("index", error);
          throw error;
        }
      this.store.health("background");
      const backlog = this.store.diagnostics().index_backlog;
      // Re-read after awaited work so a concurrent capture cannot lose its wake.
      if (
        pending ||
        (this.indexEnabled && backlog) ||
        this.store.deliveries().length
      )
        return { rescheduleAt: Date.now() + 5000 };
    } catch (error) {
      this.store.health("background", error);
      return {
        rescheduleAt:
          Date.now() + (this.store.deliveries().length ? 5000 : 60000),
      };
    }
  }
}
