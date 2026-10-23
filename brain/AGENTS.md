# brain

Personal Cloudflare Worker. All work for brain stays in this directory. Use pnpm and the cf CLI via package scripts; configure infrastructure in cloudflare.config.ts.

- `pnpm run check`: TypeScript
- `pnpm run test`: SQLite consistency and search tests
- `pnpm run dryrun`: cf bundle/deployment validation without deployment
- `pnpm run dev`: local Worker; copy .dev.vars.example first
- `pnpm run format`: format sources

Brain is a contextual open-loop manager. Every visible item can be done or dropped; supporting facts are separate context records. Preserve why, timing provenance, parent relationships, source evidence, and change history. Pi owns durable message processing. Do not replace it with request-scoped waitUntil processing. Keep record mutations transactionally audited, replay-idempotent, and version-checked. Do not bypass Access authentication on deployed hosts. Never add LOCAL_DEV to deployed configuration.

Workers AI uses remote inference even in local development. Agent evaluation fixtures are fictional and must not seed the production database. See tests/scenarios.md for model behavior evaluations and README.md for setup and current limits.
