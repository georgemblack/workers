# Workers

This project is a monorepo containing personal Cloudflare workers. Each top-level directory contains a worker:

* `mailman`: Sorts incoming email with Workers AI, files it, and sends push notifications
* `linkmgr`: Web app for collecting and displaying interesting links
* `linkproc`: Queue consumer that fetches link metadata via Browser Rendering API
* `gringotts`: Web app for tracking finances and spending
* `goblin`: Queue consumer that generates merchant suggestions for gringotts transactions via Workers AI
* `tacklebox`: Static landing page for tackleboxapp.net
* `terminal`: Hono API that stores data in D1 and exposes an aggregated view for a terminal display

Each project has it's own `AGENTS.md` with unqiue instructions.

## Commands

All projects use `pnpm`, and share the following commands (which should be run to validate changes):

* `pnpm run check`
* `pnpm run dryrun`

All projects deploy with `pnpm run deploy`, and Cloudflare types can be generated via `pnpm run typegen`.

Each worker manages its dependencies independently. Run scripts from the worker's directory:

```sh
cd goblin
pnpm run check
pnpm run dryrun
pnpm run deploy
```

## Package setup

There is no root workspace or root `package.json`. Each worker is its own standalone pnpm project with its own `package.json`, `pnpm-lock.yaml`, and `pnpm-workspace.yaml` (used only for pnpm settings such as `allowBuilds`). Run `pnpm install` from inside the worker's directory.

Every worker pins the same pnpm and Node versions in two places:

* `package.json`, under `devEngines`, so pnpm downloads and uses the right versions automatically:

  ```json
  "devEngines": {
    "packageManager": { "name": "pnpm", "version": "11.24.0", "onFail": "download" },
    "runtime": { "name": "node", "version": "26.13.1", "onFail": "download" }
  }
  ```

* `.node-version`, containing just `26.13.1`, for version managers and Cloudflare Workers Builds (which doesn't read the Node version from `devEngines`).

When creating a new worker, copy this setup. When upgrading pnpm or Node, update every worker at once and run `pnpm install` in each to refresh its lockfile.

## Rules

You MUST follow the rules in this list.

* Prefer using a command in the project's `package.json` instead of running it directly. i.e. `pnpm run deploy` instead of `npx wrangler deploy`.
* Always use `pnpm` and `pnpx` over `npm` and `npx`
* If the user doesn't specify which project to modify, ask before continuing
