# 07 — Migration and cutover

**Read first:** `../AGENTS.md`, `00-architecture.md`, `contracts.md` (Import format, Records).
**Depends on:** 01–06 all landed and deployed.
**Goal:** move tasks, areas and context from brain into brain2, verify, switch over, retire brain. Chat history is not migrated.

This plan handles real personal data. Everything real stays in `brain2/.cloudflare/` (gitignored). Nothing real goes in code, tests, commit messages or PR descriptions. An agent can do Part A alone; Parts B and C are done with George present.

## Part A — tooling (agent, fictional data only)

### A1. Transform script: `scripts/migrate.mjs`

`node scripts/migrate.mjs <export.json> <import.json>`: reads a brain export, writes an `ImportFile`, prints a summary. Pure and deterministic (no clock, no randomness; same input → same output). Put the logic in `scripts/migrate-lib.mjs` so tests can import it.

Input (brain's `GET /api/export`, see `exportData()` in `../brain/src/store.ts`):

```ts
{ format: "brain-export", version: 1, exported_at, timezone,
  tables: {
    brain_records: { id, kind: "item" | "context", data: string /* JSON */, version, updated_at, source_id }[],
    brain_areas: { id, title }[],
    brain_dashboard: { plan: string | null /* JSON { groups: [{ area_id, title, item_ids }] } */, ... }[],
    ...others ignored
  } }
```

Item `data` fields: `title, notes, status, priority, parent_id, area_id, due_date, target, context_ids` (see `../brain/src/domain.ts`). Context `data` fields: `title, body, evidence, core`.

Mapping:

| brain | brain2 |
|---|---|
| Area `{id, title}` | Node `id: "area_" + id`, type `area`, status `active`. |
| Item | Node with the same `id`, type `task`. `title`; `body` = `notes`; `status`, `priority`, `due_date` copied; `updated_at` copied. |
| `target` | `due_label`, unless empty or it matches the relative-word pattern from plan 04, in which case `null`. Truncate to 40 chars. |
| `parent_id` | `links.parent`, if the parent exists in the export; otherwise dropped and reported. |
| Area for an item | First match: its `area_id`; else the group containing it in the saved dashboard plan; else none. Only emitted as `links.in_area` when the item is top-level (no parent, or parent closed) — for a non-closed top-level item with no match, create and use area `area_other` ("Other"). Closed items with no match get no area. |
| `context_ids` | `links.about` to the migrated notes that exist. |
| Context | Node with the same `id`, type `note`, status `active`; `body` = `body + "\n\nSource: " + evidence`. |
| Captures, changes, Pi tables, deliveries | Not migrated. |

Fail with a clear message if the format or version is unexpected, an item has an unknown status or priority, or two records share an ID. `entries` is `[]`.

Summary printed (counts only, no titles): nodes by type and status, labels dropped, parents dropped, items sent to "Other", context links dropped.

Tests (`tests/migrate.test.ts`, fictional export fixture): each mapping row above; determinism; the output passes `store.importAll` into an empty store with the real registry; task counts by status equal the input's.

### A2. Import route and page

- `POST /api/admin/import?dry_run=1|0` — body is an `ImportFile` (limit 5 MB; raise the size guard for this route only). Rejects service tokens (browser identity only). Creates a hidden capture `import-<timestamp>` with source `import`, then calls `store.importAll`. With `dry_run=1`, run the same code inside a transaction that is rolled back and return `{ ok, nodes, entries, errors: string[] }`. `importAll` refuses if any incoming node ID already exists (except `profile`, updated in place), so importing the same file twice is rejected while the people seed (B3) can follow the main file.
- `GET /admin/import` — a minimal page (same shell and styles): file input, "Check" button (dry run, shows the counts or errors), "Import" button enabled only after a clean check. Its script is part of the client bundle behind a path check.
- Tests: service identity → 403; dry run writes nothing; invalid node → whole import rejected; second import of the same file → refused.

### A3. Comparison helper: `scripts/compare-migration.mjs`

`node scripts/compare-migration.mjs <export.json> <state.json>` where `state.json` is a saved `GET /api/state` response from brain2. Prints OK/mismatch (counts and IDs only) for: number of open top-level tasks; the set of child IDs under each parent; the set of task IDs in Priorities versus brain's rule applied to the export.

## Part B — rehearsal (🧑 George at the keyboard, agent assisting)

1. 🧑 Signed in to brain, download `/api/export` and save it as `brain2/.cloudflare/brain-export.json`. (This is the supported path. The `cf durable-objects namespaces query` command used by older brain scripts exists only in cf `1.0.0-beta.5`.)
2. Run the transform → `brain2/.cloudflare/import.json`. Read the summary together.
3. **People seed (optional).** In a local session, the agent reads the export and drafts `brain2/.cloudflare/people-seed.json` (an `ImportFile`): `person` and `group` nodes for family and friends mentioned in brain's context records and task titles, their relations, a few undated fact entries, and a replacement `profile` body. 🧑 George reviews and edits the file by hand. `about` links from existing tasks to these people are not part of the seed; ask brain2 in chat afterwards ("link my existing tasks to the people they mention"). Skip this step to introduce people through chat instead.
4. `pnpm run dev` with a fresh local database → open `/admin/import` → check and import `import.json`, then `people-seed.json`.
5. Save `/api/state` to `.cloudflare/state.json`, run the comparison helper, and look at the Tasks tab next to brain's dashboard. 🧑 George asks brain2 a few questions he would ask brain.
6. Fix the transform (with fictional test cases for whatever was wrong) and repeat from step 2 with a fresh local database until clean.

## Part C — cutover (🧑 George)

1. Stop sending messages to brain.
2. Re-download the export and re-run the transform (covers anything added since the rehearsal). If a people seed is used, re-check it still applies.
3. On production brain2 (must be empty): `/admin/import` → check → import. Then the people seed.
4. Run the comparison helper against production `/api/state`.
5. Edit the Apple Shortcut: URL `https://brain2.<workers subdomain>/api/messages`, headers `CF-Access-Client-Id` / `CF-Access-Client-Secret` from the brain2 service token (plan 01 step 9).
6. Send one message from the Shortcut and one from chat; confirm both appear with replies.
7. Agent: remove the import route, page and comparison helper in a follow-up PR. Update `AGENTS.md` status and `README.md`.

**Rollback** (any time before Part D): point the Shortcut back at brain. brain is untouched. Anything said only to brain2 would need to be re-sent.

## Part D — retire brain (🧑 George, two weeks later)

1. Move the final export file somewhere safe outside the repo.
2. Delete: the `brain` Worker, its Access application and Shortcuts service token, the `brain-memory` Vectorize index, its Workers Builds trigger.
3. Remove `brain/` from the repo and from the root `CLAUDE.md` / `AGENTS.md`.
4. Optional: renaming `brain2` to `brain` creates a new Durable Object namespace, so it means repeating export and import (brain2 would need its own export route first). Only worth it if the name matters.

## Done when

brain2 holds every task and note from brain, the Shortcut posts to brain2, and the import route no longer exists.
