import { Hono } from "hono";
import { Liquid } from "liquidjs";
import todayTemplate from "../../templates/today.html";
import mockData from "../../mock.json";

export const preview = new Hono<{ Bindings: Cloudflare.Env }>();

// Every template lives here so the preview route can find it by name. Add new
// templates to this map as they're created.
const templates: Record<string, string> = {
  today: todayTemplate,
};

const engine = new Liquid();

// Renders a template in the browser using the checked-in mock data, so templates
// can be built and tweaked without deploying anywhere. The real display fetches
// /api/terminal and renders the template itself; this route stands in for that
// during development. Edit mock.json to try different data. Visit e.g.
// /preview/today.
preview.get("/preview/:name", async (c) => {
  const template = templates[c.req.param("name")];
  if (!template) return c.text("template not found", 404);

  const html = await engine.parseAndRender(template, mockData);
  return c.html(html);
});
