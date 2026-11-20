import type { Module } from "../types";
import type { TasksView } from "../../shared/contracts";

// Stub until plan 04 adds the task and area types.
export const tasks: Module = {
  id: "tasks",
  title: "Tasks",
  types: {},
  instructions: "",
  index: () => null,
  view: (): TasksView => ({ priorities: [], areas: [] }),
};
