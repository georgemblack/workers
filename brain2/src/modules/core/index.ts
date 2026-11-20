import type { Module } from "../types";
import { instructions } from "./instructions";
import { note, profile } from "./types";

export const core: Module = {
  id: "core",
  title: null,
  types: { note, profile },
  instructions,
  index: (store) => ({
    notes: store
      .listNodes({ type: "note", status: ["active"] })
      .slice(0, 100)
      .map((node) => ({ id: node.id, title: node.title })),
  }),
};
