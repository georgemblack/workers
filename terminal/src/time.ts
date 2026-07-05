// All display values are shown in US Central time regardless of where the
// event's original timezone offset came from.
const CENTRAL_TIME_ZONE = "America/Chicago";

// Returns the calendar day (e.g. "2026-07-12") for a moment in Central time.
// Used to tell whether two moments fall on the same day.
function centralDay(ms: number): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: CENTRAL_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(ms);
}

// "Today" when the moment is on the current Central day, otherwise the weekday
// name (e.g. "Monday").
export function centralStartDay(ms: number, now: number = Date.now()): string {
  if (centralDay(ms) === centralDay(now)) return "Today";
  return new Intl.DateTimeFormat("en-US", {
    timeZone: CENTRAL_TIME_ZONE,
    weekday: "long",
  }).format(ms);
}

// A 12-hour clock time in Central, formatted for display: minutes are dropped
// when the time is on the hour, so noon reads "12 PM" and 3:30am "3:30 AM".
export function centralStartTime(ms: number): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: CENTRAL_TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(ms);
  const part = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "";
  const hour = part("hour");
  const minute = part("minute");
  const period = part("dayPeriod");
  return minute === "00" ? `${hour} ${period}` : `${hour}:${minute} ${period}`;
}
