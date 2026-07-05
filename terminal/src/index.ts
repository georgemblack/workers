import { Hono } from "hono";
import { calendar } from "./routes/calendar";
import { terminal } from "./routes/terminal";
import { preview } from "./routes/preview";

const app = new Hono<{ Bindings: Cloudflare.Env }>();

app.route("/", calendar);
app.route("/", terminal);
app.route("/", preview);

app.onError((err, c) => {
  console.error("unhandled", err);
  return c.json({ error: "server_error", message: err.message }, 500);
});

export default app;
