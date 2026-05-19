# Workers

## Installing dependencies

This is a pnpm workspace with a single `pnpm-lock.yaml` at the root. From anywhere in the repo:

```sh
pnpm --filter <project> add <package>
pnpm --filter <project> add -D <package>   # devDependency
```

Alternatively, `cd` into the project directory and run `pnpm add <package>` — pnpm detects the workspace and still updates the root lockfile.
