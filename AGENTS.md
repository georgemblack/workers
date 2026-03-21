# Workers

This project is a monorepo containing personal Cloudflare workers. If the user doesn't specify which project to modify, ask before continuing. Each top-level directory contains a worker:

* `mailman`: Fetches email, summarizes it, and sends push notifications
* `sleep`: Calculates sleep from the previous night and renders it as a webpage
* `linkmgr`: Web app for collecting and displaying interesting links
* `linkproc`: Queue consumer that fetches link metadata via Browser Rendering API
* `gringotts`: Web app for tracking finances and spending

Each project has it's own `AGENTS.md` with unqiue instructions.

## Commands

All projects use `pnpm`, and share the following commands (which should be run to make changes):

* `pnpm run typecheck`
* `pnpm run format`
* `pnpm run dryrun`

All projects deploy with `pnpm run deploy`, and Cloudflare types can be generated via `pnpm run typegen`.