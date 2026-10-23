import { expect, it } from "vitest";
import {
  buildDashboard,
  defaultAreas,
  validatePlan,
  type SavedPlan,
} from "../src/dashboard";
import { itemInput, type Item } from "../src/domain";
const item = (id: string, data: Record<string, unknown> = {}): Item => ({
  ...itemInput.parse({ title: id, ...data }),
  id,
  version: 1,
  source_id: "source",
  updated_at: "2026-10-23T12:00:00Z",
});
const now = new Date("2026-10-23T12:00:00Z");
const saved = (ids: string[]): SavedPlan => ({
  revision: 1,
  generated_at: now.toISOString(),
  plan: {
    highlights: [{ item_id: ids[0], reason: "Needs booking" }],
    groups: [
      {
        area_id: "baby",
        title: "Preparing for baby",
        summary: "Support arrangements remain",
        item_ids: ids,
        featured_item_ids: ids.slice(0, 3),
      },
    ],
  },
});
it("keeps an optional child quiet even under an important parent", () => {
  const items = [
    item("doula", { priority: "high" }),
    item("trashcan", {
      priority: "low",
      status: "someday",
      parent_id: "doula",
    }),
    item("tag", { status: "waiting", area_id: "kia" }),
  ];
  const view = buildDashboard(
    items,
    defaultAreas,
    saved(["doula", "trashcan"]),
    1,
    "America/Chicago",
    now,
  );
  expect(view.highlights.map((h) => h.item.id)).toEqual(["doula"]);
  expect(
    view.groups.find((g) => g.id === "baby")?.optional.map((i) => i.id),
  ).toEqual(["trashcan"]);
  expect(
    view.groups.find((g) => g.id === "kia")?.waiting.map((i) => i.id),
  ).toEqual(["tag"]);
});
it("adds current deadlines and suppresses obsolete summaries, reasons, and completed items", () => {
  const items = [
    item("doula", { status: "done" }),
    item("warranty", { due_date: "2026-10-22", status: "waiting" }),
    item("diapers", {
      timing: "Before baby arrives",
      timing_source: "inherited",
    }),
  ];
  const view = buildDashboard(
    items,
    defaultAreas,
    saved(["doula"]),
    2,
    "America/Chicago",
    now,
  );
  expect(view.highlights.map((h) => h.item.id)).toEqual(["warranty"]);
  expect(view.highlights[0].reason).toBe("Past its deadline");
  expect(view.groups.every((g) => g.summary === "")).toBe(true);
  expect(
    view.groups
      .flatMap((g) => [
        ...g.featured,
        ...g.remaining,
        ...g.waiting,
        ...g.optional,
      ])
      .map((i) => i.id)
      .sort(),
  ).toEqual(["diapers", "warranty"]);
});
it("honors explicit area moves and keeps new, unplanned items accessible", () => {
  const items = [
    item("project", { area_id: "home" }),
    item("child", { parent_id: "project" }),
    item("new"),
  ];
  const view = buildDashboard(
    items,
    defaultAreas,
    saved(["project", "child"]),
    2,
    "America/Chicago",
    now,
  );
  expect(view.groups.find((g) => g.id === "home")?.count).toBe(2);
  expect(view.groups.find((g) => g.id === "other")?.count).toBe(1);
});
it("rejects invented, duplicate, or misfiled plan references", () => {
  const plan = saved(["doula"]).plan;
  expect(() => validatePlan(plan, [])).toThrow();
  expect(() =>
    validatePlan({ ...plan, groups: [...plan.groups, ...plan.groups] }, [
      item("doula"),
    ]),
  ).toThrow();
  expect(() =>
    validatePlan(
      {
        ...plan,
        groups: [{ ...plan.groups[0], featured_item_ids: ["unknown"] }],
      },
      [item("doula")],
    ),
  ).toThrow();
});
it("uses the user's local calendar date for deadline rules", () => {
  const view = buildDashboard(
    [item("deadline", { due_date: "2026-10-22" })],
    defaultAreas,
    null,
    0,
    "America/Chicago",
    new Date("2026-10-23T02:00:00Z"),
  );
  expect(view.highlights[0].reason).toBe("Due 2026-10-22");
});
