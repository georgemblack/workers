import type { Store } from "../../store";
import type { NodeRecord, Row, TasksView } from "../../shared/contracts";
import { closedTaskStatuses, taskStatuses } from "./types";

type Task = NodeRecord & {
  props: {
    priority: "high" | "normal" | "low";
    due_date: string | null;
    due_label: string | null;
  };
};

const daysBetween = (from: string, to: string) =>
  Math.round((Date.parse(to) - Date.parse(from)) / 86400000);
const parentOf = (task: NodeRecord) => task.links.parent?.[0];

/** Open tasks, i.e. everything not done or dropped. */
export function openTasks(store: Store) {
  return store.listNodes({
    type: "task",
    status: taskStatuses.filter((s) => !closedTaskStatuses.includes(s)),
  }) as Task[];
}

/** Open tasks with no open parent; everything else nests beneath one. */
export function topLevel(tasks: NodeRecord[]) {
  const open = new Set(tasks.map((t) => t.id));
  return tasks.filter((t) => !open.has(parentOf(t) ?? ""));
}

/** A short, readable timing line such as "By Nov 30" or "Mid-November". */
export function subtitle(task: Task, today: string) {
  const { due_date, due_label } = task.props;
  if (due_label) return due_label;
  if (!due_date) return "";
  const days = daysBetween(today, due_date);
  const date = new Date(due_date + "T12:00:00Z").toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: days > 1 && days < 7 ? "short" : undefined,
    month: "short",
    day: "numeric",
    year: due_date.slice(0, 4) === today.slice(0, 4) ? undefined : "numeric",
  });
  if (task.status === "waiting")
    return days <= 0 ? "Follow up now" : `Follow up ${date}`;
  if (days < 0) return `Overdue since ${date}`;
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  return `By ${date}`;
}

const rank = { high: 0, normal: 1, low: 2 };
// Someday work sinks to the bottom; otherwise sooner, then more important.
const compare = (a: Task, b: Task) =>
  Number(a.status === "someday") - Number(b.status === "someday") ||
  (a.props.due_date || "9999").localeCompare(b.props.due_date || "9999") ||
  rank[a.props.priority] - rank[b.props.priority] ||
  a.title.localeCompare(b.title);

export function view(store: Store, today: string): TasksView {
  const open = openTasks(store);
  const childrenOf = new Map<string, Task[]>();
  for (const task of open) {
    const parent = parentOf(task);
    if (parent)
      childrenOf.set(parent, [...(childrenOf.get(parent) ?? []), task]);
  }
  const tree = (task: Task, seen = new Set<string>()): Row => {
    seen.add(task.id);
    return {
      id: task.id,
      title: task.title,
      subtitle: subtitle(task, today),
      children: (childrenOf.get(task.id) ?? [])
        .filter((child) => !seen.has(child.id))
        .sort(compare)
        .map((child) => tree(child, seen)),
    };
  };

  // High priority, due within a week, or a follow-up that has come due.
  const soon = (task: Task) =>
    !!task.props.due_date && daysBetween(today, task.props.due_date) <= 7;
  const priorities = open
    .filter((task) =>
      task.status === "waiting"
        ? !!task.props.due_date && task.props.due_date <= today
        : task.status === "open" &&
          (task.props.priority === "high" || soon(task)),
    )
    .sort(compare)
    .map((task) => ({ ...tree(task), children: [] }));

  // Tasks with no usable area go to "Other": the user's own area of that
  // name if there is one, otherwise a stand-in. Either way it comes last.
  const areas = store.listNodes({
    type: "area",
    status: ["active"],
    order: "created",
  });
  const other =
    areas.find((a) => a.title.trim().toLowerCase() === "other") ??
    ({ id: "other", title: "Other" } as const);
  const order = [...areas.filter((a) => a.id !== other.id), other];
  const known = new Set(areas.map((a) => a.id));
  const areaFor = (task: Task) => {
    const id = task.links.in_area?.[0];
    return id && known.has(id) ? id : other.id;
  };
  const roots = topLevel(open) as Task[];
  return {
    priorities,
    areas: order.flatMap((area) => {
      const items = roots.filter((t) => areaFor(t) === area.id).sort(compare);
      return items.length
        ? [{ id: area.id, title: area.title, items: items.map((t) => tree(t)) }]
        : [];
    }),
  };
}
