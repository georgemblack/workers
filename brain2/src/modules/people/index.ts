import type { Module } from "../types";
import type { PeopleView } from "../../shared/contracts";

// Stub until plan 05 adds the person, group and followup types.
export const people: Module = {
  id: "people",
  title: "People",
  types: {},
  instructions: "",
  index: () => null,
  view: (): PeopleView => ({
    catch_up: [],
    birthdays: [],
    recent: [],
    circles: [],
  }),
};
