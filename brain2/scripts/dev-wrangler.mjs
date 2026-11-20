// Local dev server for when `cf dev` cannot connect to Workers AI. Remote
// bindings connect through the Worker's workers.dev hostname, and brain2's is
// behind Access, so this runs under a separate name ("brain2-dev") with the
// same bindings. Local only; the config goes in .cloudflare/ (gitignored).
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";

await mkdir(".cloudflare", { recursive: true });
await writeFile(
  ".cloudflare/wrangler-dev.json",
  JSON.stringify(
    {
      name: "brain2-dev",
      main: "../src/index.ts",
      account_id: "bc4564dd499c0a9b8a7bb79c9bd5ea6d",
      compatibility_date: "2026-10-23",
      compatibility_flags: ["nodejs_compat"],
      ai: { binding: "AI", remote: true },
      durable_objects: { bindings: [{ name: "BRAIN", class_name: "Brain2" }] },
      migrations: [{ tag: "v1", new_sqlite_classes: ["Brain2"] }],
      vars: {
        MODEL: "openai/gpt-6-luna",
        AI_GATEWAY: "main",
        TIMEZONE: "America/Chicago",
        ACCESS_AUD: "local",
        // Skips Access on localhost only; this file is never deployed.
        LOCAL_DEV: "true",
      },
    },
    null,
    2,
  ),
);
spawn(
  "wrangler",
  [
    "dev",
    "--config",
    ".cloudflare/wrangler-dev.json",
    ...process.argv.slice(2),
  ],
  { stdio: "inherit" },
).on("exit", (code) => process.exit(code ?? 0));
