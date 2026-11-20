// Usage: node scripts/compare-migration.mjs <brain-export.json> <state.json>
// state.json is a saved GET /api/state response from brain2 after the import.
// Prints OK or MISMATCH per check, with counts and IDs only.
import { readFile } from "node:fs/promises";
import { compare } from "./migrate-lib.mjs";

const [exportPath, statePath] = process.argv.slice(2);
if (!exportPath || !statePath) {
  console.error(
    "Usage: node scripts/compare-migration.mjs <brain-export.json> <state.json>",
  );
  process.exit(1);
}
const data = JSON.parse(await readFile(exportPath, "utf8"));
const state = JSON.parse(await readFile(statePath, "utf8"));
const today = new Date().toLocaleDateString("en-CA", {
  timeZone: data.timezone ?? "America/Chicago",
});
const lines = compare(data, state, today);
for (const line of lines) console.log(line);
if (lines.some((line) => line.startsWith("MISMATCH"))) process.exitCode = 1;
