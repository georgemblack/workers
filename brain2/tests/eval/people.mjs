// Paid scenarios for the people module. Fictional data only (see the fixtures
// in plans/contracts.md). Each scenario starts from an empty store.
const park =
  "I met one of my neighbors at the park today, said her name was Jane. Husband's name was John. They have two little boys, Jude and Jonah – John went to Platteville for school.";
const areas =
  "Set up three task areas: Home, Personal, and Other. Nothing else for now.";

const ofType = (state, type) => state.nodes.filter((n) => n.type === type);
const named = (state, pattern) =>
  ofType(state, "person").filter((p) => pattern.test(p.title));
const one = (state, pattern) => named(state, pattern)[0];
const linked = (state, from, rel, to) =>
  state.links.some(
    (l) => l.from_id === from?.id && l.rel === rel && l.to_id === to?.id,
  );
const entryNodes = (entry) => entry.node_ids.split(",");
const entriesOn = (state, node) =>
  state.entries.filter((e) => node && entryNodes(e).includes(node.id));
// True when the message with this reply index wrote anything.
const wrote = (state, index) =>
  state.changes.some((c) => c.source_id === state.replies.at(index).id);

export const scenarios = [
  {
    name: "people 1: a family met at the park",
    messages: [park],
    check(state) {
      const problems = [];
      const [jane, john, jude, jonah] = [
        /jane/i,
        /john/i,
        /jude/i,
        /jonah/i,
      ].map((p) => one(state, p));
      if (ofType(state, "person").length !== 4)
        problems.push(
          `expected 4 people, got ${ofType(state, "person").length}`,
        );
      const homes = ofType(state, "group").filter(
        (g) => g.props.kind === "household",
      );
      const home = homes[0];
      if (homes.length !== 1)
        problems.push(`expected 1 household, got ${homes.length}`);
      for (const p of [jane, john, jude, jonah])
        if (!linked(state, p, "member_of", home))
          problems.push(`${p?.title ?? "someone"} is not in the household`);
      const circle = ofType(state, "group").find(
        (g) => g.props.kind === "circle" && /neighbo/i.test(g.title),
      );
      if (!circle) problems.push("no Neighbors circle");
      else if (!linked(state, home, "member_of", circle))
        problems.push("household is not in the Neighbors circle");
      if (
        !linked(state, jane, "spouse_of", john) &&
        !linked(state, john, "spouse_of", jane)
      )
        problems.push("Jane and John are not linked as spouses");
      for (const kid of [jude, jonah])
        for (const parent of [jane, john])
          if (!linked(state, kid, "child_of", parent))
            problems.push(`${kid?.title} is not child_of ${parent?.title}`);
      const school = state.entries.filter((e) => /platteville/i.test(e.text));
      if (
        school.length !== 1 ||
        school[0].occurred_on !== null ||
        entryNodes(school[0]).join() !== john?.id
      )
        problems.push("Platteville should be one undated entry on John only");
      if (!state.entries.some((e) => /park/i.test(e.text) && e.occurred_on))
        problems.push("no dated entry about meeting at the park");
      return problems;
    },
  },
  {
    name: "people 2: a family update adds one entry and nothing else",
    setup: [park],
    messages: [
      "Saw Jane + family at the park again today, said they're done having kids",
    ],
    check(state) {
      const problems = [];
      if (ofType(state, "person").length !== 4)
        problems.push("people were added");
      if (ofType(state, "group").length !== 2)
        problems.push("groups were added");
      if (ofType(state, "followup").length || ofType(state, "task").length)
        problems.push("created a follow-up or task");
      const kids = state.entries.filter((e) => /kids|children/i.test(e.text));
      if (kids.length !== 1 || !kids[0].occurred_on)
        problems.push(
          `expected one dated entry about kids, got ${kids.length}`,
        );
      return problems;
    },
  },
  {
    name: "people 3: a job search becomes a follow-up, then resolves",
    setup: [park],
    messages: [
      "John said he's interviewing for a new job",
      "John got the job at Acme",
    ],
    check(state) {
      const problems = [];
      const john = one(state, /john/i);
      const followups = ofType(state, "followup");
      if (followups.length !== 1)
        problems.push(`expected 1 follow-up, got ${followups.length}`);
      else {
        if (followups[0].status !== "resolved")
          problems.push(`follow-up is ${followups[0].status}`);
        if (!linked(state, followups[0], "about", john))
          problems.push("follow-up is not about John");
      }
      if (!entriesOn(state, john).some((e) => /interview/i.test(e.text)))
        problems.push("no interview entry on John");
      if (!entriesOn(state, john).some((e) => /acme/i.test(e.text)))
        problems.push("no Acme entry on John");
      return problems;
    },
  },
  {
    name: "people 4: an ambiguous name gets a question, a tapped name gets the write",
    setup: [park, "Also remember Jane Okafor from work, she's on my team."],
    messages: [
      "Jane said she's moving",
      { text: "Jane said she's moving", ref: "Okafor" },
    ],
    check(state) {
      const problems = [];
      if (wrote(state, -2))
        problems.push("the ambiguous message wrote something");
      if (!/\?/.test(state.replies.at(-2).reply))
        problems.push("the ambiguous message got no question");
      const okafor = one(state, /okafor/i);
      const miller = named(state, /jane/i).find((p) => p !== okafor);
      if (!entriesOn(state, okafor).some((e) => /mov/i.test(e.text)))
        problems.push("no moving entry on Jane Okafor");
      if (entriesOn(state, miller).some((e) => /mov/i.test(e.text)))
        problems.push("moving entry on Jane Miller");
      return problems;
    },
  },
  {
    name: "people 5: misspelled names match existing people",
    setup: [park],
    messages: ["Ran into Jon and Jayne from next door"],
    check(state) {
      const problems = [];
      if (ofType(state, "person").length !== 4)
        problems.push(`people count is ${ofType(state, "person").length}`);
      const aliases = (p) =>
        (p?.props.aliases ?? []).map((a) => a.toLowerCase());
      if (!aliases(one(state, /^jo/i)).includes("jon"))
        problems.push("John has no Jon alias");
      if (!aliases(one(state, /^ja/i)).includes("jayne"))
        problems.push("Jane has no Jayne alias");
      return problems;
    },
  },
  {
    name: "people 6: a question about a person changes nothing",
    setup: [park],
    messages: [{ text: "What's Jane's husband's name?", ref: "Jane" }],
    check(state) {
      const problems = [];
      if (!/john/i.test(state.replies.at(-1).reply))
        problems.push("answer does not say John");
      if (wrote(state, -1)) problems.push("the question wrote something");
      return problems;
    },
  },
  {
    name: "people 7: two records for one person are merged",
    setup: [park, "Add a new person named John M., someone I met at the gym."],
    messages: ["Actually John M. and John Miller are the same person"],
    check(state) {
      const johns = named(state, /john/i);
      if (johns.length !== 1)
        return [`expected 1 John, got ${johns.map((j) => j.title).join(", ")}`];
      const names = [johns[0].title, ...johns[0].props.aliases].map((a) =>
        a.toLowerCase(),
      );
      return names.some((n) => /john m\.?$/.test(n))
        ? []
        : ["John M. was not kept as an alias"];
    },
  },
  {
    name: "people 8: something to do for a person is a task",
    setup: [areas, park],
    messages: ["Need to get a birthday present for Jude"],
    check(state) {
      const problems = [];
      const jude = one(state, /jude/i);
      const task = ofType(state, "task").find((t) =>
        /present|gift/i.test(t.title),
      );
      if (!task) problems.push("no present task");
      else if (!linked(state, task, "about", jude))
        problems.push("present task is not about Jude");
      if (ofType(state, "followup").length)
        problems.push("created a follow-up");
      return problems;
    },
  },
  {
    name: "people 9: a correction edits the existing entry",
    setup: [park],
    messages: ["Actually John went to Madison, not Platteville"],
    check(state) {
      const school = state.entries.filter((e) =>
        /madison|platteville/i.test(e.text),
      );
      if (school.length !== 1)
        return [`expected 1 school entry, got ${school.length}`];
      return /madison/i.test(school[0].text)
        ? []
        : [`school entry says "${school[0].text}"`];
    },
  },
];
