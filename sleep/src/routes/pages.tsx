import { Hono } from "hono";
import { HomePage } from "../components/HomePage";
import { getSecondsUntilCacheExpiry } from "../utils/cache";
import { SleepStats } from "../types";

const pages = new Hono<{ Bindings: CloudflareBindings }>();

pages.get("/", async (c) => {
  const cache = caches.default;
  const cacheKey = new Request(c.req.url);

  const cachedResponse = await cache.match(cacheKey);
  if (cachedResponse) {
    return cachedResponse;
  }

  const id = c.env.HEALTH_STORE.idFromName("default");
  const stub = c.env.HEALTH_STORE.get(id);
  const stats = await stub.getSleepStats();

  const response = await c.html(<HomePage stats={stats} />);
  response.headers.set(
    "Cache-Control",
    `public, max-age=${getSecondsUntilCacheExpiry()}`,
  );

  c.executionCtx.waitUntil(cache.put(cacheKey, response.clone()));
  return response;
});

export { pages };
