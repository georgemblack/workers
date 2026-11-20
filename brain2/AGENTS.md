# brain2

Personal Cloudflare Worker: a chat-driven organizer for tasks, people, and later other areas of life. It is a ground-up rebuild of `../brain`. All work for brain2 stays in this directory.

**Status: not implemented yet.** The plans in `plans/` are executed in order; see `README.md`. If you were given one plan, read these first, in this order:

1. This file.
2. `plans/00-architecture.md` (the design and why).
3. `plans/contracts.md` (exact shared types; the source of truth when a plan and a contract disagree).
4. Your plan.

## Rules

These are not negotiable without asking George.

- **This repository is public.** Never commit real personal data: no names, places, dates or task text from the live system, in code, tests, fixtures, plans, comments or commit messages. Exports, seed files and scratch output go in `brain2/.cloudflare/`, which is gitignored. Fixtures use the fictional cast in `plans/contracts.md` ("Fixtures").
- **Do not touch `../brain`.** It is the live system and the rollback. Read it freely; copy from it; never edit, deploy or query its production data unless plan 07 says so and George is present.
- **All data changes go through the chat agent.** The dashboard is read-only. Do not add edit, delete or complete endpoints.
- **Pi owns durable message processing.** Do not replace it with request-scoped `waitUntil` work.
- **Every write is one SQLite transaction** that validates, writes, audits, updates search and bumps the revision. Writes are replay-idempotent (by mutation ID) and version-checked.
- **Access authentication is never bypassed on deployed hosts.** `LOCAL_DEV` is for localhost only and never goes in deployed configuration.
- **No Static Assets binding.** The Worker serves its own HTML, script and stylesheet so the `ctx.access` check keeps working.
- **No paid model calls in `pnpm run test`.** Paid evaluations live behind `pnpm run test:agent` and run only against an isolated local object with fictional data.
- **Do not deploy.** Deployment happens through Workers Builds when George pushes. Run `pnpm run dryrun` instead.
- **Stop and ask** when a step is marked 🧑 (needs George), when a contract in `plans/contracts.md` has to change, or when a library does not behave the way a plan says.

## Commands

Use `pnpm` and the package scripts, never `npm`/`npx` or bare `cf`/`wrangler`.

- `pnpm run check` — TypeScript
- `pnpm run test` — store, view and workerd integration tests (no paid requests)
- `pnpm run dryrun` — bundle and validate without deploying
- `pnpm run dev` — local Worker; copy `.dev.vars.example` to `.dev.vars` first
- `pnpm run build:client` — bundle the browser app (run automatically by the scripts above)
- `pnpm run format` — Prettier

A plan is finished only when `check`, `test` and `dryrun` pass.

## Layout (target)

```
brain2/
  cloudflare.config.ts
  scripts/            build-client.mjs, runtime.mjs (test harness), evaluate-agent.mjs, migrate.mjs
  src/
    index.ts          routes and request guards
    agent.ts          Brain2 Durable Object: Pi harness, Lifecycle, capture/retry/snapshots
    access.ts ai.ts model.ts markdown.ts background.ts   (ported from brain)
    store.ts          nodes, links, entries, changes, search, captures, deliveries
    tools.ts          shared tools + tools generated from module types
    prompt.ts         core rules and prompt assembly
    shared/contracts.ts   types from plans/contracts.md, imported by server and client
    modules/
      types.ts index.ts
      core/  tasks/  people/      each: types.ts, instructions.ts, index.ts (prompt index), view.ts
    client/           Preact app (main.tsx, components/, styles.css)
    generated/        build output (gitignored)
  tests/
  plans/
```

## Conventions

- TypeScript, strict. Same formatting and test tooling as `../brain` (Prettier, Vitest, Node's built-in SQLite for store tests, Miniflare for integration).
- Code comments: few, plain language, written for someone new to the codebase who knows what the project is for.
- When a plan says "port from brain", copy the named file and change only what the plan lists. Keep the behaviour the brain tests check.
- Commit only when George asks. One plan per branch/PR is the expected unit.
