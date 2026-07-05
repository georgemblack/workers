import { Hono } from "hono";
import { replaceEvents, type CalendarEvent } from "../storage";

export const calendar = new Hono<{ Bindings: Cloudflare.Env }>();

// The shape of a single event as sent by the calendar source. Dates are ISO
// strings that include a timezone offset, and isAllDay arrives as "Yes"/"No".
interface IncomingEvent {
  title?: unknown;
  startDate?: unknown;
  endDate?: unknown;
  isAllDay?: unknown;
}

function parseAllDay(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.trim().toLowerCase() === "yes";
  return false;
}

// Turns one incoming event into the form we store, or returns an error message
// describing why it couldn't be parsed.
function parseEvent(raw: IncomingEvent): CalendarEvent | string {
  if (typeof raw.title !== "string" || raw.title.trim() === "") {
    return "each event needs a non-empty title";
  }
  if (typeof raw.startDate !== "string" || typeof raw.endDate !== "string") {
    return `event "${raw.title}" needs startDate and endDate strings`;
  }

  const startMs = new Date(raw.startDate).getTime();
  const endMs = new Date(raw.endDate).getTime();
  if (Number.isNaN(startMs) || Number.isNaN(endMs)) {
    return `event "${raw.title}" has an invalid startDate or endDate`;
  }

  return {
    title: raw.title,
    startMs,
    endMs,
    isAllDay: parseAllDay(raw.isAllDay),
  };
}

// Stores a week of calendar events, replacing whatever was there before and
// dropping anything that has already ended.
calendar.post("/api/calendar", async (c) => {
  const body = await c.req.json().catch(() => null);
  if (!body || !Array.isArray(body.events)) {
    return c.json({ error: "expected an `events` array" }, 400);
  }

  const events: CalendarEvent[] = [];
  for (const raw of body.events as IncomingEvent[]) {
    const parsed = parseEvent(raw);
    if (typeof parsed === "string") {
      return c.json({ error: parsed }, 400);
    }
    events.push(parsed);
  }

  await replaceEvents(c.env.DB, events, Date.now());

  return c.json({ stored: events.length });
});
