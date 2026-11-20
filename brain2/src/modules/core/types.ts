import { z } from "zod";
import type { NodeType } from "../types";

export const note: NodeType = {
  props: z.object({}),
  statuses: ["active", "archived"],
  closed: ["archived"],
  links: {},
  describe:
    "A reference fact or piece of background worth keeping, with a title and body. Not a to-do.",
};

// The single "About me" record. The store creates it; the model only updates it.
export const profile: NodeType = {
  props: z.object({}),
  statuses: ["active"],
  links: {},
  describe:
    "The user's profile: who they are, household basics and standing preferences. Not tasks or one-off facts.",
};
