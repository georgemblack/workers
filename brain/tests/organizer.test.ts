import { expect, it, vi, afterEach } from "vitest";
import type { Store } from "../src/store";
vi.mock("agents/lifecycle", () => ({
  LifecycleCapability: class {
    constructor(_id: string) {}
  },
}));
import { DashboardOrganizer } from "../src/organizer";
afterEach(() => vi.useRealTimers());
it("waits for Pi to settle before organizing a partially processed message", async () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-10-23T12:00:00Z"));
  const generate = vi.fn();
  const job = new DashboardOrganizer({} as Store, async () => true, generate);
  expect(await job.onJob()).toEqual({ rescheduleAt: Date.now() + 10000 });
  expect(generate).not.toHaveBeenCalled();
});
it("retries model failures durably rather than discarding the refresh", async () => {
  vi.useFakeTimers();
  const store = {
    health: vi.fn(),
    dashboardState: () => ({ revision: 1, saved: null }),
  } as unknown as Store;
  const log = vi.spyOn(console, "error").mockImplementation(() => {});
  try {
    const job = new DashboardOrganizer(
      store,
      async () => false,
      async () => {
        throw new Error("Gateway unavailable");
      },
    );
    expect(await job.onJob()).toEqual({ rescheduleAt: Date.now() + 300000 });
  } finally {
    log.mockRestore();
  }
});
it("regenerates after a concurrent mutation invalidates a completed model call", async () => {
  vi.useFakeTimers();
  const store = {
    health: vi.fn(),
    dashboardState: () => ({
      revision: 2,
      saved: { revision: 1, generated_at: new Date().toISOString() },
    }),
  } as unknown as Store;
  const generate = vi.fn(async () => {});
  const job = new DashboardOrganizer(store, async () => false, generate);
  expect(await job.onJob()).toEqual({ rescheduleAt: Date.now() + 5000 });
  expect(generate).toHaveBeenCalledOnce();
});
it("pulls a far-off refresh in when items change, but leaves a soon one alone", async () => {
  vi.useFakeTimers();
  const store = {
    dashboardState: () => ({
      revision: 2,
      saved: { revision: 1, generated_at: new Date().toISOString() },
    }),
  } as unknown as Store;
  const job = new DashboardOrganizer(store, async () => false, vi.fn());
  let queued: { time: number } | undefined = {
    time: Date.now() + 6 * 60 * 60 * 1000,
  };
  const push = vi.fn(async (next: { time: number }) => {
    queued = next;
  });
  Object.assign(job, {
    lifecycle: { status: () => "ready", jobs: { get: () => queued, push } },
  });
  await job.schedule();
  expect(push).toHaveBeenCalledOnce();
  expect(queued?.time).toBe(Date.now() + 5000);
  await job.schedule();
  expect(push).toHaveBeenCalledOnce();
});
