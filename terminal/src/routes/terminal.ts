import { Hono } from "hono";
import { getNextEvent } from "../storage";
import { centralStartDay, centralStartTime } from "../time";

export const terminal = new Hono<{ Bindings: Cloudflare.Env }>();

// Aggregates the data shown on the terminal display. For now that's just the
// next calendar event, but this payload is expected to grow over time.
terminal.get("/api/terminal", async (c) => {
  const now = Date.now();
  const event = await getNextEvent(c.env.DB, now);

  return c.json({
    nextEvent: event
      ? {
          title: event.title,
          startDay: centralStartDay(event.startMs, now),
          startTime: centralStartTime(event.startMs),
        }
      : null,
  });
});
