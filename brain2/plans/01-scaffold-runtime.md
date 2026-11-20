# 01 — Scaffold and runtime

**Read first:** `../AGENTS.md`, `00-architecture.md`, `contracts.md` (HTTP API section).
**Depends on:** nothing.
**Goal:** a `brain2` worker that durably accepts a message, runs it through Pi with no tools, and shows the reply on a temporary page. Almost all of this is a port of `../brain`.

Steps marked 🧑 need George (account access or a decision). Do everything else, then hand him the list.

## Files

| Create | From |
|---|---|
| `package.json`, `tsconfig.json`, `pnpm-workspace.yaml`, `.dev.vars.example`, `patches/` | Copy from `../brain`, then edit as below. |
| `.gitignore` | brain's, plus `src/generated/`. Must contain `.cloudflare/`. |
| `cloudflare.config.ts` | brain's, edited as below. |
| `src/access.ts`, `src/ai.ts`, `src/model.ts`, `src/markdown.ts` | Copy unchanged. |
| `src/background.ts` | Copy; remove the `index` callback and `indexEnabled` (no vector indexing). |
| `src/store.ts` | New, captures and deliveries only (plan 02 adds the rest). |
| `src/agent.ts` | New, trimmed from brain's `agent.ts`. |
| `src/index.ts` | brain's, routes edited as below. |
| `scripts/runtime.mjs` | Copy; rename the class and binding to `Brain2`. |
| `tests/access.test.ts`, `ai.test.ts`, `model.test.ts`, `chat.test.ts`, `runtime.test.mjs` | Port. |

`AGENTS.md` and `README.md` already exist; update the "Status" line in `AGENTS.md` when this plan lands.

## Steps

1. **package.json**: name `brain2`. Keep brain's dependency versions and both patches (`pnpm-workspace.yaml` `patchedDependencies`). Add `preact`. Remove `memory:create`, `test:gateway`, `test:dashboard`. Scripts:
   - `build:client`: `node scripts/build-client.mjs` (in this plan it writes a stub `src/generated/client.ts` exporting `script = ""` and `styles = ""`; plan 06 makes it real)
   - `dev`, `check`, `test`, `dryrun`, `deploy`: each runs `pnpm run build:client &&` first, then brain's command
   - `format`, `typegen`: as brain
2. **cloudflare.config.ts**: worker name `brain2`; export `Brain2` (`exports.durableObject({ storage: "sqlite" })`); bindings `BRAIN` (durable object, worker `brain2`, export `Brain2`), `AI`, `MODEL` (same model string as brain), `AI_GATEWAY` `"brain"` (reuse the existing gateway), `TIMEZONE` (same as brain), `ACCESS_AUD` (empty string until step 9). No `MEMORY` binding. Same `accountId`, compatibility date and flags as brain.
3. **Store (captures only)**. Tables:
   ```sql
   CREATE TABLE captures (id TEXT PRIMARY KEY, text TEXT NOT NULL, source TEXT NOT NULL,
     refs TEXT NOT NULL DEFAULT '[]', created_at TEXT NOT NULL, hidden INTEGER NOT NULL DEFAULT 0);
   CREATE TABLE deliveries (id TEXT PRIMARY KEY, state TEXT NOT NULL DEFAULT 'pending', result TEXT);
   CREATE TABLE health (component TEXT PRIMARY KEY, last_success TEXT, last_error TEXT, last_error_at TEXT);
   CREATE TABLE meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
   ```
   Schema setup uses numbered migrations tracked in `meta` (`schema` key): a list of SQL strings applied in order inside a transaction, so later plans append instead of editing. Port from brain's store, same behaviour: `capture`, `accepted`, `result`, `deliveries`, `resumeParked`, `completed`, `health`, `conversation`, `diagnostics`. Drop everything about archived captures and maintenance commands; `conversation()` filters on `hidden = 0`. Add `rev()` and `bumpRev()` on `meta`; storing a delivery result bumps it.
4. **Agent** (`Brain2 extends DurableObject`): keep from brain's `agent.ts` the harness setup, `reconcileCaptures`, `submitCapture`, `ensureModel`, `capture`, `conversationSnapshot`, `diagnostics`, `retry`, and the Lifecycle wiring (`harness`, `background`). Remove the organizer, dashboard, embedding, indexing and all tools. Install one extension with a placeholder preamble section ("You are brain2. Reply briefly.") and the clock section.
   - Compaction: `reserveTokens: contextWindow - 25_000`, `keepRecentTokens: 8_000`. (Checked in `@earendil-works/pi-durable` `CompactionPolicy`: generation compacts above `contextWindow - reserveTokens`.)
   - The text submitted to Pi: `Sent at: <created_at>\nTimezone: <tz>\nSource: <source>\n\n<text>`. No message ID line; plan 03 stamps provenance server-side.
5. **Routes** (`index.ts`): keep all of brain's guards. Routes: `POST /api/messages` (body per `MessageRequest`; ignore `refs` for now but accept and store them), `GET /api/chat` (temporary: brain's shape, used by the temporary page), `POST /api/retry`, `GET /api/diagnostics`, `GET /` (temporary page). Remove `/api/dashboard`, `/api/export`, `/chat`.
6. **Temporary page**: copy brain's `ui.ts`, `client.ts`, `styles.ts` into `src/temp-ui/`, chat only. Plan 06 deletes this folder.
7. **Tests**: port the listed tests. They must cover: Access rejection without `ctx.access` and with the wrong audience; service identity limited to `POST /api/messages`; capture idempotency; same ID with different text → 409; a reply is produced by the scripted model; recovery after the object is evicted mid-run.
8. Run `pnpm install`, `check`, `test`, `dryrun`. Check whether both patches still apply and are still needed with the installed versions; if a patch no longer applies, stop and ask.
9. 🧑 **Access**: create an Access application whose destination is the `brain2` Worker, attach the existing reusable "Allow George" policy, and put its audience tag in `ACCESS_AUD`. Create a service token and a Service Auth policy for Shortcuts (used at cutover; store the secret in a password manager, not the repo).
10. 🧑 **Workers Builds**: create a build trigger like brain's (see brain's README, "Workers Builds") with root directory `/brain2` and watch path `brain2/*`.
11. 🧑 **Root docs**: add `brain2` to the worker list in the repo's root `CLAUDE.md` and `AGENTS.md`.

## Done when

- `check`, `test`, `dryrun` pass.
- Locally (`pnpm run dev`), a message typed on the temporary page gets a model reply.
- After George's steps: the deployed worker returns 403 without Access and works with it.
