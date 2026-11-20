import { z } from "zod";
import type { NodeType } from "../types";

export const person: NodeType = {
  props: z.object({
    aliases: z.array(z.string().trim().min(1).max(80)).max(20).default([]),
    how_i_know: z.string().trim().max(160).default(""),
    // "MM-DD", or "YYYY-MM-DD" when the year is known.
    birthday: z
      .string()
      .regex(/^(\d{4}-)?\d{2}-\d{2}$/, "Use MM-DD or YYYY-MM-DD")
      .nullable()
      .default(null),
  }),
  statuses: ["active", "archived"],
  closed: ["archived"],
  links: {
    member_of: { to: ["group"], many: true },
    spouse_of: { to: ["person"], many: false },
    child_of: { to: ["person"], many: true },
    sibling_of: { to: ["person"], many: true },
  },
  describe:
    "Someone in the user's life. title is their name; aliases holds nicknames and other spellings; how_i_know is one line; body is a short summary. Details go in entries (add_entry): undated for standing facts, dated for things that happened or were said.",
  searchText: (node) =>
    [...((node.props.aliases as string[]) ?? []), node.props.how_i_know]
      .filter(Boolean)
      .join("\n"),
  validate(node) {
    const birthday = node.props.birthday as string | null;
    if (birthday) {
      const [month, day] = birthday.slice(-5).split("-").map(Number);
      if (month < 1 || month > 12 || day < 1 || day > 31)
        throw new Error(
          "birthday must be a real month (01-12) and day (01-31)",
        );
    }
  },
};

export const group: NodeType = {
  props: z.object({ kind: z.enum(["household", "circle"]) }),
  statuses: ["active", "archived"],
  closed: ["archived"],
  links: { member_of: { to: ["group"], many: true } },
  describe:
    "A household (a family seen together, e.g. 'The Millers') or a circle (how the user knows a set of people, e.g. Neighbors, Church, Work). People and households are members of circles.",
  validate(node, store) {
    const parents = node.links.member_of ?? [];
    if (node.props.kind === "circle" && parents.length)
      throw new Error("A circle cannot be a member of another group");
    for (const id of parents)
      if (store.getNode(id)?.props.kind !== "circle")
        throw new Error("A household can only be a member of circles");
  },
};

export const followup: NodeType = {
  props: z.object({
    since: z.iso.date().describe("The day this came up (YYYY-MM-DD)"),
  }),
  statuses: ["open", "resolved", "dropped"],
  closed: ["resolved", "dropped"],
  links: { about: { to: ["person", "group"], many: true } },
  describe:
    "Something unresolved in someone's life to ask about next time, phrased as what to ask. Not a to-do for the user.",
  validate(node) {
    if (!node.links.about?.length)
      throw new Error("A follow-up must be about someone (links.about)");
  },
};
