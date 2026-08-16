import { Hono } from "hono";
import { getCurrentAllDayEvent, getNextTimedEvent, getUpcomingEvents } from "../storage";
import { centralStartDay, centralStartTime } from "../time";

export const terminal = new Hono<{ Bindings: Cloudflare.Env }>();

// The aggregated view shown on the terminal display. Both template previews
// render from this payload, so the browser previews match what the display gets.
export async function getTerminalData(db: D1Database, now: number) {
  const [upcomingEvents, nextTimedEvent, allDayEvent] = await Promise.all([
    getUpcomingEvents(db, now),
    getNextTimedEvent(db, now),
    getCurrentAllDayEvent(db, now),
  ]);

  return {
    upcomingEvents: upcomingEvents.map((event) => ({
      title: event.title,
      startDay: centralStartDay(event.startMs, now),
      startTime: event.isAllDay ? null : centralStartTime(event.startMs),
    })),
    nextTimedEvent: nextTimedEvent
      ? {
          title: nextTimedEvent.title,
          startDay: centralStartDay(nextTimedEvent.startMs, now),
          startTime: centralStartTime(nextTimedEvent.startMs),
        }
      : null,
    allDayEvent: allDayEvent ? { title: allDayEvent.title } : null,
  };
}

terminal.get("/api/terminal", async (c) => {
  const data = await getTerminalData(c.env.DB, Date.now());
  return c.json(data);
});
