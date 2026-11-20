# brain2

Ground-up rebuild of `brain`: a chat-driven personal organizer that keeps track of things in more than one area of life. Tasks first, people second, room for a third.

Nothing is implemented yet. This directory holds the plans, to be executed in order. Anyone implementing a plan reads [AGENTS.md](AGENTS.md) (rules), then plan 00, then [contracts](plans/contracts.md) (exact shared types), then their plan. Steps marked 🧑 need George.

| # | Plan | Result |
|---|------|--------|
| 00 | [Architecture](plans/00-architecture.md) | The design and the reasons behind it. Read first. |
| 01 | [Scaffold and runtime](plans/01-scaffold-runtime.md) | Deployable worker that accepts a message and replies. |
| 02 | [Store core](plans/02-store-core.md) | Nodes, links, entries, audit, search. |
| 03 | [Modules and agent tools](plans/03-modules-agent.md) | Module registry, generated tools, prompt assembly. |
| 04 | [Tasks module](plans/04-tasks-module.md) | Everything brain does today. |
| 05 | [People module](plans/05-people-module.md) | Names, facts, timelines, follow-ups. |
| 06 | [UI](plans/06-ui.md) | Chat + dashboard split, mobile toggle. |
| 07 | [Migration and cutover](plans/07-migration-cutover.md) | Move live data from brain, switch over, retire brain. |

Plans 04, 05 and 06 only depend on 01–03 and can be built in parallel.

## What changes, in one paragraph

brain stores "items" and "context" as JSON blobs behind one generic save tool, then runs a second model pass to sort the dashboard. brain2 stores **nodes** (a task, a person, an area, a note), **links** between them, and dated **entries** on a timeline. Each area of life is a **module** that declares its node types, its prompt guidance, and its dashboard view. Adding a new area later means adding one module folder, not reshaping the database or the agent.

## Privacy

This repository is public. Exports, seed files and anything else containing real data live only in `brain2/.cloudflare/`, which must be gitignored from the first commit. Tests and evaluations use fictional fixtures only.
