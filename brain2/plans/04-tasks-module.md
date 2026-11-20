# 04 — Tasks module

**Read first:** `../AGENTS.md`, `00-architecture.md`, `contracts.md` (Modules, View models, Fixtures).
**Depends on:** 03. Can run in parallel with 05 and 06.
**Touches only:** `src/modules/tasks/**`, `tests/tasks*.test.ts`, `tests/eval/tasks.mjs`.
**Goal:** everything brain does today, on the new core.

Reference: `../brain/src/domain.ts` (item fields), `../brain/src/prompt.ts` (task guidance), `../brain/src/dashboard.ts` (`buildDashboard`, `subtitle`, `topLevel`), `../brain/tests/dashboard.test.ts`, `../brain/tests/scenarios.md`, `../brain/scripts/evaluate-agent.mjs`.

## Types (`types.ts`)

**`task`** — statuses `["open", "waiting", "someday", "done", "dropped"]`, closed `["done", "dropped"]`.

```ts
props: z.object({
  priority: z.enum(["high", "normal", "low"]).default("normal"),
  due_date: z.iso.date().nullable().default(null),
  due_label: z.string().trim().max(40).nullable().default(null),
})
links: {
  parent:  { to: ["task"], many: false },
  in_area: { to: ["area"], many: false },
  about:   { to: ["person", "group", "note"], many: true },
}
```

`validate`:
- `parent` must not create a cycle (walk up; also reject self).
- `due_label`, if set, must not match `/\b(today|tonight|tomorrow|yesterday|this|next|weekend|now|soon)\b/i`. Error: "due_label must stay true as time passes; put relative timing in due_date instead".
- A non-closed task with no parent, or whose parent is closed, must have `in_area`. Error: "Top-level tasks need an area (links.in_area)".

`describe`: "Something the user needs to do, decide, or wait on. Always resolvable: it can be done or dropped. body explains what and why. For waiting tasks due_date is the day to follow up."

**`area`** — statuses `["active", "archived"]`, closed `["archived"]`; props `{}`; no links. `describe`: "A broad, stable category of life that top-level tasks are grouped under on the dashboard, such as Home or Personal."

## Instructions (`instructions.ts`)

Start from brain's `prompt.ts` and keep its substance for: open loops only; writing useful `body` notes; reusing existing tasks; parents and sub-tasks; partial completion; priorities; the date rules (source timestamp, waiting follow-ups, not inventing deadlines, sub-tasks inheriting timing). Change:

- Remove everything about context records, `core`, search-before-every-message, IDs, mutation IDs and `expected_version` mechanics (covered by core rules).
- Areas: "Every top-level task needs an area. Choose the best existing area from the index; create a new area only when none fits and the topic will hold several tasks. Group by what the task is about, not why it is happening. Keep an explicit choice by the user."
- Timing: "Relative timing (today, tonight, this weekend, next week) becomes a due_date only. Use due_label only for approximate phrases that stay true, such as 'Mid-November' or 'Before Christmas', alongside a sensible due_date."
- People: "If the task concerns someone in the people roster, add them under links.about."
- Facts that are not to-dos go to a note, the profile, or an entry on a person.

## Index (`index.ts`)

```ts
{
  areas: [{ id, title }],                      // active
  tasks: [{ id, title, status, priority, due_date, parent, area }],   // non-closed, updated_at DESC
  truncated: boolean                           // true if more than 400 tasks; list the newest 400
}
```

## View (`view.ts`) → `TasksView`

Port `buildDashboard` with these differences:

- No saved plan. A top-level task's area is its `in_area` target; if missing or archived, it goes in a synthetic area `{ id: "other", title: "Other" }`.
- Area order: active areas by `created_at`, then "Other". Empty areas omitted.
- "Top level" = non-closed task with no non-closed parent (brain's `topLevel`).
- Priorities rule unchanged: status `open` and (`priority` high or due within 7 days), or status `waiting` with `due_date <= today`. Children `[]`.
- Sort unchanged: someday last, then due date, then priority, then title.
- `subtitle`: `due_label` if set; otherwise brain's `subtitle()` logic on `due_date` and status.

`today` is passed in; do not read the clock inside the view.

## Tests

- `tests/tasks-view.test.ts`: port every case in brain's `dashboard.test.ts` that still applies (priorities, nesting depth, sort order, subtitles, closed parent promotes children). Add: missing area → "Other"; archived area → "Other".
- `tests/tasks-types.test.ts`: cycle rejected; relative label rejected; "Mid-November" accepted; top-level without area rejected; sub-task without area accepted; `about` to a `note` accepted.
- Integration (scripted model): `create_task` with a parent and area renders in `GET /api/state` under the right area.

## Paid evaluation

Add `tests/eval/tasks.mjs` for the harness from plan 03 (isolated local object, fictional fixtures from `contracts.md`). Rewrite the model-behaviour scenarios in `../brain/tests/scenarios.md` (1–6 and 10; 7–9 are covered by integration tests) with the fictional cast, and add:

11. "Remind me to call the plumber this weekend" → open task, `due_date` on the coming Saturday or Sunday, `due_label` null.
12. "I need to repaint the fence" with areas Home/Personal present → `in_area` Home; no new area.
13. With John Miller in the roster: "Text John back about Saturday" → task with `about` John.
14. "Done: Buy seeds" with ref to that task → that task done, parent untouched.

🧑 Running the paid evaluation costs money; ask George before the first run.

## Done when

`check`, `test`, `dryrun` pass; the evaluation passes or its failures are listed for George; the stub in `src/modules/tasks/index.ts` is fully replaced.
