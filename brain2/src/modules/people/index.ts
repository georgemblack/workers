import type { Module } from "../types";
import { instructions } from "./instructions";
import { followup, group, person } from "./types";
import { activeGroups, activePeople, view } from "./view";

const limit = 300;

export const people: Module = {
  id: "people",
  title: "People",
  types: { person, group, followup },
  instructions,
  // The roster the model matches names against, most recently active first.
  index: (store) => {
    const groups = activeGroups(store);
    const groupById = new Map(groups.map((g) => [g.id, g]));
    const lastSeen = (id: string, updated: string) => {
      const latest = store.entriesFor([id], { limit: 1 });
      return [
        updated,
        ...[...latest.facts, ...latest.timeline].map((e) => e.created_at),
      ]
        .sort()
        .at(-1)!;
    };
    const roster = activePeople(store)
      .map((p) => ({ p, seen: lastSeen(p.id, p.updated_at) }))
      .sort((a, b) => b.seen.localeCompare(a.seen))
      .map(({ p }) => p);
    return {
      people: roster.slice(0, limit).map((p) => {
        const memberOf = (p.links.member_of ?? [])
          .map((id) => groupById.get(id))
          .filter((g) => g !== undefined);
        const household = memberOf.find((g) => g.props.kind === "household");
        const circles = new Set(
          [
            ...memberOf,
            ...(household?.links.member_of ?? []).map((id) =>
              groupById.get(id),
            ),
          ]
            .filter((g) => g?.props.kind === "circle")
            .map((g) => g!.title),
        );
        return {
          id: p.id,
          name: p.title,
          aliases: p.props.aliases,
          how_i_know: p.props.how_i_know,
          household: household?.title ?? null,
          circles: [...circles],
        };
      }),
      groups: groups.map((g) => ({
        id: g.id,
        title: g.title,
        kind: g.props.kind,
      })),
      followups: store
        .listNodes({ type: "followup", status: ["open"] })
        .map((f) => ({
          id: f.id,
          title: f.title,
          about: (f.links.about ?? []).map(
            (id) => store.getNode(id)?.title ?? id,
          ),
          since: f.props.since,
        })),
      truncated: roster.length > limit,
    };
  },
  view,
};
