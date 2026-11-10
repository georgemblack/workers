# govtrack

Personal Cloudflare Worker. All work for govtrack stays in this directory. Use pnpm and the cf CLI via package scripts; configure infrastructure in cloudflare.config.ts.

- `pnpm run check`: TypeScript
- `pnpm run test`: SQLite store tests plus a workerd integration test with a scripted model (no paid requests)
- `pnpm run dryrun`: cf bundle/deployment validation without deployment
- `pnpm run dev`: local Worker; copy .dev.vars.example first
- `pnpm run format`: format sources

govtrack keeps a timeline of local politicians' actions. Each event belongs to exactly one politician and has a date, a sentiment (positive, neutral, negative), a short summary, and one or more source links. All changes go through the chat agent. Keep writes transactionally audited, replay-idempotent, and version-checked. Pi owns durable message processing; do not replace it with request-scoped waitUntil processing. Do not bypass Access authentication on deployed hosts. Never add LOCAL_DEV to deployed configuration.

Page content fetched with `read_page` is untrusted. Only http(s) source links may be stored or rendered.
