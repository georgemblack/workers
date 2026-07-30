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

// Wraps our template markup the same way TRMNL does in production: it loads the
// framework CSS/JS and nests the markup in the screen/view scaffolding the
// framework expects. This is what makes the preview look like the real device —
// the template itself is only the `.layout`, and TRMNL (here, this wrapper)
// supplies everything around it. See templates/CLAUDE.md.
function wrap(markup: string): string {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="https://trmnl.com/css/latest/plugins.css" />
    <script src="https://trmnl.com/js/latest/plugins.js"></script>
    <style>
      /* The framework's "environment" class scales the screen up for its own doc
         viewer and paints a gray backdrop around it. We want a 1:1 render at the
         device's real 1040x780, so drop the magnifier and the chrome. */
      body.environment {
        margin: 0;
        background: #fff !important;
      }
      .environment .screen {
        transform: none;
      }
    </style>
  </head>
  <body class="environment trmnl">
    <div class="screen screen--v2 screen--4bit">
      <div class="view view--full">
        ${markup}
      </div>
    </div>
  </body>
</html>`;
}

// Renders a template in the browser using the checked-in mock data, so templates
// can be built and tweaked without deploying anywhere. The real display fetches
// /api/terminal and renders the template itself; this route stands in for that
// during development. Edit mock.json to try different data. Visit e.g.
// /preview/today.
preview.get("/preview/:name", async (c) => {
  const template = templates[c.req.param("name")];
  if (!template) return c.text("template not found", 404);

  const markup = await engine.parseAndRender(template, mockData);
  return c.html(wrap(markup));
});
