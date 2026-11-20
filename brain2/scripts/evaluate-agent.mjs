// Paid behaviour checks: the real model against an isolated local Pi/SQLite
// object holding fictional data only. Never touches the deployed Worker.
// Runs every scenario in tests/eval/*.mjs, or only those whose name contains
// the first argument. Results go to .cloudflare/ (gitignored).
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { getPlatformProxy } from "wrangler";
import { rawResponse } from "../src/ai.ts";
import { createRuntime } from "./runtime.mjs";

const filter = process.argv[2] ?? "";
await mkdir(".cloudflare", { recursive: true });
await writeFile(
  ".cloudflare/eval-gateway.json",
  JSON.stringify({
    name: "brain2-evaluation",
    account_id: "bc4564dd499c0a9b8a7bb79c9bd5ea6d",
    compatibility_date: "2026-10-23",
    compatibility_flags: ["nodejs_compat"],
    ai: { binding: "AI", remote: true },
  }),
);
const platform = await getPlatformProxy({
  configPath: ".cloudflare/eval-gateway.json",
  persist: false,
  envFiles: [],
});

const scenarios = [];
for (const file of (await readdir("tests/eval"))
  .filter((f) => f.endsWith(".mjs"))
  .sort())
  for (const scenario of (await import(`../tests/eval/${file}`)).scenarios)
    if (scenario.name.includes(filter)) scenarios.push(scenario);

const results = [];
try {
  for (const scenario of scenarios) {
    // A fresh runtime per scenario, so each starts from an empty store.
    const app = await createRuntime(async ({ model, input, options }) => {
      const response = rawResponse(
        await platform.env.AI.run(model, input, options),
      );
      return new Response(await response.text(), {
        status: response.status,
        headers: response.headers,
      });
    });
    try {
      const storage = await app.runtime.unsafeGetDurableObjectStorage(
        "brain2-test",
        "Brain2",
        { name: "personal" },
      );
      const rows = async (query) => [...(await storage.exec(query))];
      let n = 0;
      const replies = [];
      // A message is text, or { text, ref } where ref is part of the title of
      // a record the user tapped before sending (the shortest match wins).
      const say = async (message) => {
        const { text, ref } =
          typeof message === "string" ? { text: message } : message;
        const id = `eval-${++n}`;
        const refs = ref
          ? (await rows("SELECT id, title FROM nodes"))
              .filter((node) =>
                node.title.toLowerCase().includes(ref.toLowerCase()),
              )
              .sort((x, y) => x.title.length - y.title.length)
              .slice(0, 1)
              .map((node) => node.id)
          : [];
        if (ref && !refs.length)
          throw new Error(`No record titled like "${ref}"`);
        const response = await app.request("/api/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, text, source: "api", refs }),
        });
        if (response.status !== 202)
          throw new Error(`Message rejected: ${response.status}`);
        const result = await app.wait(id);
        // Replies come back as HTML; checks read them as plain text.
        replies.push({
          id,
          text,
          reply: result.reply_html.replace(/<[^>]+>/g, ""),
        });
      };
      for (const text of scenario.setup ?? []) await say(text);
      for (const text of scenario.messages) await say(text);
      const state = {
        nodes: (await rows("SELECT * FROM nodes")).map((node) => ({
          ...node,
          props: JSON.parse(node.props),
        })),
        links: await rows("SELECT * FROM links"),
        // created is 1 when the change made a new record.
        changes: await rows(
          "SELECT id, target, target_id, source_id, before_data IS NULL AS created FROM changes",
        ),
        entries: await rows(
          "SELECT e.*, group_concat(en.node_id) AS node_ids FROM entries e JOIN entry_nodes en ON en.entry_id = e.id WHERE e.deleted = 0 GROUP BY e.id",
        ),
        replies,
      };
      const problems = scenario.check(state);
      results.push({ name: scenario.name, problems, state });
      console.log(
        (problems.length ? "FAIL " : "PASS ") +
          scenario.name +
          problems.map((p) => "\n  - " + p).join(""),
      );
    } finally {
      await app.dispose();
    }
  }
} finally {
  await writeFile(
    ".cloudflare/agent-evaluation.json",
    JSON.stringify(results, null, 2),
  );
  await platform.dispose();
}
if (results.some((r) => r.problems.length)) process.exitCode = 1;
