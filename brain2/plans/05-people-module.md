# 05 — People module

**Read first:** `../AGENTS.md`, `00-architecture.md`, `contracts.md` (Modules, View models, Fixtures).
**Depends on:** 03. Can run in parallel with 04 and 06.
**Touches only:** `src/modules/people/**`, `tests/people*.test.ts`, `tests/eval/people.mjs`.
**Goal:** remember who people are, how the user knows them, what is known about them, and what is going on in their lives.

## Types (`types.ts`)

**`person`** — statuses `["active", "archived"]`, closed `["archived"]`.

```ts
props: z.object({
  aliases: z.array(z.string().trim().min(1).max(80)).max(20).default([]),
  how_i_know: z.string().trim().max(160).default(""),
  birthday: z.string().regex(/^(\d{4}-)?\d{2}-\d{2}$/).nullable().default(null),  // "MM-DD" or "YYYY-MM-DD"
})
links: {
  member_of:  { to: ["group"], many: true },
  spouse_of:  { to: ["person"], many: false },
  child_of:   { to: ["person"], many: true },
  sibling_of: { to: ["person"], many: true },
}
searchText: aliases + how_i_know
```

`title` is the name as the user says it. `body` is a two-to-three sentence summary. `validate`: no self-links; `birthday` month 01–12 and day 01–31.

`describe`: "Someone in the user's life. title is their name; aliases holds nicknames and other spellings; how_i_know is one line; body is a short summary. Details go in entries (add_entry): undated for standing facts, dated for things that happened or were said."

**`group`** — statuses `["active", "archived"]`.

```ts
props: z.object({ kind: z.enum(["household", "circle"]) })
links: { member_of: { to: ["group"], many: true } }
```

`validate`: a household may be `member_of` circles only; a circle has no `member_of`.
`describe`: "A household (a family seen together, e.g. 'The Millers') or a circle (how the user knows a set of people, e.g. Neighbors, Church, Work). People and households are members of circles."

**`followup`** — statuses `["open", "resolved", "dropped"]`, closed `["resolved", "dropped"]`.

```ts
props: z.object({ since: z.iso.date() })
links: { about: { to: ["person", "group"], many: true } }
```

`validate`: at least one `about` target.
`describe`: "Something unresolved in someone's life to ask about next time, phrased as what to ask. Not a to-do for the user."

Relations are stored once (`spouse_of` on either person, `child_of` on the child). Views and `get` show both directions using backlinks.

## Instructions (`instructions.ts`)

Write guidance covering exactly these points:

1. Create a `person` for anyone named who is part of the user's life, including partners and children mentioned in passing. Not for public figures, companies, or one-off service contacts unless the user wants them remembered.
2. Match before creating. Check the roster by name, alias, household and circle. Dictated names are often misspelled: prefer an existing close match that fits the context and add the new spelling to `aliases`. If two existing people fit equally well, ask which.
3. A person without a known name is fine: use a descriptive title ("Neighbor with the red truck") and rename later.
4. A family mentioned together gets a household `group`; put its members in it. How the user knows them is a circle `group`: reuse an existing circle, create one when a new context appears.
5. Standing facts (where from, job, school, allergies) → `add_entry` with no date on that person. Things that happened or were said → `add_entry` dated with the message date unless another date is given. Something about a whole family goes on the household. Keep entries short and close to the user's words. One entry can attach to several people.
6. A correction edits the existing entry (`update_entry`) rather than adding a contradicting one.
7. Create a `followup` when something is unresolved and worth asking about later: a job search, an illness, a move, a pregnancy, a big trip. Not for ordinary remarks. When a later message gives the outcome, add the entry and mark the follow-up resolved.
8. Something the user must do involving a person is a `task` with `links.about`, not a follow-up.
9. Keep `body` to two or three sentences and refresh it when entries change the picture. Set `how_i_know` in one line.
10. When the user says two records are the same person, use `merge`.
11. Questions about people ("what's Jane's husband's name?", "what did John and I last talk about?") are answered from the roster, `get` and entries, and change nothing.

## Index (`index.ts`)

```ts
{
  people: [{ id, name, aliases, how_i_know, household, circles }],   // active; household/circles are titles
  groups: [{ id, title, kind }],
  followups: [{ id, title, about: string[] /* names */, since }],    // open
  truncated: boolean      // people capped at 300, most recently updated or mentioned in an entry first
}
```

## View (`view.ts`) → `PeopleView`

- `catch_up`: open follow-ups grouped by their first `about` target (a household shows under its title as the `PersonRow.name`), groups ordered by newest `since`.
- `birthdays`: active people whose next birthday is within 30 days of `today`, soonest first; handle the year boundary and Feb 29 (treat as Feb 28 in non-leap years). `date` is the next occurrence.
- `recent`: the 10 newest dated entries attached to any person or group; `people` lists the attached nodes' titles.
- `circles`: each active circle (by title) with its member households (each with its people) and its direct member people not already shown in one of those households. People and households in no circle go in a final `{ id: null, title: "Everyone else" }`. A person in two circles appears in both.

## Tests

- `tests/people-types.test.ts`: link rules; household/circle validation; birthday formats; follow-up needs `about`.
- `tests/people-view.test.ts` with the Miller fixtures: circle → household → people nesting; "Everyone else"; catch-up ordering; birthdays across December→January and Feb 29; recent entries show household entries.
- Store-level: `get`/`nodeDetail` for Jane includes entries attached to the Miller household.
- Integration (scripted model): the tool calls for the first evaluation scenario below produce four people, one household and one circle, and `GET /api/state` shows them nested.

## Paid evaluation (`tests/eval/people.mjs`)

1. "I met one of my neighbors at the park today, said her name was Jane. Husband's name was John. They have two little boys, Jude and Jonah – John went to Platteville for school." → four people; a household containing all four; the household in a Neighbors circle; Jane `spouse_of` John (either direction); both boys `child_of` both parents; an undated entry about Platteville on John only; a dated entry about meeting at the park.
2. "Saw Jane + family at the park again today, said they're done having kids" → one dated entry on the household (or on Jane and John); no new nodes.
3. "John said he's interviewing for a new job" → dated entry on John and an open follow-up about John. Then "John got the job at Acme" → entry, follow-up resolved.
4. Add Jane Okafor from work. Then "Jane said she's moving" with no other clue → one clarifying question, no write. With a ref to Jane Okafor → written to her.
5. "Ran into Jon and Jayne from next door" → matched to John and Jane Miller, aliases added, no new people.
6. "What's Jane's husband's name?" (ref: Jane Miller) → "John", no writes.
7. Create a duplicate "John M." then "John M. and John Miller are the same person" → merged, one John remains with the alias.
8. "Need to get a birthday present for Jude" → a `task` with `about` Jude, not a follow-up.
9. "Actually John went to Madison, not Platteville" → the existing entry is edited; no second school entry.

🧑 Ask George before the first paid run.

## Done when

`check`, `test`, `dryrun` pass; the evaluation passes or failures are listed for George; the stub in `src/modules/people/index.ts` is fully replaced.
