import { expect, it } from "vitest";
import {
  addRef,
  filterPeople,
  outgoingRefs,
  pendingMessage,
  pollInterval,
  removeRef,
} from "../src/client/logic";
import type { ChatMessage, StateResponse } from "../src/shared/contracts";

const state = (...statuses: ChatMessage["status"][]) =>
  ({ messages: statuses.map((status) => ({ status })) }) as StateResponse;

it("polls quickly only while a reply is in progress", () => {
  expect(pollInterval(null)).toBe(10_000);
  expect(pollInterval(state("done", "unanswered", "parked"))).toBe(10_000);
  expect(pollInterval(state("done", "queued"))).toBe(2_000);
  expect(pollInterval(state("running"))).toBe(2_000);
});

it("adds references once, up to five, and removes them", () => {
  const ref = (n: number) => ({ id: `task_${n}`, title: `Task ${n}` });
  let refs = addRef([], ref(1));
  refs = addRef(refs, ref(1));
  expect(refs).toEqual([ref(1)]);
  for (let n = 2; n <= 7; n++) refs = addRef(refs, ref(n));
  expect(refs.map((r) => r.id)).toEqual([
    "task_1",
    "task_2",
    "task_3",
    "task_4",
    "task_5",
  ]);
  expect(removeRef(refs, "task_3").map((r) => r.id)).toEqual([
    "task_1",
    "task_2",
    "task_4",
    "task_5",
  ]);
});

it("sends the open person first, without duplicates", () => {
  const jane = { id: "person_jane", title: "Jane Miller" };
  const task = { id: "task_1", title: "Buy seeds" };
  expect(outgoingRefs([task], null)).toEqual(["task_1"]);
  expect(outgoingRefs([task, jane], jane)).toEqual(["person_jane", "task_1"]);
});

it("filters people by name, alias or how the user knows them", () => {
  const people = [
    { id: "1", name: "John Miller", aliases: ["Jon"], subtitle: "Neighbor" },
    { id: "2", name: "Jane Okafor", aliases: [], subtitle: "Works on my team" },
  ];
  expect(filterPeople(people, "  ").map((p) => p.id)).toEqual(["1", "2"]);
  expect(filterPeople(people, "jon").map((p) => p.id)).toEqual(["1"]);
  expect(filterPeople(people, "TEAM").map((p) => p.id)).toEqual(["2"]);
  expect(filterPeople(people, "okafor").map((p) => p.id)).toEqual(["2"]);
});

it("reuses the saved message ID when the same text is sent again", () => {
  let n = 0;
  const newId = () => `id-${++n}`;
  const first = pendingMessage(null, "Fix bike", [], newId);
  expect(first).toEqual({ id: "id-1", text: "Fix bike", refs: [] });
  expect(pendingMessage(first, "Fix bike", ["task_1"], newId)).toEqual({
    id: "id-1",
    text: "Fix bike",
    refs: ["task_1"],
  });
  expect(pendingMessage(first, "Fix the bike", [], newId).id).toBe("id-2");
});
