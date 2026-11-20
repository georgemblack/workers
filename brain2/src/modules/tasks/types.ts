import { z } from "zod";
import type { NodeType } from "../types";

export const taskStatuses = [
  "open",
  "waiting",
  "someday",
  "done",
  "dropped",
] as const;
export const closedTaskStatuses = ["done", "dropped"];

// Words whose meaning changes as days pass. Those belong in due_date only.
const relative =
  /\b(today|tonight|tomorrow|yesterday|this|next|weekend|now|soon)\b/i;

export const task: NodeType = {
  props: z.object({
    priority: z.enum(["high", "normal", "low"]).default("normal"),
    due_date: z.iso.date().nullable().default(null),
    due_label: z.string().trim().max(40).nullable().default(null),
  }),
  statuses: taskStatuses,
  closed: closedTaskStatuses,
  links: {
    parent: { to: ["task"], many: false },
    in_area: { to: ["area"], many: false },
    about: { to: ["person", "group", "note"], many: true },
  },
  describe:
    "Something the user needs to do, decide, or wait on. Always resolvable: it can be done or dropped. body explains what and why. For waiting tasks due_date is the day to follow up.",
  validate(node, store) {
    // Walk up the parents; reaching this task again would make a loop.
    let parentId: string | undefined = node.links.parent?.[0];
    const seen = new Set([node.id]);
    while (parentId) {
      if (seen.has(parentId))
        throw new Error("A task cannot be inside its own sub-tasks");
      seen.add(parentId);
      parentId = store.getNode(parentId)?.links.parent?.[0];
    }
    const label = node.props.due_label as string | null;
    if (label && relative.test(label))
      throw new Error(
        "due_label must stay true as time passes; put relative timing in due_date instead",
      );
    if (closedTaskStatuses.includes(node.status)) return;
    const parent = node.links.parent?.[0]
      ? store.getNode(node.links.parent[0])
      : null;
    const topLevel = !parent || closedTaskStatuses.includes(parent.status);
    if (topLevel && !node.links.in_area?.length)
      throw new Error("Top-level tasks need an area (links.in_area)");
  },
};

export const area: NodeType = {
  props: z.object({}),
  statuses: ["active", "archived"],
  closed: ["archived"],
  links: {},
  describe:
    "A broad, stable category of life that top-level tasks are grouped under on the dashboard, such as Home or Personal.",
};
