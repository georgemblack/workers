import { DatabaseSync } from "node:sqlite";
import { beforeEach, describe, expect, it } from "vitest";
import { Store, type SQL } from "../src/store";

let store: Store;
let n = 0;
beforeEach(() => {
  const db = new DatabaseSync(":memory:");
  const sql = {
    exec(query: string, ...bindings: (string | number | null)[]) {
      let rows: Record<string, unknown>[] = [];
      if (query.includes("CREATE TABLE")) db.exec(query);
      else {
        const statement = db.prepare(query);
        if (statement.columns().length) rows = statement.all(...bindings);
        else statement.run(...bindings);
      }
      return {
        toArray: () => rows,
        [Symbol.iterator]: () => rows[Symbol.iterator](),
      };
    },
  } as unknown as SQL;
  store = new Store(sql, (fn) => {
    db.exec("BEGIN");
    try {
      const result = fn();
      db.exec("COMMIT");
      return result;
    } catch (e) {
      db.exec("ROLLBACK");
      throw e;
    }
  });
  store.capture("message-1", "Track Jane Doe", "chat");
});

const meta = () => ({ source_id: "message-1", mutation_id: `m-${++n}` });
const politician = (
  fields: object = { name: "Jane Doe", office: "Alderperson, Ward 3" },
) =>
  store.save({ type: "politician", intent: "create", data: fields, ...meta() });
const event = (politician_id: string, fields: object = {}) =>
  store.save({
    type: "event",
    intent: "create",
    data: {
      politician_id,
      date: "2026-11-04",
      sentiment: "negative",
      summary: "Voted against the Elm Street bike lane plan.",
      sources: [
        {
          url: "https://news.example/bike-lanes",
          title: "Council rejects bike lanes",
        },
      ],
      ...fields,
    },
    ...meta(),
  });

describe("politicians and events", () => {
  it("stores events with ordered sources and tallies them by sentiment", () => {
    const jane = politician();
    event(jane.id, {
      sources: [
        { url: "https://a.example/1" },
        { url: "https://b.example/2", title: "B" },
      ],
    });
    event(jane.id, { sentiment: "positive", date: "2026-11-08" });
    const { politicians, events } = store.timeline();
    expect(politicians[0]).toMatchObject({
      name: "Jane Doe",
      positive: 1,
      negative: 1,
      neutral: 0,
    });
    expect(events.map((e) => e.date)).toEqual(["2026-11-08", "2026-11-04"]);
    expect(events[1].sources).toEqual([
      { url: "https://a.example/1", title: "" },
      { url: "https://b.example/2", title: "B" },
    ]);
  });

  it("rejects events without a valid politician or web source", () => {
    const jane = politician();
    expect(() => event("nobody")).toThrow(/existing politician/);
    expect(() => event(jane.id, { sources: [] })).toThrow();
    expect(() =>
      event(jane.id, { sources: [{ url: "javascript:alert(1)" }] }),
    ).toThrow();
    expect(() => event(jane.id, { sentiment: "great" })).toThrow();
    expect(() => event(jane.id, { date: "Nov 4" })).toThrow();
    expect(() => event(jane.id, { mood: "bad" })).toThrow(
      /Unknown event field/,
    );
    expect(store.timeline().events).toHaveLength(0);
  });

  it("keeps omitted fields on update, replaces sources, and checks versions", () => {
    const jane = politician();
    const created = event(jane.id);
    const updated = store.save({
      type: "event",
      intent: "update",
      id: created.id,
      expected_version: 1,
      data: { sentiment: "neutral", sources: [{ url: "https://c.example/" }] },
      ...meta(),
    });
    expect(updated).toMatchObject({
      version: 2,
      sentiment: "neutral",
      summary: created.summary,
      sources: [{ url: "https://c.example/", title: "" }],
    });
    expect(() =>
      store.save({
        type: "event",
        intent: "update",
        id: created.id,
        expected_version: 1,
        data: { summary: "Stale edit" },
        ...meta(),
      }),
    ).toThrow(/Version conflict/);
    expect(() =>
      store.save({
        type: "politician",
        intent: "update",
        id: created.id,
        expected_version: 2,
        data: {},
        ...meta(),
      }),
    ).toThrow(/No politician/);
  });

  it("filters events by politician, date range, and sentiment", () => {
    const jane = politician();
    const sam = politician({ name: "Sam Lee", office: "Mayor" });
    event(jane.id, { date: "2026-10-01" });
    event(jane.id, { date: "2026-11-01", sentiment: "positive" });
    event(sam.id, { date: "2026-11-02" });
    expect(store.events({ politician_id: jane.id })).toHaveLength(2);
    expect(
      store.events({ from: "2026-10-15", to: "2026-11-01" }).map((e) => e.date),
    ).toEqual(["2026-11-01"]);
    expect(store.events({ sentiment: "negative" })).toHaveLength(2);
  });
});

describe("change safety", () => {
  it("replays a repeated mutation without applying it twice", () => {
    const jane = politician();
    const args = {
      type: "event" as const,
      intent: "create" as const,
      data: {
        politician_id: jane.id,
        date: "2026-11-04",
        sentiment: "positive",
        summary: "Funded the new library branch.",
        sources: [{ url: "https://news.example/library" }],
      },
      source_id: "message-1",
      mutation_id: "same-mutation",
    };
    const first = store.save(args);
    expect(store.save(args)).toEqual(first);
    expect(store.timeline().events).toHaveLength(1);
    expect(() =>
      store.save({
        ...args,
        data: { ...args.data, summary: "Something else" },
      }),
    ).toThrow(/different change/);
  });

  it("requires a known source message", () => {
    expect(() =>
      store.save({
        type: "politician",
        intent: "create",
        data: { name: "X" },
        source_id: "nope",
        mutation_id: "m",
      }),
    ).toThrow(/Unknown source message/);
  });

  it("audits deletes and refuses to delete a politician who still has events", () => {
    const jane = politician();
    const created = event(jane.id);
    expect(() =>
      store.remove({ id: jane.id, expected_version: 1, ...meta() }),
    ).toThrow(/still has events/);
    expect(
      store.remove({ id: created.id, expected_version: 1, ...meta() }),
    ).toMatchObject({ deleted: true });
    expect(store.get(created.id)).toBeNull();
    expect(store.history(created.id)[0]).toMatchObject({ after_data: null });
    expect(
      store.remove({ id: jane.id, expected_version: 1, ...meta() }),
    ).toMatchObject({ deleted: true });
  });
});

describe("search", () => {
  it("finds events by politician name, including after a rename", () => {
    const jane = politician();
    event(jane.id);
    expect(store.search("bike lanes").some((r) => r && "summary" in r)).toBe(
      true,
    );
    store.save({
      type: "politician",
      intent: "update",
      id: jane.id,
      expected_version: 1,
      data: { name: "Jane Smith" },
      ...meta(),
    });
    const hits = store
      .search("Smith")
      .filter((r) => r && "type" in r && r.type === "event");
    expect(hits).toHaveLength(1);
    expect(
      store
        .search("Track Jane")
        .some((r) => r && "type" in r && r.type === "message"),
    ).toBe(true);
  });
});
