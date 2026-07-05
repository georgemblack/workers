// A calendar sync arrives as a flurry of single-event posts within seconds of
// each other. On each post we clear out any event older than this window, so a
// fresh sync replaces the previous one while its own posts (all well inside the
// window) survive together. Sized well above the flurry but well below the
// once-a-day gap between syncs.
const RESYNC_WINDOW_MS = 60 * 60 * 1000; // 1 hour

export interface CalendarEvent {
  title: string;
  startMs: number;
  endMs: number;
  isAllDay: boolean;
}

interface CalendarEventRow {
  title: string;
  start_ms: number;
  end_ms: number;
  is_all_day: number;
}

function rowToEvent(row: CalendarEventRow): CalendarEvent {
  return {
    title: row.title,
    startMs: row.start_ms,
    endMs: row.end_ms,
    isAllDay: row.is_all_day === 1,
  };
}

// Adds one event, recording when it was added, and clears out any events left
// over from a previous sync (anything older than the resync window). Runs as one
// batch so the table is never left half-updated.
export async function addEvent(
  db: D1Database,
  event: CalendarEvent,
  now: number,
): Promise<void> {
  const cutoff = now - RESYNC_WINDOW_MS;
  await db.batch([
    db
      .prepare(
        "INSERT INTO calendar_events (title, start_ms, end_ms, is_all_day, added_at) VALUES (?, ?, ?, ?, ?)",
      )
      .bind(
        event.title,
        event.startMs,
        event.endMs,
        event.isAllDay ? 1 : 0,
        now,
      ),
    db.prepare("DELETE FROM calendar_events WHERE added_at < ?").bind(cutoff),
  ]);
}

// The next timed (non all-day) event still on the calendar: the soonest one
// that hasn't ended yet.
export async function getNextEvent(
  db: D1Database,
  now: number,
): Promise<CalendarEvent | null> {
  const row = await db
    .prepare(
      "SELECT * FROM calendar_events WHERE end_ms >= ? AND is_all_day = 0 ORDER BY start_ms ASC LIMIT 1",
    )
    .bind(now)
    .first<CalendarEventRow>();
  return row ? rowToEvent(row) : null;
}

// The all-day event happening right now, if any (started but not yet ended).
export async function getCurrentAllDayEvent(
  db: D1Database,
  now: number,
): Promise<CalendarEvent | null> {
  const row = await db
    .prepare(
      "SELECT * FROM calendar_events WHERE is_all_day = 1 AND start_ms <= ? AND end_ms >= ? ORDER BY start_ms ASC LIMIT 1",
    )
    .bind(now, now)
    .first<CalendarEventRow>();
  return row ? rowToEvent(row) : null;
}
