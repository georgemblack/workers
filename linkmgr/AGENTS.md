# Link Manager

Cloudflare Worker web app for collecting and displaying interesting links. Built with TanStack Start, React, Tailwind CSS, and Cloudflare Kumo.

## Architecture

- **Web UI** (`/`): Displays links sorted by most recent, with delete buttons
- **API** (`POST /api/links/`): Accepts a `url` parameter and queues it for processing
- **Data**: Links stored in a D1 database, read via server functions

The API sends URLs to a Cloudflare Queue (`linkmgr-queue`) which is consumed by the `linkproc` worker.

## D1 Schema

See `schema.sql` for the database schema. Apply with:

```sh
wrangler d1 execute linkmgr --file=schema.sql
```

## API Usage

```sh
curl -X POST https://linkmgr.george.black/api/links/ \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```
