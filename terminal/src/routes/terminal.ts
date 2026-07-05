import { Hono } from "hono";
import { getCurrentAllDayEvent, getNextEvent } from "../storage";
import { centralStartDay, centralStartTime } from "../time";

export const terminal = new Hono<{ Bindings: Cloudflare.Env }>();

// The aggregated view shown on the terminal display. Both the JSON endpoint and
// the template preview render from this, so what you preview matches what the
// display gets. This payload is expected to grow over time.
export async function getTerminalData(db: D1Database, now: number) {
  const [nextEvent, allDayEvent] = await Promise.all([
    getNextEvent(db, now),
    getCurrentAllDayEvent(db, now),
  ]);

  return {
    nextEvent: nextEvent
      ? {
          title: nextEvent.title,
          startDay: centralStartDay(nextEvent.startMs, now),
          startTime: centralStartTime(nextEvent.startMs),
        }
      : null,
    allDayEvent: allDayEvent ? { title: allDayEvent.title } : null,
  };
}

terminal.get("/api/terminal", async (c) => {
  const data = await getTerminalData(c.env.DB, Date.now());
  return c.json(data);
});
