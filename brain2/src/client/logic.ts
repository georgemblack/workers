// Pure helpers for the browser app, kept apart from components so they can be
// tested without a DOM.
import type { PersonRow, StateResponse } from "../shared/contracts";

export type Ref = { id: string; title: string };
export const maxRefs = 5;

/** Poll fast while a reply is being worked on, slowly otherwise. */
export function pollInterval(state: StateResponse | null) {
  return state?.messages.some(
    (m) => m.status === "queued" || m.status === "running",
  )
    ? 2_000
    : 10_000;
}

/** Adds a reference unless it is already there or the list is full. */
export function addRef(refs: Ref[], ref: Ref) {
  if (refs.some((r) => r.id === ref.id) || refs.length >= maxRefs) return refs;
  return [...refs, ref];
}
export function removeRef(refs: Ref[], id: string) {
  return refs.filter((r) => r.id !== id);
}

/** References sent with a message: the open person first, then the chips. */
export function outgoingRefs(refs: Ref[], open: Ref | null) {
  const list = open ? [open, ...refs.filter((r) => r.id !== open.id)] : refs;
  return list.slice(0, maxRefs).map((r) => r.id);
}

/** People whose name, alias or "how I know them" contains the query. */
export function filterPeople(people: PersonRow[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return people;
  return people.filter((p) =>
    [p.name, p.subtitle, ...p.aliases].some((value) =>
      value.toLowerCase().includes(q),
    ),
  );
}

export type Pending = { id: string; text: string; refs: string[] };

/**
 * The message to send. Retrying the same text reuses the saved ID, so a send
 * that reached the server but lost its response is not processed twice.
 */
export function pendingMessage(
  saved: Pending | null,
  text: string,
  refs: string[],
  newId: () => string,
): Pending {
  return saved?.text === text
    ? { ...saved, refs }
    : { id: newId(), text, refs };
}
