# Terminal

A small Hono API that collects data and exposes a single aggregated view for a
terminal display. Deployed to Cloudflare Workers, backed by D1.

## Endpoints

- `PUT /api/calendar` — replace the entire stored calendar. Send a JSON body
  with an `events` array; each event has a `title`, `startDate`, `endDate` (ISO
  strings with a timezone offset), and `isAllDay` (boolean). The table ends up
  holding exactly the events in this request.
- `GET /api/terminal` — the aggregated view. Returns the next upcoming event
  with its day and time in US Central. More data will be added here over time.

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
