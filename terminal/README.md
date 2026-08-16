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
- `GET /api/terminal` — the aggregated view. Returns `upcomingEvents` (up to
  five events that haven't ended, with their days and optional times in US
  Central), `nextTimedEvent` (the soonest timed event, if any), and
  `allDayEvent` (an all-day event happening right now, if any).
- `GET /preview/:name` — a development-only preview that renders a template from
  `templates/` (e.g. `/preview/today` or `/preview/upcoming`) using the mock
  data in `mock.json`, so screens can be built and viewed in a browser. See
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
pnpm run check
pnpm run dryrun
pnpm run deploy
```
