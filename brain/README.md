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

Service identities can only POST captures; browser identities can view and edit records. To enable Shortcuts, create a dedicated Access service token and attach a Service Auth policy to Brain. Temporary deployment-test credentials and their policy were removed after verification.

For future deployments, run `pnpm run check`, `pnpm run test`, `pnpm run dryrun`, and `pnpm run deploy`. The one-time `pnpm run memory:create` script is only for provisioning a new index; the live index already exists. Preview URLs remain disabled, while the workers.dev hostname is enabled.

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
  --data '{"id":"shortcut-unique-id","text":"I need to buy size 1 diapers","source":"apple-shortcuts"}'
```

Returns `202 {"id":"...","accepted":true}` after Pi durably accepts the input. Keep the same ID for network retries; a conflicting body under that ID is rejected. Accepted means saved for processing, not successfully interpreted. Pi handles processing, model retries, queued follow-ups, and recovery via Lifecycle alarms independently of the HTTP request lifetime. Browser polling reads current state; it is not required to run accepted work.

`GET /api/state` returns items, supporting context, recent captures and their operation results, and change history. `PATCH /api/items/:id` accepts `expected_version` and a title/details/priority/status edit. `POST /api/retry` resumes Pi work parked by repeated crashes. Failed model operations remain visible in the conversation; send a follow-up to retry their intent. The UI retains an unsent draft and capture ID locally if submission fails.

To clear the chat and delete Pi's stored conversation, an account operator can queue `clear_conversation` in `brain_maintenance` through the Durable Objects SQL API, then restart the object (for example, deploy). On startup, before Pi opens, Brain archives existing captures from the chat view and deletes Pi conversation/run records. It defers cleanup if any work is unfinished. Tasks, context, changes, original source-message evidence, search indexes, and Pi's monotonic ID allocators remain intact. Archived capture IDs cannot be resubmitted as new operations. This removes the conversation from Brain; it does not delete separate AI Gateway/provider logs.

## Data and agent behavior

- Items have why, details, priority and its reason, status, parent, context links, explicit dates, soft timing, timing provenance, and clarification text.
- Context records describe people, events, dates, and other facts with supporting evidence. Original messages and versioned changes are retained.
- The agent searches before acting, expands related records, preserves uncertainty, and distinguishes completion from lower priority. Approximate dates remain approximate; inherited targets are separate from explicit deadlines.
- Tools expose search, record retrieval with relationships, exhaustive item listing, and validated version-checked writes. The model never executes arbitrary SQL.
- All changes have a source message and mutation ID. Record writes, audit history, FTS updates, and the indexing outbox commit in one SQLite transaction. Replayed tool calls return their previously committed result.
- FTS5 searches original messages and records. Semantic retrieval embeds items and context in Vectorize, resolves hits back to current SQLite records, and merges them with lexical results. Recent/explicit reads do not depend on vector freshness.
- The indexing outbox retries on writes, retrieval, and dashboard visits. Vectorize itself is asynchronous. An unavailable vector service does not block record changes or lexical retrieval.

## Current boundaries

This first version has no external action tools, scheduled notifications, or automatic research. Dates organize work; they do not send reminders. Closed items remain searchable and can be reopened. Recent item changes can be undone from the activity list, provided no newer edit exists. Undoing creation drops the item; supporting context remains in history. Chat refreshes by polling rather than token streaming. Context records are included in the prompt, which should be bounded or retrieved selectively if personal context grows substantially.

## Validation

`pnpm run test` exercises actual SQLite/FTS5 with Node's built-in SQLite: replay idempotency, conflicting edits, parent cycles, missing relationships, capture retries, search syntax, closed-item views, and indexing version safety. It does not establish model interpretation quality.

`tests/scenarios.md` contains conversational evaluation sequences. Run them against an isolated development agent before trusting automatic task interpretation. Avoid seeding historical examples as current facts: relative dates must be anchored to their original message timestamps.
