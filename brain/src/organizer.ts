import {
  LifecycleCapability,
  type LifecycleJobOutcome,
} from "agents/lifecycle";
import type { Store } from "./store";

/** Derived views can retry safely: only a revision-checked publish changes state. */
export class DashboardOrganizer extends LifecycleCapability {
  constructor(
    private store: Store,
    private busy: () => Promise<boolean>,
    private generate: () => Promise<void>,
  ) {
    super("brain-dashboard");
  }
  async onStart() {
    await this.schedule();
  }
  // Groupings only change when items do, so refresh only after a change.
  private stale() {
    const { revision, saved } = this.store.dashboardState();
    return !saved || saved.revision !== revision;
  }
  async schedule() {
    if (this.lifecycle.status() === "zero") await this.lifecycle.ready();
    if (!this.stale() || this.lifecycle.jobs.get("dashboard-refresh")) return;
    await this.lifecycle.jobs.push({
      id: "dashboard-refresh",
      fn: "refresh",
      time: Date.now() + 5000,
      singleflight: true,
      hungTimeoutSeconds: 120,
    });
  }
  async onJob(): Promise<LifecycleJobOutcome | void> {
    try {
      if (await this.busy()) return { rescheduleAt: Date.now() + 10000 };
      if (!this.stale()) return;
      await this.generate();
      this.store.health("dashboard");
      // A change that landed mid-generation makes the result stale; go again.
      if (this.stale()) return { rescheduleAt: Date.now() + 5000 };
    } catch (error) {
      this.store.health("dashboard", error);
      console.error(
        "Dashboard refresh failed",
        error instanceof Error ? error.message : "Unknown error",
      );
      return { rescheduleAt: Date.now() + 5 * 60 * 1000 };
    }
  }
}
