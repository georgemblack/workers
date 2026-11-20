// Paid scenarios for the tasks module. Fictional data only (see the fixtures
// in plans/contracts.md). Each scenario starts from an empty store.
const areas =
  "Set up three task areas: Home, Personal, and Other. Nothing else for now.";
const taskList = (state) => state.nodes.filter((n) => n.type === "task");
const isOpen = (t) => !["done", "dropped"].includes(t.status);
const matching = (state, pattern) =>
  taskList(state).filter((t) => pattern.test(t.title));
const linksFrom = (state, node, rel) =>
  state.links
    .filter((l) => l.from_id === node.id && l.rel === rel)
    .map((l) => l.to_id);
const byId = (state, id) => state.nodes.find((n) => n.id === id);

/** Today's date in the user's timezone, as YYYY-MM-DD. */
function today() {
  return new Date().toLocaleDateString("en-CA", {
    timeZone: "America/Chicago",
  });
}
const addDays = (date, days) =>
  new Date(Date.parse(date + "T12:00:00Z") + days * 86400000)
    .toISOString()
    .slice(0, 10);

export const scenarios = [
  {
    name: "tasks 1: a sub-task shares its parent's timing",
    setup: [
      areas,
      "We're planning garden beds for spring. I need to get supplies ready beforehand.",
    ],
    messages: ["I need to buy seeds."],
    check(state) {
      const problems = [];
      const seeds = matching(state, /seed/i).filter(isOpen);
      if (seeds.length !== 1)
        return [`expected 1 open seeds task, got ${seeds.length}`];
      if (!linksFrom(state, seeds[0], "parent").length)
        problems.push("seeds task has no parent");
      if (seeds[0].props.due_date)
        problems.push(
          `seeds task has an invented due date ${seeds[0].props.due_date}`,
        );
      return problems;
    },
  },
  {
    name: "tasks 2: a corrected date replaces the old one",
    setup: [
      areas,
      "My passport renewal appointment is on January 12, 2027 at 9am.",
    ],
    messages: ["Actually the passport appointment moved to January 19, 2027."],
    check(state) {
      const open = matching(state, /passport/i).filter(isOpen);
      if (open.length !== 1)
        return [`expected 1 open passport task, got ${open.length}`];
      return open[0].props.due_date === "2027-01-19"
        ? []
        : [`due date is ${open[0].props.due_date}, not 2027-01-19`];
    },
  },
  {
    name: "tasks 3: partial completion keeps the follow-up open",
    setup: [
      areas,
      "For the fence I need to buy paint, brushes, and drop cloths.",
    ],
    messages: [
      "I bought the paint and brushes, so check those off. I still need to return the extra drop cloths to the store.",
    ],
    check(state) {
      const problems = [];
      const open = taskList(state).filter(isOpen);
      if (!open.some((t) => /return/i.test(t.title) || /return/i.test(t.body)))
        problems.push("no open task to return the drop cloths");
      for (const t of open)
        if (/paint|brush/i.test(t.title) && !/drop|return|fence/i.test(t.title))
          problems.push(`"${t.title}" is still open`);
      return problems;
    },
  },
  {
    name: "tasks 4: lowering priority keeps the task open",
    setup: [
      areas,
      "High priority: find a sitter for Jude and Jonah for the night of the school concert.",
    ],
    messages: [
      "We found a sitter for Jude. Jonah still needs one, but it's less urgent now, so lower the priority.",
    ],
    check(state) {
      const open = matching(state, /sitter|jonah|babysit/i).filter(isOpen);
      if (!open.length) return ["no open sitter task remains"];
      return open.some((t) => t.props.priority === "high")
        ? ["an open sitter task is still high priority"]
        : [];
    },
  },
  {
    name: "tasks 5: completion with two follow-ups and no invented date",
    setup: [areas, "I need to fix the bike."],
    messages: [
      "I fixed the bike, but I need to pick up a new bell from the shop in a few weeks. I should also call the shop to thank them.",
    ],
    check(state) {
      const problems = [];
      const tasks = taskList(state);
      if (
        !tasks.some(
          (t) =>
            /fix/i.test(t.title) &&
            /bike/i.test(t.title) &&
            t.status === "done",
        )
      )
        problems.push("fix bike is not done");
      const bell = tasks.find((t) => isOpen(t) && /bell/i.test(t.title));
      if (!bell) problems.push("no open bell pickup task");
      else if (
        bell.props.due_date &&
        bell.props.due_date < addDays(today(), 10)
      )
        problems.push(
          `bell pickup has a too-precise near date ${bell.props.due_date}`,
        );
      if (!tasks.some((t) => isOpen(t) && /call|thank/i.test(t.title)))
        problems.push("no open task to call the shop");
      return problems;
    },
  },
  {
    name: "tasks 6: a question changes nothing",
    setup: [areas, `I need to renew my passport by ${addDays(today(), 5)}.`],
    messages: ["Anything on my list about the passport?"],
    check(state) {
      const problems = [];
      if (taskList(state).length !== 1)
        problems.push(`expected 1 task, got ${taskList(state).length}`);
      if (!/passport/i.test(state.replies.at(-1).reply))
        problems.push("answer does not mention the passport");
      return problems;
    },
  },
  {
    name: "tasks 10: a dropped idea stays dropped",
    setup: [areas],
    messages: [
      "Someday I might build a treehouse, low priority.",
      "Actually drop the treehouse idea.",
      "Did I have anything about a treehouse?",
    ],
    check(state) {
      const treehouse = matching(state, /treehouse/i);
      if (!treehouse.length) return ["treehouse task is gone"];
      return treehouse.every((t) => t.status === "dropped")
        ? []
        : [`treehouse status is ${treehouse.map((t) => t.status).join(", ")}`];
    },
  },
  {
    name: "tasks 11: this weekend becomes a date, not a label",
    setup: [areas],
    messages: ["Remind me to call the plumber this weekend."],
    check(state) {
      const plumber = matching(state, /plumber/i).filter(isOpen);
      if (plumber.length !== 1)
        return [`expected 1 open plumber task, got ${plumber.length}`];
      const now = today();
      const weekday = new Date(now + "T12:00:00Z").getUTCDay(); // 0 = Sunday
      const saturday =
        weekday === 0 ? addDays(now, -1) : addDays(now, 6 - weekday);
      const allowed = [saturday, addDays(saturday, 1)].filter((d) => d >= now);
      const problems = [];
      if (!allowed.includes(plumber[0].props.due_date))
        problems.push(
          `due date ${plumber[0].props.due_date} is not this weekend (${allowed.join(" or ")})`,
        );
      if (plumber[0].props.due_label)
        problems.push(`due_label is "${plumber[0].props.due_label}"`);
      return problems;
    },
  },
  {
    name: "tasks 12: a new task goes in the existing Home area",
    setup: [areas],
    messages: ["I need to repaint the fence."],
    check(state) {
      const problems = [];
      const fence = matching(state, /fence/i).filter(isOpen);
      if (fence.length !== 1)
        return [`expected 1 open fence task, got ${fence.length}`];
      const area = byId(state, linksFrom(state, fence[0], "in_area")[0]);
      if (area?.title !== "Home")
        problems.push(`fence task is in ${area?.title ?? "no area"}`);
      const count = state.nodes.filter((n) => n.type === "area").length;
      if (count !== 3) problems.push(`expected 3 areas, got ${count}`);
      return problems;
    },
  },
  {
    name: "tasks 13: a task about someone in the roster links to them",
    setup: [
      areas,
      "John Miller is our neighbor; he lives next door with his wife Jane.",
    ],
    messages: ["Text John back about Saturday"],
    check(state) {
      const john = state.nodes.find(
        (n) => n.type === "person" && /john/i.test(n.title),
      );
      const task = matching(state, /text|john/i).find(isOpen);
      if (!task) return ["no open task to text John"];
      return linksFrom(state, task, "about").includes(john?.id)
        ? []
        : ["task is not about John"];
    },
  },
  {
    name: "tasks 14: a tapped task is completed, its parent untouched",
    setup: [
      areas,
      "We're planning garden beds. I need to buy seeds and build frames for them.",
    ],
    messages: [{ text: "Done: Buy seeds", ref: "seeds" }],
    check(state) {
      const problems = [];
      const seeds = matching(state, /seed/i);
      if (!seeds.length || seeds.some((t) => t.status !== "done"))
        problems.push("seeds task is not done");
      const frames = matching(state, /frame/i);
      if (!frames.length || frames.some((t) => !isOpen(t)))
        problems.push("frames task was closed");
      const parents = taskList(state).filter(
        (t) => /garden/i.test(t.title) && !/seed|frame/i.test(t.title),
      );
      if (parents.some((t) => !isOpen(t)))
        problems.push("garden parent was closed");
      return problems;
    },
  },
];
