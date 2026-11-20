import type { Module } from "../types";
import { instructions } from "./instructions";
import { area, task } from "./types";
import { openTasks, view } from "./view";

const limit = 400;

export const tasks: Module = {
  id: "tasks",
  title: "Tasks",
  types: { task, area },
  instructions,
  // Compact list of areas and open tasks for the prompt, newest change first.
  index: (store) => {
    const open = openTasks(store);
    return {
      areas: store
        .listNodes({ type: "area", status: ["active"], order: "created" })
        .map((a) => ({ id: a.id, title: a.title })),
      tasks: open.slice(0, limit).map((t) => ({
        id: t.id,
        title: t.title,
        status: t.status,
        priority: t.props.priority,
        due_date: t.props.due_date,
        parent: t.links.parent?.[0] ?? null,
        area: t.links.in_area?.[0] ?? null,
      })),
      truncated: open.length > limit,
    };
  },
  view,
};
