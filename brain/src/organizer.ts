import {
  LifecycleCapability,
  type LifecycleJobOutcome,
} from "agents/lifecycle";
import type { Store } from "./store";

const REFRESH_MS = 6 * 60 * 60 * 1000;
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
  async schedule() {
    if (this.lifecycle.status() === "zero") await this.lifecycle.ready();
    const { revision, saved } = this.store.dashboardState();
    const dirty = !saved || revision !== saved.revision;
    const target = dirty
      ? Date.now() + 5000
      : Math.max(
          Date.now() + 5000,
          Date.parse(saved.generated_at) + REFRESH_MS,
        );
    const existing = this.lifecycle.jobs.get("dashboard-refresh");
    if (!existing || existing.time > target + 1000)
      await this.lifecycle.jobs.push({
        id: "dashboard-refresh",
        fn: "refresh",
        time: target,
        singleflight: true,
        hungTimeoutSeconds: 120,
      });
  }
  async onJob(): Promise<LifecycleJobOutcome> {
    if (await this.busy()) return { rescheduleAt: Date.now() + 10000 };
    const { revision, saved } = this.store.dashboardState();
    if (
      saved &&
      saved.revision === revision &&
      Date.parse(saved.generated_at) + REFRESH_MS > Date.now()
    )
      return { rescheduleAt: Date.parse(saved.generated_at) + REFRESH_MS };
    try {
      await this.generate();
    } catch (error) {
      console.error(
        "Dashboard refresh failed",
        error instanceof Error ? error.message : "Unknown error",
      );
      return { rescheduleAt: Date.now() + 5 * 60 * 1000 };
    }
    const after = this.store.dashboardState();
    return {
      rescheduleAt:
        Date.now() +
        (after.saved?.revision === after.revision ? REFRESH_MS : 5000),
    };
  }
}
