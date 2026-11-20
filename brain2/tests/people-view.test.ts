import { beforeEach, expect, it } from "vitest";
import { openStore, writer } from "./helpers/sqlite";
import type { Store } from "../src/store";
import type { NodeRecord } from "../src/shared/contracts";
import { nextBirthday, view } from "../src/modules/people/view";
import { people } from "../src/modules/people";
import { nodeDetail } from "../src/tools";

let store: Store;
let w: ReturnType<typeof writer>;
let f: Record<string, NodeRecord>;
const today = "2026-12-20";

// The fictional cast from plans/contracts.md.
beforeEach(() => {
  ({ store } = openStore());
  w = writer(store);
  const neighbors = w.create("group", "Neighbors", { kind: "circle" });
  const work = w.create("group", "Work", { kind: "circle" });
  const millers = w.create(
    "group",
    "The Millers",
    { kind: "household" },
    { member_of: [neighbors.id] },
  );
  const jane = w.create(
    "person",
    "Jane Miller",
    { how_i_know: "Neighbor" },
    { member_of: [millers.id] },
  );
  const john = w.create(
    "person",
    "John Miller",
    { aliases: ["Jon"], birthday: "01-03" },
    { member_of: [millers.id], spouse_of: [jane.id] },
  );
  const jude = w.create(
    "person",
    "Jude",
    { birthday: "2021-12-25" },
    { member_of: [millers.id], child_of: [jane.id, john.id] },
  );
  const jonah = w.create(
    "person",
    "Jonah",
    {},
    { member_of: [millers.id], child_of: [jane.id, john.id] },
  );
  const okafor = w.create(
    "person",
    "Jane Okafor",
    { how_i_know: "Works on my team" },
    { member_of: [work.id] },
  );
  const sam = w.create("person", "Sam");
  f = { neighbors, work, millers, jane, john, jude, jonah, okafor, sam };
});

it("nests circles, households and people, with everyone else last", () => {
  // Jane Okafor is also a neighbor; she shows in both circles.
  w.update(f.okafor.id, {}, { member_of: [f.work.id, f.neighbors.id] });
  const circles = view(store, today).circles.map((c) => ({
    title: c.title,
    households: c.households.map((h) => [h.title, h.people.map((p) => p.name)]),
    people: c.people.map((p) => p.name),
  }));
  expect(circles).toEqual([
    {
      title: "Neighbors",
      households: [
        ["The Millers", ["Jane Miller", "John Miller", "Jonah", "Jude"]],
      ],
      people: ["Jane Okafor"],
    },
    { title: "Work", households: [], people: ["Jane Okafor"] },
    { title: "Everyone else", households: [], people: ["Sam"] },
  ]);
  const john = view(store, today).circles[0].households[0].people[1];
  expect(john).toEqual({
    id: f.john.id,
    name: "John Miller",
    aliases: ["Jon"],
    subtitle: "",
  });
});

it("puts a household in no circle under everyone else", () => {
  w.update(f.millers.id, {}, { member_of: [] });
  const last = view(store, today).circles.at(-1)!;
  expect(last).toMatchObject({ id: null, title: "Everyone else" });
  expect(last.households.map((h) => h.title)).toEqual(["The Millers"]);
  expect(last.people.map((p) => p.name)).toEqual(["Sam"]);
});

it("groups open follow-ups by person, newest first", () => {
  const followup = (title: string, since: string, about: string[]) =>
    w.create("followup", title, { since }, { about });
  followup("Ask how the job interview went", "2026-11-10", [f.john.id]);
  followup("Ask about the new puppy", "2026-12-01", [f.millers.id]);
  followup("Ask if the move is settled", "2026-11-20", [f.john.id]);
  const done = followup("Ask about the trip", "2026-12-15", [f.okafor.id]);
  w.update(done.id, { status: "resolved" });
  expect(
    view(store, today).catch_up.map((c) => [
      c.person.name,
      c.followups.map((x) => x.since),
    ]),
  ).toEqual([
    ["The Millers", ["2026-12-01"]],
    ["John Miller", ["2026-11-20", "2026-11-10"]],
  ]);
});

it("lists birthdays in the next 30 days across the new year", () => {
  expect(view(store, today).birthdays).toEqual([
    { id: f.jude.id, name: "Jude", date: "2026-12-25", in_days: 5 },
    { id: f.john.id, name: "John Miller", date: "2027-01-03", in_days: 14 },
  ]);
  expect(view(store, "2026-12-26").birthdays.map((b) => b.name)).toEqual([
    "John Miller",
  ]);
});

it("treats a Feb 29 birthday as Feb 28 in other years", () => {
  expect(nextBirthday("2024-02-29", "2027-02-01")).toBe("2027-02-28");
  expect(nextBirthday("02-29", "2028-02-01")).toBe("2028-02-29");
  expect(nextBirthday("02-29", "2027-03-01")).toBe("2028-02-29");
  expect(nextBirthday("12-25", "2026-12-25")).toBe("2026-12-25");
});

it("shows the newest dated entries, including household ones", () => {
  w.entry([f.john.id], "Went to Platteville for school");
  w.entry([f.millers.id], "Met Jane at the park", "2026-11-14");
  w.entry(
    [f.jane.id, f.john.id],
    "Said they're done having kids",
    "2026-11-28",
  );
  for (let i = 1; i <= 10; i++)
    w.entry(
      [f.okafor.id],
      `Lunch ${i}`,
      `2026-10-${String(i).padStart(2, "0")}`,
    );
  const recent = view(store, today).recent;
  expect(recent).toHaveLength(10);
  expect(recent[0]).toMatchObject({
    text: "Said they're done having kids",
    people: [
      { id: f.jane.id, name: "Jane Miller" },
      { id: f.john.id, name: "John Miller" },
    ],
  });
  expect(recent[1]).toMatchObject({
    text: "Met Jane at the park",
    people: [{ name: "The Millers" }],
  });
});

it("includes household entries when reading a person", () => {
  w.entry([f.millers.id], "Met Jane at the park", "2026-11-14");
  w.entry([f.jane.id], "Grew up in Duluth");
  const detail = nodeDetail(store, f.jane.id)!;
  expect(detail.timeline.map((e) => e.text)).toEqual(["Met Jane at the park"]);
  expect(detail.facts.map((e) => e.text)).toEqual(["Grew up in Duluth"]);
  expect(detail.backlinks.map((b) => [b.rel, b.title])).toEqual([
    ["spouse_of", "John Miller"],
    ["child_of", "Jude"],
    ["child_of", "Jonah"],
  ]);
});

it("indexes the roster with households, circles and open follow-ups", () => {
  w.create(
    "followup",
    "Ask how the job interview went",
    { since: "2026-11-10" },
    { about: [f.john.id] },
  );
  w.entry([f.sam.id], "Moved in down the street", "2026-12-01");
  const index = people.index(store, today) as {
    people: { name: string; household: string | null; circles: string[] }[];
    followups: { about: string[] }[];
    truncated: boolean;
  };
  // Sam was mentioned most recently, so he comes first.
  expect(index.people[0].name).toBe("Sam");
  expect(index.people.find((p) => p.name === "Jude")).toMatchObject({
    household: "The Millers",
    circles: ["Neighbors"],
  });
  expect(index.followups[0].about).toEqual(["John Miller"]);
  expect(index.truncated).toBe(false);
});
