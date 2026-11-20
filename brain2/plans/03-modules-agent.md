# 03 — Modules and agent tools

**Read first:** `../AGENTS.md`, `00-architecture.md`, `contracts.md` (all of it).
**Depends on:** 01, 02.
**Goal:** the module registry, tools generated from module types, the assembled prompt, and the shared contract types. After this plan, plans 04, 05 and 06 can proceed in parallel.

## Files

| File | Purpose |
|---|---|
| `src/shared/contracts.ts` | Every type in `contracts.md`, verbatim. No runtime code except small constants. |
| `src/modules/types.ts` | `NodeType`, `Module`, `LinkRule`. |
| `src/modules/index.ts` | `modules: Module[]` and `registry.type(name)`. Throws at load if two modules define the same type or a link rule names an unknown type. |
| `src/modules/core/` | `note` and `profile` types, instructions, index. No view. |
| `src/modules/tasks/index.ts`, `src/modules/people/index.ts` | **Stubs** created here: a module with the right `id` and `title`, empty `types`, empty `instructions`, `index: () => null`, and a `view` returning the empty view model (`{ priorities: [], areas: [] }`, `{ catch_up: [], birthdays: [], recent: [], circles: [] }`). Plans 04 and 05 fill them in and touch no other shared file. |
| `src/tools.ts` | Shared tools and the generator. |
| `src/prompt.ts` | Core rules and `sections(store, env)`. |
| `scripts/evaluate-agent.mjs` | Port of `../brain/scripts/evaluate-agent.mjs`: runs paid scenarios against an isolated local object and writes results under `.cloudflare/`. It loads every `tests/eval/*.mjs` file; each exports `scenarios: { name, setup?: string[], messages: string[], check(state): string[] }[]`. Add `tests/eval/core.mjs` with one note scenario and a `test:agent` script. 🧑 Ask George before the first paid run. |
| `src/agent.ts` | Install the tools and sections; add `stateSnapshot()` and `nodeDetail(id)` RPC methods. |
| `src/index.ts` | Add `GET /api/state` and `GET /api/nodes/:id` per the contracts. Remove `GET /api/chat` only when plan 06 lands. |

## Core module

- `note`: props `{}`; statuses `["active", "archived"]`, closed `["archived"]`; no links. Describe: "A reference fact or piece of background worth keeping, with a title and body. Not a to-do."
- `profile`: props `{}`; statuses `["active"]`. The store constructor's migration creates the single node with id `profile`, title "About me", empty body, and source capture `system` (insert a hidden capture with id `system` and source `import` first). `create_profile` is not generated; `update_profile` is.
- Instructions: keep the profile under about 2,000 characters; it holds who the user is, household basics and standing preferences, not tasks or one-off facts.
- Index: `{ notes: [{ id, title }] }` for active notes, capped at 100.

## Tools

Tool definitions are Pi `ToolRegistration` objects (see `../brain/src/agent.ts` for working examples). Facts checked against the installed packages:

- `execute(args, api, context)` receives `api.callId` and `api.conversationId`. Use `mutationId = api.conversationId + ":" + api.callId`. It is stable across replays of the same call, so no model-supplied mutation ID is needed.
- `sourceId`: add `store.currentCapture()` returning the newest delivery in state `accepted` whose result is not final (`ORDER BY rowid DESC LIMIT 1`). If none, return `{ error: "No message is being processed" }`. A replayed call never reaches this lookup because step 1 of `saveNode` returns the committed record.
- Pi validates arguments against `parameters` before `execute` and accepts plain JSON Schema (`pi-ai/dist/utils/validation.js` compiles non-TypeBox schemas). So node types are declared once in **zod**, and tool parameters are produced with `z.toJSONSchema()` (zod 4) and passed as `parameters`.
- Pi coerces `null` to `""` for a field typed only `string`. Any clearable field must therefore be declared `.nullable()` so its JSON Schema is `anyOf [type, null]`.

Generator (`toolsFor(registry, store)`):

- For each type: build a zod object `{ title, body, status: z.enum(statuses), ...props.shape, links: z.object({ [rel]: z.array(z.string()) }).partial() }`. `create_T` requires `title`; everything else optional. `update_T` adds required `id` and `version`; everything else optional.
- `execute` splits args into `patch` (`title`, `body`, `status`, `props` = the rest) and `links`, calls `store.saveNode`, returns the record as JSON text. Catch errors and return `{ error }`.
- Description: the type's `describe`, then one line per link relation ("links.parent: the ID of the parent task").
- Write tools: `executionMode: "sequential"`, `replay: "safe"`. Read tools: `replay: "safe"`.

Shared tools exactly as in `contracts.md` ("Tools"). `get` includes entries from the node's `member_of` groups of kind household only if the node type is `person`; do this generically by asking the store for `entriesFor([id, ...linked group IDs])` when the node has `member_of` links.

After any successful write tool, call `background.schedule()` as brain does.

## Prompt

`sections` returns Pi prompt sections in this order:

1. `preamble` (untagged) — core rules, below.
2. `clock` — `Today: <YYYY-MM-DD> (<weekday>). User timezone: <tz>.`
3. `profile` — the profile node's body, or "(empty)".
4. For each module with non-empty instructions: `<module id>` — instructions, a blank line, then `JSON.stringify(module.index(store, today))`.

The per-message text handed to Pi (from plan 01) gains a line when the capture has refs: `Refers to: "<title>" (<id>)` per ref, before the blank line.

Core rules (write these, adjusting wording only):

```
You are brain, a personal organizer. The user sends short, casual messages, often dictated, so expect
misheard words and missing punctuation. Work out what they mean; never require commands or IDs.

Each area below has its own guidance and an index of what already exists. Use the indexes first. Use
search, get and list for closed or older items, timeline entries, original wording, and anything an index
marks as truncated. Reuse and update existing records instead of creating duplicates.

Never invent names, dates, relationships or completed work. A message can do several things at once and
can touch more than one area. A question is answered from stored data and changes nothing.

Ask a question only when two readings would lead to different changes and a wrong guess would be costly.
Otherwise do everything that is clear, and mention what you assumed. Messages are often fire-and-forget,
so never hold clear work waiting for an answer. Never ask for optional details.

Records are updated with the version you last saw; if a write reports a conflict, get the record again
and retry. Do not claim something was saved unless the tool returned it.

Reply in one to three short sentences saying what changed, or the answer. Never show record IDs.
You cannot browse, send messages or act outside this app.
```

## State and detail

- `stateSnapshot(rev?)`: if `rev` equals `store.rev()`, return `null` (route answers 204). Otherwise build `StateResponse`: messages from `store.conversation()` mapped to `ChatMessage` (reply Markdown rendered with `renderMarkdown`), `tabs` from modules with a `title`, `views[module.id] = module.view(store, today)`.
- `nodeDetail(id)`: `NodeDetail` per the contracts.

## Tests

- Registry: duplicate type name and unknown link target both throw at load.
- Generator: snapshot of every generated tool's name and JSON Schema (so schema changes show up in review). With the fake `note`-like type: a clearable field's schema allows null.
- Workerd integration (scripted model, see `../brain/tests/chat.test.ts`): a scripted `create_note` call produces one node and one change stamped with the capture ID; the same scripted call replayed produces no second change; `update_note` with a stale version returns `{ error }`; `add_entry` on two notes; a call with an argument of the wrong type is rejected by Pi before `execute`.
- `GET /api/state` returns 204 for the current rev and 200 after a write; `GET /api/nodes/:id` returns 404 for unknown IDs.
- Prompt: with 300 notes the assembled sections stay under 40,000 characters.

## Done when

`check`, `test`, `dryrun` pass, and in local dev a chat message like "note that the wifi password is on the fridge" creates a note that a later "where's the wifi password?" finds.
