# AGENTS.md

This is a monorepo containing a collection of Cloudflare Workers for personal use. Each top-level directory represents a worker. Note that all workers share identical commands in `package.json`.

For project-specific context, see `AGENTS.md` within each directory.

## Making Changes

When making code changes, follow these rules:

1. Use `volta` to manage node versions, `pnpm` for package management.
2. Make changes on a new branch off of `master`. The branch name should be prefixed with `automated/`.
3. Validate code changes by running `pnpm run dryrun` and `pnpm run typecheck`.
4. Format code with `pnpm run format`.
5. Open a pull request with the changes. The pull request should be prefixed with: "Automated", and the description should contain a note disclosing that the changes were AI generated.
