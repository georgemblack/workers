# Templates

HTML templates rendered on our TRMNL — an e-ink display in the kitchen. Each
file here is one screen.

## How they work

- Templates are [LiquidJS](https://liquidjs.com). They receive the JSON returned
  by `GET /api/terminal` as their variables. Right now that's `nextEvent` (with
  `title`, `startDay`, `startTime`) and `allDayEvent` (with `title`) — either can
  be `null`, so guard with `{% if %}`. New fields appear here automatically as
  the terminal view grows.
- This worker does **not** render templates in production. Another system fetches
  `/api/terminal` and renders the template itself. The files here are the source
  of truth we copy over.

## Previewing

Run `pnpm run dev` and visit `GET /preview/:name` (e.g. `/preview/today` →
`templates/today.html`) to view a template in a browser. Previews render from the
checked-in mock data in [`mock.json`](../mock.json), not the database — **edit
that file to try different data** (change a value, set a field to `null` to test
the empty state) and refresh. Keep its shape in sync with what `/api/terminal`
returns. When you add a template, register it in the `templates` map in
[`src/routes/preview.ts`](../src/routes/preview.ts).

## Writing templates

- Build templates from the **TRMNL design system** — its layout helpers,
  elements, and utility classes — not hand-rolled CSS. Following the framework is
  what keeps rendering consistent on the device. Docs:
  https://trmnl.com/framework/docs/3.1.
- A template is **only the `.layout`** and its contents — no `<html>`, `<head>`,
  `<body>`, and **no `.screen` or `.view` wrappers**. TRMNL supplies all of those
  and injects the framework CSS around our markup in production, exactly like the
  private-plugin editor does. Our local preview mirrors this (see below).
- Compose from framework classes: `layout--col`/`layout--center` for the
  arrangement, `gap--*` for spacing, and elements like `title`/`title--xxlarge`,
  `label`/`label--outline`, and `value` for content. Reach for a utility class
  before writing any CSS of your own.
- Our device is the newer **TRMNL X**: a larger, high-res screen (1040×780) with
  **4-bit grayscale (16 shades)**, not just black and white. Its framework screen
  profile is `screen--v2 screen--4bit`. Lean into what it can do — real grays for
  hierarchy (`label--gray`, borders, fills), finer detail, and denser layouts —
  rather than designing for a 1-bit display. The framework sizes text and handles
  fonts (Inter Variable) for us, so don't hard-code dimensions or fonts.
- It's still **e-ink**: no color, slow refresh, no animation. Favor large type and
  high contrast; use the grays for structure, not for large fills that look flat.
  To style per bit-depth, the framework has `4bit:`/`1bit:` responsive prefixes.
- If you genuinely need a tweak the framework can't express, add a small scoped
  `<style>` at the top of the file targeting your own wrapper class — but treat
  that as a last resort, since anything custom is where rendering issues creep in.
  Two known cases that _require_ this escape hatch:
  - **Bold big text.** The framework auto-lightens large `value`/`title` text via
    `font-variation-settings: "wght" N`, which silently overrides `font--bold`
    (and plain `font-weight`). To thicken it, set the axis directly, e.g.
    `font-variation-settings: "wght" 800;`.
  - **Label padding.** The `label` element pins its own padding, so `px--`/`py--`
    utilities don't take on it. Set `padding` in your scoped style instead.
    (`rounded--*` and `label--gray` _do_ apply, so prefer those.)

## What the preview wrapper does (don't relearn this)

[`src/routes/preview.ts`](../src/routes/preview.ts) reproduces what TRMNL does in
production so the preview matches the device. Two non-obvious things it relies on:

- The framework's element sizes (`title--xxlarge` etc.) only resolve inside the
  `environment trmnl` body class — without it the screen collapses to tiny text.
- That same `environment` class magnifies the screen (`transform: scale`) and
  paints a gray backdrop for the framework's own doc viewer, so the wrapper
  overrides both to render 1:1. If a template looks scaled or off-center in the
  preview, suspect the wrapper, not your markup.
