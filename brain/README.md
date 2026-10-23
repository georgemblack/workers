# brain

A personal open-loop manager. Send unstructured messages; brain retrieves related items and personal context, then creates, updates, connects, completes, or drops work. Everything visible has a path off the list. Supporting facts remain searchable context rather than permanent tasks.

## Stack

Cloudflare Worker, SQLite-backed Durable Object, Agents SDK 0.30 / Pi Durable 1.4, GPT-6 Luna through the Workers AI binding and AI Gateway, Vectorize, Cloudflare Access. The UI is self-contained HTML/CSS/JavaScript served by the Worker: dashboard at `/`, conversation at `/chat`. No frontend framework or external assets. Authentication runs before serving either UI or APIs.

Configuration is in `cloudflare.config.ts`; all commands use the cf CLI through pnpm scripts. Wrangler is installed solely as the build/development backend required by cf.

## Run locally

```sh
pnpm install
cp .dev.vars.example .dev.vars
pnpm run dev
```

The local bypass requires both `LOCAL_DEV=true` and a localhost URL. Never add that variable to deployed configuration. `.dev.vars` is ignored. Workers AI uses the real remote binding during local development and may incur inference charges. Vectorize is not emulated locally; lexical search works without it.

## Production

Live at https://brain.georgeblack.workers.dev.

- Access app: **Brain** (`eb278f3a-10ea-4351-ad8d-13b96d795cf9`).
- Destination: Worker `brain` (`b79bdeab0fda4db8a0d6e088e4d73656`), covering production and preview deployments across its hostnames. This is not a hostname-based Access app.
- Owner policy: existing reusable **Allow George**, including its existing US location requirement.
- Vectorize: `brain-memory`, 768 dimensions, cosine, using `@cf/baai/bge-base-en-v1.5` embeddings.

The Worker serves HTML directly, without Static Assets or an internal assets router. `src/access.ts` requires `ctx.access`, checks its audience against Brain's configured `ACCESS_AUD`, and reads the authenticated identity. Without Access context or with a different audience it returns 403. An unset audience returns 503. Access itself performs authentication before the Worker runs; no manual JWT parsing is needed for this direct invocation. If Static Assets are added later, revisit this integration because the assets router does not propagate `ctx.access`.

Service identities can only POST captures. Browser identities can read the dashboard, conversation, export, and diagnostics; task changes happen through chat. To enable Shortcuts, create a dedicated Access service token and attach a Service Auth policy to Brain. Temporary deployment-test credentials and their policy were removed after verification.

For normal deployments, run `pnpm run check`, `pnpm run test`, and `pnpm run dryrun`, then commit and push. Workers Builds runs `pnpm run deploy` remotely. Direct deployment is reserved for an explicitly requested operational recovery. The one-time `pnpm run memory:create` script is only for provisioning a new index; the live index already exists. Preview URLs remain disabled, while the workers.dev hostname is enabled.

## Model and gateway

Conversation model: `openai/gpt-6-luna`, with low reasoning through the Responses API. The named `brain` AI Gateway selects the OpenAI key stored under its `default` alias. Brain sends `cf-aig-no-wholesale: true`, so a missing applicable key fails instead of falling back to Cloudflare-funded Unified Billing. The Worker never reads the OpenAI secret.

`MODEL` and `AI_GATEWAY` live in `cloudflare.config.ts`. On each object startup, the first capture or dashboard request applies the configured model to the existing Pi session. This preserves history and task data rather than resetting the conversation. Defaults still select the model for new sessions.

Embeddings continue using Workers AI's `@cf/baai/bge-base-en-v1.5`; switching the conversation model does not change the Vectorize index.

`pnpm run test:gateway` makes two small, paid inference requests through the real remote AI binding and stored gateway key. It verifies Responses tool calling and reading the tool result using synthetic fixtures without touching Brain's database. Unit tests use mocked responses and make no paid requests.

## Workers Builds

Remote build trigger `11810f1a-22b2-46e4-9820-f5c6f8fbd3eb` uses the existing GitHub connection to `georgemblack/workers` and the same deployment credential as Terminal.

- Production branch: `master`.
- Root directory: `/brain`.
- Watch path: `brain/*`, matching the other monorepo Workers' path-filter convention.
- Build command: empty; `pnpm run deploy` performs the build and deployment.
- Caching: disabled, matching Terminal and Link Manager.
- Remote build environment: `PNPM_VERSION=11.24.0`, `NODE_VERSION=24.18.0`.

These settings live remotely in Workers Builds, outside `cloudflare.config.ts`. Automatic deployment requires the Brain files to be committed and pushed to the repository.

## Capture API

```sh
curl https://brain.georgeblack.workers.dev/api/messages \
  -H 'Content-Type: application/json' \
  -H 'CF-Access-Client-Id: YOUR_CLIENT_ID' \
  -H 'CF-Access-Client-Secret: YOUR_CLIENT_SECRET' \
  --data '{"text":"I need to buy size 1 diapers"}'
```

Only `text` is required. Brain generates an ID and defaults the source to `apple-shortcuts`. Returns `202 {"id":"...","accepted":true}` after Pi durably accepts the input. Accepted means saved for processing, not successfully interpreted. Optional `id` and `source` fields remain supported for other clients; reusing an ID with the same body avoids duplicate processing, while a conflicting body is rejected. Pi handles processing, model retries, queued follow-ups, and recovery via Lifecycle alarms independently of the HTTP request lifetime. Browser polling reads current state; it is not required to run accepted work.

`GET /api/dashboard` reads the current dashboard only; `GET /api/chat` reads cached capture results and formats replies. Neither endpoint submits messages, joins Pi work, or indexes records. `POST /api/retry` resumes work parked by repeated crashes. Edit/undo HTTP routes were removed; all task mutations go through the chat agent. The UI retains an unsent draft and capture ID locally if submission fails.

`brain_deliveries` is a durable capture delivery/result outbox. A Lifecycle background job repairs any capture/submit gap, caches Pi replies, and drains the vector indexing outbox. It runs independently of page polling, retries failures after a minute, and stops when idle. Existing unarchived captures are reconciled once as they acquire persistent delivery receipts. Archived capture IDs remain protected from replay.

`GET /api/export` downloads a versioned JSON export of current/closed records, original captures, audits, areas, dashboard, and stored Pi conversation/run records. It requires the normal browser Access identity; service tokens cannot read exports. Visit the URL while signed in to save a backup or share a week of usage for review. Exports contain private personal data. They are logical data snapshots rather than a raw SQLite backup or a one-click restore feature; a restore must validate the format and rebuild derived search/vector indexes. Automatic scheduled backups are not configured.

`GET /api/diagnostics` is an authenticated internal endpoint with capture failures/pending work, indexing backlog, dashboard freshness, and recent background/index/organizer health. Diagnostics remain off the main UI. Invalid capture inputs are validated at the Worker boundary and return HTTP 400; reused IDs with different content return 409.

To clear the chat and delete Pi's stored conversation, an account operator can queue `clear_conversation` in `brain_maintenance` through the Durable Objects SQL API, then restart the object (for example, deploy). On startup, before Pi opens, Brain archives existing captures from the chat view and deletes Pi conversation/run records. It defers cleanup if any work is unfinished. Tasks, context, changes, original source-message evidence, search indexes, and Pi's monotonic ID allocators remain intact. Archived capture IDs cannot be resubmitted as new operations. This removes the conversation from Brain; it does not delete separate AI Gateway/provider logs.

## Data and agent behavior

- Items have why, details, priority and its reason, status, parent, context links, explicit dates, soft timing, timing provenance, and clarification text.
- Context records describe people, events, dates, and other facts with supporting evidence. Original messages and versioned changes are retained.
- The agent searches before acting, expands related records, preserves uncertainty, and distinguishes completion from lower priority. Approximate dates remain approximate; inherited targets are separate from explicit deadlines.
- Tools expose search, record retrieval with relationships, exhaustive item listing, and validated version-checked writes. The model never executes arbitrary SQL.
- The agent uses `create_record` for new records and `update_record` for patches to existing ones. Missing fields are preserved; explicit null, empty string, or [] clears a field. A deferred legacy `save_record` remains available to already-persisted Pi tool calls during rollout. All changes have a source message and mutation ID. Record writes, audit history, FTS updates, and the indexing outbox commit in one SQLite transaction. Replayed tool calls return their previously committed result.
- FTS5 searches original messages and records. Semantic retrieval embeds items and context in Vectorize, resolves hits back to current SQLite records, and merges them with lexical results. Recent/explicit reads do not depend on vector freshness.
- The indexing outbox drains through the durable background job with retries. Vectorize itself is asynchronous. An unavailable vector service does not block record changes or lexical retrieval.

## Current boundaries

This first version has no external action tools, scheduled notifications, or automatic research. Dates organize work; they do not send reminders. Closed items remain searchable and can be reopened. Ask in chat to reverse or correct a change; the agent can inspect audit evidence. Chat refreshes by polling rather than token streaming. Prompt context is bounded to roughly 16,000 characters, preferring core profile facts and recent records. Omitted context remains searchable and retrievable in full.

## Validation

`pnpm run test` exercises actual SQLite/FTS5 with Node's built-in SQLite: replay idempotency, conflicting edits, parent cycles, missing relationships, capture retries, search syntax, closed-item views, and indexing version safety. It does not establish model interpretation quality.

`tests/scenarios.md` contains conversational evaluation sequences. Run them against an isolated development agent before trusting automatic task interpretation. Avoid seeding historical examples as current facts: relative dates must be anchored to their original message timestamps.

## Dashboard

The homepage highlights current important work and explicit deadlines, then groups everything into stable life areas. Highlighted items appear only in the attention block; area totals include them and indicate how many are shown above. Each area's other next actions are visible; more work, waiting items, and optional/someday work expand separately. An item's own priority and status determine emphasis, independently of its parent project.

The read-only organizer runs through the existing Luna/Gateway binding in a durable Lifecycle job. It refreshes after task/context changes (coalesced while Pi processes a message), and every six hours for date-sensitive planning. `brain_dashboard` tracks the data revision and last valid plan; publication rejects results generated against an older revision. Task writes increment that revision transactionally. Invalid/model-failed refreshes retry after five minutes and preserve the last plan. The UI resolves IDs to current records, suppresses outdated summaries/reasons, and always includes current explicit deadlines and a fallback area for unplanned items.

`brain_areas` stores stable area names. Items may explicitly set `area_id` through the chat agent; otherwise membership comes from the organizer's saved plan or a related parent. The organizer cannot mutate tasks. Existing task/context data is preserved during rollout.

`pnpm run test:dashboard` checks a real organizer response against fictional fixtures without writing production records.

## Evaluation and maintenance

`pnpm run test` includes real workerd/SQLite/Pi integration tests with deterministic model streams, plus storage, dashboard, and browser-script unit tests. Integration fixtures enable local storage inspection only inside the test harness. They verify one audited mutation, read-only endpoints, idempotent retries, HTTP/RPC error handling, Access rejection, and capture recovery after eviction. The test transport omits cancellation signals only when crossing its mock AI RPC bridge; the production AI binding retains them.

`pnpm run test:agent` runs paid Luna evaluations against an isolated local Durable Object with fictional data. It checks the resulting records across contextual capture, date corrections, lowered priorities, partial completion, follow-ups, retrieval-only questions, dropped ideas, and explicit follow-up dates. It never seeds the production database. Results and failure traces are written under ignored `.cloudflare/`.

Source layout: `ui.ts` contains HTML, `styles.ts` the stylesheet, and `client.ts` the readable browser script. They are embedded in the served page without a frontend framework or asset build pipeline.

`follow_up_at` is an explicit calendar date for checking waiting work, independent of its completion deadline. `waiting_for` explains the dependency. Due follow-ups surface in the attention section; approximate timing remains prose, and appointment comparisons use parsed instants across timezone offsets.
