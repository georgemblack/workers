import { Hono } from "hono";
import { addEvent, type CalendarEvent } from "../storage";

export const calendar = new Hono<{ Bindings: Cloudflare.Env }>();

// The shape of a single event as sent by the calendar source. Dates are ISO
// strings that include a timezone offset, and isAllDay is a boolean.
interface IncomingEvent {
  title?: unknown;
  startDate?: unknown;
  endDate?: unknown;
  isAllDay?: unknown;
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
    isAllDay: raw.isAllDay === true,
  };
}

// Adds a single event to the calendar and drops any events left over from a
// previous day's sync.
calendar.post("/api/calendar", async (c) => {
  // Grab the raw body up front so we can log exactly what was sent whenever the
  // request is rejected, even if the JSON itself is malformed.
  const rawBody = await c.req.text();

  const reject = (message: string) => {
    console.error("invalid calendar payload:", message, "-", rawBody);
    return c.json({ error: message }, 400);
  };

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return reject("body must be valid JSON");
  }

  const event = (body as { event?: unknown } | null)?.event;
  if (typeof event !== "object" || event === null || Array.isArray(event)) {
    return reject("expected a single `event` object");
  }

  const parsed = parseEvent(event as IncomingEvent);
  if (typeof parsed === "string") {
    return reject(parsed);
  }

  await addEvent(c.env.DB, parsed, Date.now());

  return c.json({ ok: true });
});
