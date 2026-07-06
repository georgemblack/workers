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

- A template is **only the inner contents of `<body>`** — no `<head>`, `<html>`,
  or `<body>` tags. TRMNL supplies the surrounding document. Put fonts and styles
  inline as `<link>`/`<style>` at the top of the file, and scope CSS to a wrapper
  element (e.g. `.today`) rather than styling `body`, which we don't own.
- The screen is **1040px wide by 780px high**, but do **not** hard-code those
  dimensions. Use relative units (`vmin`, `vw`, `%`, `clamp`) so a template fills
  whatever it's given.
- It's an **e-ink** screen: no color, slow refresh, no animation. Design for pure
  black on white, large type, and high contrast. Grays dither and look muddy.
- Everything must be **self-contained** in the single HTML file (inline
  `<style>`, no build step). Linking out to Google Fonts is fine.
- Prefer the **TRMNL design system** — its fonts, classes, and layout helpers —
  over hand-rolled styling wherever it fits, so templates match the device's
  native look. Docs: https://trmnl.com/framework/docs/3.1. TRMNL injects the
  framework CSS around our markup in production. Our screen is the high-res
  TRMNL X, where the framework renders all text in **Inter Variable**.
- Gotcha: the framework sets font weight via `font-variation-settings: "wght" N`,
  which **overrides plain `font-weight`** on a variable font. If a weight isn't
  sticking on the device, set the axis directly (e.g.
  `font-variation-settings: "wght" 800;`), not just `font-weight`.
