import { Hono } from "hono";
import { oidc } from "./routes/oidc";
import { auth } from "./routes/auth";
import { admin } from "./routes/admin";
import { requireAccess } from "./access";

const app = new Hono<{ Bindings: Cloudflare.Env }>();

// Security headers for every response. Static pages served without the worker
// get the same headers from ui/public/_headers, which explains each one.
app.use("*", async (c, next) => {
  await next();
  // Copy the response first, since some (redirects, static files) can't be changed.
  c.res = new Response(c.res.body, c.res);
  c.res.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; style-src 'self' 'unsafe-inline'; base-uri 'none'; object-src 'none'; frame-ancestors 'none'",
  );
  c.res.headers.set("X-Content-Type-Options", "nosniff");
});

// Must run before every route. See access.ts.
app.use("*", requireAccess);

app.route("/", oidc);
app.route("/", auth);
app.route("/", admin);

// Anything not handled by a route is passed on to the static files. Pages
// like /admin are usually served straight from them without the worker running
// at all; they show no data until the APIs above (which check Access and the
// session) return some.
app.notFound((c) => c.env.ASSETS.fetch(c.req.raw));

app.onError((err, c) => {
  console.error("unhandled", err);
  return c.json({ error: "server_error" }, 500);
});

export default app;
