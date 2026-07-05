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

// Completely replaces the stored calendar with the given events: the table ends
// up holding exactly what was passed in. Runs as one batch so the table is never
// left half-updated.
export async function replaceEvents(
  db: D1Database,
  events: CalendarEvent[],
): Promise<void> {
  const statements: D1PreparedStatement[] = [
    db.prepare("DELETE FROM calendar_events"),
  ];

  const insert = db.prepare(
    "INSERT INTO calendar_events (title, start_ms, end_ms, is_all_day) VALUES (?, ?, ?, ?)",
  );
  for (const event of events) {
    statements.push(
      insert.bind(
        event.title,
        event.startMs,
        event.endMs,
        event.isAllDay ? 1 : 0,
      ),
    );
  }

  await db.batch(statements);
}

// The next event still on the calendar: the soonest one that hasn't ended yet.
export async function getNextEvent(
  db: D1Database,
  now: number,
): Promise<CalendarEvent | null> {
  const row = await db
    .prepare(
      "SELECT * FROM calendar_events WHERE end_ms >= ? ORDER BY start_ms ASC LIMIT 1",
    )
    .bind(now)
    .first<CalendarEventRow>();
  return row ? rowToEvent(row) : null;
}
