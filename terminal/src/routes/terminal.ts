import { Hono } from "hono";
import { getCurrentAllDayEvent, getNextEvent } from "../storage";
import { centralStartDay, centralStartTime } from "../time";

export const terminal = new Hono<{ Bindings: Cloudflare.Env }>();

// Aggregates the data shown on the terminal display. This payload is expected to
// grow over time.
terminal.get("/api/terminal", async (c) => {
  const now = Date.now();
  const [nextEvent, allDayEvent] = await Promise.all([
    getNextEvent(c.env.DB, now),
    getCurrentAllDayEvent(c.env.DB, now),
  ]);

  return c.json({
    nextEvent: nextEvent
      ? {
          title: nextEvent.title,
          startDay: centralStartDay(nextEvent.startMs, now),
          startTime: centralStartTime(nextEvent.startMs),
        }
      : null,
    allDayEvent: allDayEvent ? { title: allDayEvent.title } : null,
  });
});
