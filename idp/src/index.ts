import { Hono } from "hono";
import { oidc } from "./routes/oidc";
import { auth } from "./routes/auth";
import { admin } from "./routes/admin";

const app = new Hono<{ Bindings: Cloudflare.Env }>();

app.route("/", oidc);
app.route("/", auth);
app.route("/", admin);

app.onError((err, c) => {
  console.error("unhandled", err);
  return c.json({ error: "server_error", message: err.message }, 500);
});

export default app;
