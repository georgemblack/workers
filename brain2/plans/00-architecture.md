# 00 — Architecture

## What the live data says

Findings from reading brain's source and querying the live Durable Object (aggregates only; this repo is public).

| Observation | Consequence for brain2 |
|---|---|
| ~130 messages in 3.5 weeks; about half typed in chat, half dictated through Apple Shortcuts. Median message is under 100 characters. Dictation garbles proper nouns. | Fire-and-forget capture stays the primary input. Name matching must tolerate misspellings, so people need aliases and the agent needs the roster in its prompt. |
| 99 items, 6 context records, ~54 KB of record data in total. | The whole open dataset fits in a prompt. Vectorize, embeddings and the indexing outbox are not earning their keep. Drop them; keep FTS5. |
| Only one context record was created through normal use; the other five are large bootstrap blobs. `core` was never set. | Free-form "context" is too vague a concept for the model to use. Replace it with typed things (people, notes) plus one small always-loaded profile. |
| ~60% of items have no `area_id`; a second model call (the organizer) assigns areas after every change. | Have the chat agent place every top-level task in an area when it writes it. Delete the organizer, the plan revision table and its retry job. |
| Stored timing labels go stale: "Today", "Tonight", "This weekend", "Next week" stay on items forever. | Store a date plus an optional label, and reject relative words in the label. Relative wording is produced at read time from the date. |
| The model invents record IDs, mutation IDs and repeats the source message ID on every write. Record data is passed as a JSON string. | Server generates IDs and stamps the source message. Tools take typed parameters per node type. |
| People already show up inside task titles (gifts for someone, "text X back", "submit form to Y"). | Tasks and people must link to each other. One shared graph, not two silos. |
| The user completes items by pasting the title back into chat. | Tapping a dashboard row should drop a reference into the chat box. Mutations still go through chat (that was a deliberate brain decision and stays). |
| Follow-up messages lean on the previous one ("and I also installed…", "these two are done"). | Keep a short rolling conversation. Long history is not needed: records are the memory. |
| 11 early `model_error` failures, fixed since; Pi + Lifecycle recovery has been solid. Same stack is used by `govtrack`. | Keep the runtime (Pi Durable harness, Lifecycle jobs, delivery outbox). Rebuild the data model, tools and UI around it. |

## Core idea

Three storage concepts, shared by every area of life:

1. **Node** — a thing being tracked. Has a type (`task`, `person`, …), a title, free-text notes, a status, and a small set of typed fields.
2. **Link** — a named, directed connection between two nodes (`parent`, `in_area`, `about`, `member_of`, `spouse_of`, …).
3. **Entry** — a short piece of text attached to one or more nodes. With a date it is a timeline event ("saw them at the park, Nov 14"); without one it is a standing fact ("went to Platteville for school").

Plus **captures** (the raw messages, kept as evidence) and **changes** (audit trail).

On top of storage sits a **module** per area of life. A module is plain code that declares:

- its node types (fields, statuses, which links are allowed)
- its section of the agent's instructions
- the index it wants in the prompt (e.g. the people roster)
- its dashboard view

```
            ┌────────── chat / Shortcuts ──────────┐
            ▼                                      │
   captures → Pi agent ── generated tools ──► Store (nodes, links, entries, changes, FTS)
                 ▲                                 │
     prompt = core rules + each module's           ▼
     guidance + each module's index        module.view() → dashboard tabs
```

The example from the brief, as stored:

> "I met one of my neighbors at the park today, said her name was Jane. Husband's name was John. They have two little boys, Jude and Jonah – John went to Platteville for school."

- 4 `person` nodes (Jane, John, Jude, Jonah), 1 `group` node of kind household
- links: each person `member_of` the household; Jane `spouse_of` John; Jude and Jonah `child_of` both; the household `member_of` the "Neighbors" circle
- entry (no date) on John: "Went to Platteville for school"
- entry (dated today) on the household: "Met Jane at the park"

> "Saw Jane + family at the park again today, said they're done having kids"

- one dated entry on the household. No new nodes.

> "John said he's interviewing for a new job"

- dated entry on John, plus an open `followup` node about John: "Ask how the job interview went". It shows on the People dashboard until resolved.

## Decisions

| Area | Decision | Why |
|---|---|---|
| Platform | New worker `brain2`, one SQLite Durable Object named `personal`, cf CLI + `cloudflare.config.ts`, Access in front. | Same as brain; single user, transactional writes next to the agent. |
| Agent runtime | Pi Durable via `agents/harness/pi`, Lifecycle jobs, delivery outbox, GPT-6 Luna through the `brain` AI Gateway. | Proven here and in govtrack. Port it, don't redesign it. |
| Semantic search | None. FTS5 over nodes, entries and captures, plus prompt indexes. | Data is tiny. Removes Vectorize, embeddings, the outbox and a failure mode. Revisit past ~5,000 entries. |
| Dashboard areas | Agent assigns at write time. No organizer model pass. | One fewer model call per change and far less machinery. |
| Tools | Generated from module type definitions (zod, converted to JSON Schema for Pi): typed `create_<type>` / `update_<type>`, shared read tools. | Typed parameters instead of a JSON string; new types get tools for free. |
| IDs and provenance | Server-generated node IDs; source message and mutation ID stamped by the server (Pi gives each tool call a stable `callId`). | Removes a whole class of model mistakes. |
| Conversation | One Pi session, compacted aggressively (target ~25K tokens instead of 150K). | Faster, cheaper turns. History is not the memory. |
| Frontend | Preact + TypeScript, bundled by esbuild into one script the Worker serves itself. No TanStack Start, no Static Assets. | The UI is one screen with two panes and a few views. SSR adds nothing behind Access, and Static Assets would break the `ctx.access` check brain relies on. Preact is enough structure for tabs, a detail view and shared focus state. |
| Live updates | Polling a cheap revision number; full state only when it changes. | Simple, survives sleep/wake on mobile. |
| Direct edits in the dashboard | None. Tapping a row references it in chat. | Preserves brain's "all changes go through chat, audited" rule while removing the copy-paste. |

## Adding a third area later

1. Create `src/modules/<name>/` with type definitions, prompt text, an index function and a view function.
2. Register it in `src/modules/index.ts`.
3. Add a dashboard tab component.

No schema migration, no new tools by hand, no changes to the agent loop. If the new area needs a link to existing things (a book recommended by a person, a trip with people), it declares the link and it works.

## Out of scope (for now)

- Reminders and push notifications. Many captures start with "remind me", so a daily digest is the obvious next module once brain2 is live.
- Calendar or contacts sync, web research, any external action.
- Editing through the dashboard.
- Importing chat history from brain.
