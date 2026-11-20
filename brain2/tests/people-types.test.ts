import { beforeEach, expect, it } from "vitest";
import { openStore, writer } from "./helpers/sqlite";
import type { Store } from "../src/store";

let store: Store;
let w: ReturnType<typeof writer>;
beforeEach(() => {
  ({ store } = openStore());
  w = writer(store);
});

it("enforces relation rules between people", () => {
  const jane = w.create("person", "Jane");
  const john = w.create("person", "John", {}, { spouse_of: [jane.id] });
  const jude = w.create("person", "Jude", {}, { child_of: [jane.id, john.id] });
  const jonah = w.create("person", "Jonah", {}, { sibling_of: [jude.id] });
  expect(jude.links.child_of).toEqual([jane.id, john.id]);
  expect(store.backlinks(jane.id).map((b) => [b.rel, b.node.title])).toEqual([
    ["spouse_of", "John"],
    ["child_of", "Jude"],
  ]);
  expect(() =>
    w.update(jane.id, {}, { spouse_of: [john.id, jude.id] }),
  ).toThrow(/at most one/);
  expect(() => w.update(jonah.id, {}, { sibling_of: [jonah.id] })).toThrow(
    /itself/,
  );
  const millers = w.create("group", "The Millers", { kind: "household" });
  expect(() =>
    w.create("person", "Rex", {}, { spouse_of: [millers.id] }),
  ).toThrow(/must point to person/);
});

it("lets households join circles and keeps circles at the top", () => {
  const neighbors = w.create("group", "Neighbors", { kind: "circle" });
  const work = w.create("group", "Work", { kind: "circle" });
  const millers = w.create(
    "group",
    "The Millers",
    { kind: "household" },
    { member_of: [neighbors.id] },
  );
  expect(millers.links.member_of).toEqual([neighbors.id]);
  expect(() =>
    w.create(
      "group",
      "Book club",
      { kind: "circle" },
      { member_of: [work.id] },
    ),
  ).toThrow("A circle cannot be a member of another group");
  expect(() =>
    w.create(
      "group",
      "The Okafors",
      { kind: "household" },
      { member_of: [millers.id] },
    ),
  ).toThrow("A household can only be a member of circles");
  expect(() => w.create("group", "Somebody")).toThrow(/kind/);
});

it("accepts birthdays with or without a year", () => {
  expect(w.create("person", "Jude", { birthday: "03-14" }).props.birthday).toBe(
    "03-14",
  );
  expect(
    w.create("person", "Jonah", { birthday: "2021-02-29" }).props.birthday,
  ).toBe("2021-02-29");
  for (const bad of ["13-01", "02-32", "March 14", "3-14"])
    expect(() => w.create("person", "Jane", { birthday: bad })).toThrow(
      /birthday/,
    );
});

it("requires a follow-up to be about someone", () => {
  const john = w.create("person", "John");
  expect(() =>
    w.create("followup", "Ask how the job interview went", {
      since: "2026-11-19",
    }),
  ).toThrow("A follow-up must be about someone (links.about)");
  const followup = w.create(
    "followup",
    "Ask how the job interview went",
    { since: "2026-11-19" },
    { about: [john.id] },
  );
  expect(followup.status).toBe("open");
});

it("lets tasks be about people and households", () => {
  const home = w.create("area", "Home");
  const jude = w.create("person", "Jude");
  const millers = w.create("group", "The Millers", { kind: "household" });
  const task = w.create(
    "task",
    "Buy a birthday present for Jude",
    {},
    { in_area: [home.id], about: [jude.id, millers.id] },
  );
  expect(task.links.about).toEqual([jude.id, millers.id]);
});
