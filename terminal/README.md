# Terminal

A small Hono API that collects data and exposes a single aggregated view for a
terminal display. Deployed to Cloudflare Workers, backed by D1.

## Endpoints

- `POST /api/calendar` — add a single calendar event. Send a JSON body with a
  top-level `event` object that has a `title`, `startDate`, `endDate` (ISO
  strings with a timezone offset), and `isAllDay` (boolean). The event is stored
  with the time it was added, and any event older than the resync window (1
  hour) is deleted. The calendar syncs as a flurry of these posts (one per
  event) each morning, all within seconds of each other, so a fresh sync clears
  out the previous one while its own posts survive together.
- `GET /api/terminal` — the aggregated view. Returns `nextEvent` (the soonest
  timed, non all-day event that hasn't ended, with its day and time in US
  Central) and `allDayEvent` (an all-day event happening right now, if any).
  Either can be `null`. More data will be added here over time.
- `GET /preview/:name` — a development-only preview that renders a template from
  `templates/` (e.g. `/preview/today`) using the mock data in `mock.json`, so
  screens can be built and viewed in a browser. See
  [`templates/CLAUDE.md`](templates/CLAUDE.md).

## One-time setup

```sh
# Create the D1 database, then paste the returned id into wrangler.jsonc
pnpm run db:create

# Generate Cloudflare types now that bindings are in place
pnpm run typegen

# Apply the schema
pnpm run db:migrate
```

## Development

```sh
pnpm run typecheck
pnpm run format
pnpm run dryrun
pnpm run deploy
```
