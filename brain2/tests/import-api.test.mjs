import { beforeAll, afterAll, expect, it } from "vitest";
import { createRuntime, reply } from "../scripts/runtime.mjs";

const file = (nodes) => ({
  format: "brain2-import",
  version: 1,
  nodes,
  entries: [],
});
const node = (id, type, title, extra = {}) => ({
  id,
  type,
  title,
  body: "",
  status: type === "task" ? "open" : "active",
  props: {},
  links: {},
  ...extra,
});
const good = file([
  node("area_home", "area", "Home"),
  node("garden", "task", "Plan garden beds", {
    links: { in_area: ["area_home"] },
  }),
  node("seeds", "task", "Buy seeds", { links: { parent: ["garden"] } }),
]);

let app;
beforeAll(async () => {
  app = await createRuntime(() => reply("OK"));
}, 30000);
afterAll(async () => {
  await app?.dispose();
});
const post = (body, dryRun) =>
  app.request(`/api/admin/import?dry_run=${dryRun ? 1 : 0}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
const areas = async () => (await app.json("/api/state")).views.tasks.areas;

it("checks a file without writing anything", async () => {
  const response = await post(good, true);
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({
    ok: true,
    nodes: 3,
    entries: 0,
    errors: [],
  });
  expect(await areas()).toEqual([]);
});

it("rejects a whole file when one record is invalid", async () => {
  const bad = file([...good.nodes, node("bike", "task", "Fix bike")]);
  const response = await post(bad, false);
  expect(response.status).toBe(400);
  expect(await response.json()).toMatchObject({
    ok: false,
    errors: ["Top-level tasks need an area (links.in_area)"],
  });
  expect(await areas()).toEqual([]);
});

it("imports once and refuses the same file again", async () => {
  expect((await post(good, false)).status).toBe(200);
  const shown = await areas();
  expect(
    shown.map((a) => [
      a.title,
      a.items.map((i) => [i.title, i.children.map((c) => c.title)]),
    ]),
  ).toEqual([["Home", [["Plan garden beds", ["Buy seeds"]]]]]);
  const again = await post(good, true);
  expect(again.status).toBe(400);
  expect((await again.json()).errors[0]).toMatch(/already exists/);
  // Import messages never show in the chat.
  expect((await app.json("/api/state")).messages).toEqual([]);
});

it("serves the import page and accepts files larger than a message", async () => {
  const page = await app.request("/admin/import");
  expect(page.status).toBe(200);
  expect(await page.text()).toContain('<script src="/app.js" defer></script>');
  const big = file([
    node("area_big", "area", "Big", { body: "x".repeat(11000) }),
  ]);
  for (let i = 0; i < 20; i++)
    big.nodes.push(
      node(`area_${i}`, "area", `Area ${i}`, { body: "y".repeat(11000) }),
    );
  expect((await post(big, true)).status).toBe(200);
});
