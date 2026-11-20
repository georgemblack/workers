// Usage: node scripts/migrate.mjs <brain-export.json> <import.json>
// Keep both files in brain2/.cloudflare/ (gitignored): they hold real data.
// Prints counts only, never titles.
import { readFile, writeFile } from "node:fs/promises";
import { transform } from "./migrate-lib.mjs";

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error(
    "Usage: node scripts/migrate.mjs <brain-export.json> <import.json>",
  );
  process.exit(1);
}
const { file, summary } = transform(JSON.parse(await readFile(input, "utf8")));
await writeFile(output, JSON.stringify(file, null, 2));
console.log(JSON.stringify(summary, null, 2));
console.log(`Wrote ${file.nodes.length} nodes to ${output}`);
