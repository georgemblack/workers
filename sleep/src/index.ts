import { Hono } from "hono";
import { api } from "./routes/api";
import { pages } from "./routes/pages";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.route("/api", api);
app.route("/", pages);

export { HealthStore } from "./durable/HealthStore";
export default app;
