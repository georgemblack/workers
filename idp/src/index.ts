import { Hono } from "hono";
import { oidc } from "./routes/oidc";
import { auth } from "./routes/auth";
import { admin } from "./routes/admin";
import { requireAccess } from "./access";

const app = new Hono<{ Bindings: Cloudflare.Env }>();

// Must run before every route. See access.ts.
app.use("*", requireAccess);

app.route("/", oidc);
app.route("/", auth);
app.route("/", admin);

// The /admin and /register pages are static files, but the worker runs first
// for them (see `runWorkerFirst` in cloudflare.config.ts) so the Access check
// above applies. Anything not handled by a route is passed on to the files.
app.notFound((c) => c.env.ASSETS.fetch(c.req.raw));

app.onError((err, c) => {
  console.error("unhandled", err);
  return c.json({ error: "server_error", message: err.message }, 500);
});

export default app;
