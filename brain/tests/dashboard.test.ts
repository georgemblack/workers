import { expect, it } from "vitest";
import {
  buildDashboard,
  defaultAreas,
  organizerInput,
  subtitle,
  validatePlan,
  type DashboardItem,
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
const saved = (groups: SavedPlan["plan"]["groups"]): SavedPlan => ({
  revision: 1,
  generated_at: now.toISOString(),
  plan: { groups },
});
const build = (items: Item[], plan: SavedPlan | null = null, at = now) =>
  buildDashboard(items, defaultAreas, plan, "America/Chicago", at);
const ids = (nodes: DashboardItem[]): unknown[] =>
  nodes.map((n) => (n.children.length ? [n.id, ids(n.children)] : n.id));

it("nests every sub-item under its parent, at any depth", () => {
  const view = build(
    [
      item("christmas", { area_id: "personal" }),
      item("pajamas", { parent_id: "christmas" }),
      item("stocking", { parent_id: "christmas" }),
      item("chocolate", { parent_id: "stocking" }),
      item("wrapped", { parent_id: "christmas", status: "done" }),
    ],
    saved([
      { area_id: "personal", title: "Personal", item_ids: ["christmas"] },
    ]),
  );
  expect(view.groups).toHaveLength(1);
  expect(ids(view.groups[0].items)).toEqual([
    ["christmas", ["pajamas", ["stocking", ["chocolate"]]]],
  ]);
});

it("treats a sub-item of a closed parent as top-level", () => {
  const view = build([
    item("project", { status: "done" }),
    item("leftover", { parent_id: "project" }),
  ]);
  expect(view.groups.map((g) => [g.id, ids(g.items)])).toEqual([
    ["other", ["leftover"]],
  ]);
});

it("puts high-priority and soon-due work first, but not someday or future follow-ups", () => {
  const view = build([
    item("doula", { priority: "high" }),
    item("bags", { due_date: "2026-10-28" }),
    item("later", { due_date: "2026-11-20" }),
    item("optional", { priority: "high", status: "someday" }),
    item("builder", { status: "waiting", due_date: "2026-10-23" }),
    item("delivery", { status: "waiting", due_date: "2026-11-01" }),
    item("parent"),
    item("child", { parent_id: "parent", priority: "high" }),
  ]);
  expect(view.priorities.map((p) => p.id)).toEqual([
    "builder",
    "bags",
    "child",
    "doula",
  ]);
  expect(view.priorities.every((p) => p.children.length === 0)).toBe(true);
  // Priorities are a digest: the same items still show in their area.
  expect(ids(view.groups[0].items)).toContainEqual(["parent", ["child"]]);
});

it("groups top-level items by explicit area, then the saved plan", () => {
  const view = build(
    [
      item("project", { area_id: "home" }),
      item("child", { parent_id: "project" }),
      item("dentist"),
      item("new"),
    ],
    saved([
      { area_id: "personal", title: "Personal", item_ids: ["dentist"] },
      { area_id: "baby", title: "Preparing for baby", item_ids: ["project"] },
    ]),
  );
  expect(view.groups.map((g) => [g.id, ids(g.items)])).toEqual([
    ["personal", ["dentist"]],
    ["home", [["project", ["child"]]]],
    ["other", ["new"]],
  ]);
});

it("formats timing for people, preferring an explicit target", () => {
  const today = "2026-10-23";
  const at = (data: Record<string, unknown>) =>
    subtitle(item("x", data), today);
  expect(at({})).toBe("");
  expect(at({ target: "Mid-November", due_date: "2026-11-15" })).toBe(
    "Mid-November",
  );
  expect(at({ due_date: "2026-11-30" })).toBe("By Nov 30");
  expect(at({ due_date: "2026-10-27" })).toBe("By Tue, Oct 27");
  expect(at({ due_date: "2026-10-24" })).toBe("Tomorrow");
  expect(at({ due_date: "2026-10-23" })).toBe("Today");
  expect(at({ due_date: "2026-10-20" })).toBe("Overdue since Oct 20");
  expect(at({ due_date: "2027-01-15" })).toBe("By Jan 15, 2027");
  expect(at({ status: "waiting", due_date: "2026-11-02" })).toBe(
    "Follow up Nov 2",
  );
  expect(at({ status: "waiting", due_date: "2026-10-22" })).toBe(
    "Follow up now",
  );
});

it("uses the user's local calendar date", () => {
  const view = build(
    [item("deadline", { due_date: "2026-10-22" })],
    null,
    new Date("2026-10-23T02:00:00Z"),
  );
  expect(view.priorities[0].subtitle).toBe("Today");
});

it("rejects invented or duplicate plan references and ignores stray sub-items", () => {
  const items = [item("doula"), item("child", { parent_id: "doula" })];
  const group = { area_id: "baby", title: "Baby", item_ids: ["doula"] };
  expect(() => validatePlan({ groups: [group] }, [])).toThrow();
  expect(() => validatePlan({ groups: [group, group] }, items)).toThrow();
  expect(() =>
    validatePlan(
      { groups: [{ ...group, item_ids: ["doula", "doula"] }] },
      items,
    ),
  ).toThrow();
  expect(
    validatePlan(
      { groups: [{ ...group, item_ids: ["doula", "child"] }] },
      items,
    ).groups[0].item_ids,
  ).toEqual(["doula"]);
});

it("sends the organizer only top-level items, with sub-item titles for context", () => {
  const input = organizerInput(
    [
      item("christmas"),
      item("pajamas", { parent_id: "christmas" }),
      item("old", { status: "dropped" }),
    ],
    defaultAreas,
  );
  expect(input.items).toEqual([
    {
      id: "christmas",
      title: "christmas",
      notes: "",
      area_id: null,
      sub_items: ["pajamas"],
    },
  ]);
});
