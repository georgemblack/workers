# govtrack

A timeline of what local politicians do. Chat with an agent to add and edit entries, usually by pasting a link. It reads the page and drafts the date, summary, and sentiment.

## Stack

Cloudflare Worker, SQLite-backed Durable Object, Agents SDK / Pi Durable 1.4, GPT-6 Luna through the Workers AI binding and AI Gateway, Browser Rendering (to read linked pages), and Cloudflare Access. It's built the same way as `brain`, and the UI is self-contained HTML/CSS/JS served by the Worker: timeline at `/`, chat at `/chat`.

## Data

Plain SQLite tables in the Durable Object:

- `politicians`: name, office, notes.
- `events`: politician_id (exactly one), date (when the action happened), sentiment (`positive` / `neutral` / `negative`), summary.
- `sources`: one or more http(s) links per event, kept in order, each with an optional title.
- `changes`: an audit log of every create, update, and delete, with the record before and after, the chat message that caused it, and its mutation ID.
- `captures`, `deliveries`, `archived_captures`, `health`, `maintenance`: chat messages and their processing, as in brain.
- `search_index`: FTS5 over politicians, events (including the politician's name and source titles), and chat messages.

## Agent tools

Read: `list_politicians`, `list_events` (filter by politician, date range, sentiment), `search_records`, `get_record` (with recent change history), `read_page` (Browser Rendering markdown, truncated to 20k characters).

Write: `create_politician`, `update_politician`, `create_event`, `update_event`, `delete_record`. Updates take only the changed fields and the record's current version. Repeating a mutation ID returns the original result instead of applying the change twice. A politician can only be deleted once they have no events.

## Run locally

```sh
pnpm install
cp .dev.vars.example .dev.vars
pnpm run dev
```

The local Access bypass requires both `LOCAL_DEV=true` and a localhost URL. Workers AI and Browser Rendering use real remote services during local development and may incur charges.

## Before the first deploy

These live outside `cloudflare.config.ts` and must be set up once:

1. **AI Gateway** named `govtrack`, with the OpenAI key stored under its `default` alias. govtrack sends `cf-aig-no-wholesale: true`, so a missing key fails instead of falling back to Unified Billing. To share brain's gateway instead, set `AI_GATEWAY` to `brain`.
2. **Access app** that targets the `govtrack` Worker (like brain's, not hostname-based), with the owner policy. Put its audience tag in `ACCESS_AUD`. Until then every request returns 503.
3. **Workers Builds** trigger: production branch `master`, root directory `/govtrack`, watch path `govtrack/*`, empty build command, caching disabled, `PNPM_VERSION=11.24.0`, `NODE_VERSION=24.18.0`.

Then run `pnpm run check`, `pnpm run test`, and `pnpm run dryrun`, commit, and push.

## Access

`src/access.ts` requires `ctx.access` with the configured audience and reads the identity. Service tokens can only `POST /api/messages`. Browser identities can read the timeline, chat, export (`/api/export`), and diagnostics (`/api/diagnostics`).
