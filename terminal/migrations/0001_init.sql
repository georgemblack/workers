CREATE TABLE IF NOT EXISTS calendar_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  -- Start and end are stored as epoch milliseconds (UTC) so we can sort and
  -- compare regardless of the original timezone offset.
  start_ms INTEGER NOT NULL,
  end_ms INTEGER NOT NULL,
  is_all_day INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_calendar_events_start ON calendar_events(start_ms);
CREATE INDEX IF NOT EXISTS idx_calendar_events_end ON calendar_events(end_ms);
