import { Hono } from "hono";
import { isSleepSample } from "../types";
import { getSecondsUntilCacheExpiry } from "../utils/cache";

const api = new Hono<{ Bindings: CloudflareBindings }>();

api.post("/samples", async (c) => {
  const body = await c.req.json();
  if (!isSleepSample(body)) {
    return c.body(null, 400);
  }

  const id = c.env.HEALTH_STORE.idFromName("default");
  const stub = c.env.HEALTH_STORE.get(id);
  await stub.addSleepSample(body);

  return c.json({ status: "ok" });
});

api.get("/sleep", async (c) => {
  const cache = caches.default;
  const cacheKey = new Request(c.req.url);

  const cachedResponse = await cache.match(cacheKey);
  if (cachedResponse) {
    return cachedResponse;
  }

  const id = c.env.HEALTH_STORE.idFromName("default");
  const stub = c.env.HEALTH_STORE.get(id);
  const stats = await stub.getSleepStats();

  if (stats === null) {
    return c.body(null, 404);
  }

  const response = await c.json(stats);
  response.headers.set(
    "Cache-Control",
    `public, max-age=${getSecondsUntilCacheExpiry()}`,
  );

  c.executionCtx.waitUntil(cache.put(cacheKey, response.clone()));
  return response;
});

export { api };
