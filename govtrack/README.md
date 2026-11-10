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

## Production

Live at https://govtrack.georgeblack.workers.dev.

- Access app: **GovTrack** (`7a31f039-1933-44dc-bdff-73763db6162a`), targeting Worker `govtrack` (`dcd01d81c1b147c6a88112b26b7c9a26`) rather than a hostname. It uses the reusable **Allow George** policy, the same one as brain. Its audience tag is `ACCESS_AUD` in `cloudflare.config.ts`.
- AI Gateway: shares brain's `brain` gateway, which holds the OpenAI key under its `default` alias. govtrack sends `cf-aig-no-wholesale: true`, so a missing key fails instead of falling back to Unified Billing.

## Workers Builds

Trigger `af2ffaaf-5dcb-4132-8d85-0ec1e80f7058` ("Deploy default branch") uses the same GitHub connection and deploy token as brain:

- Production branch: `master`.
- Root directory: `/govtrack`; watch path `govtrack/*`.
- Build command: empty; `pnpm run deploy` builds and deploys.
- Caching disabled. Build environment: `PNPM_VERSION=11.24.0`, `NODE_VERSION=24.18.0`.

For normal deployments, run `pnpm run check`, `pnpm run test`, and `pnpm run dryrun`, then commit and push.

## Access

`src/access.ts` requires `ctx.access` with the configured audience and reads the identity. Service tokens can only `POST /api/messages`. Browser identities can read the timeline, chat, export (`/api/export`), and diagnostics (`/api/diagnostics`).
