-- Track when each event was written (UTC epoch ms) so we can drop events left
-- over from a previous day's sync. Existing rows get 0 and are cleaned up on the
-- next write.
ALTER TABLE calendar_events ADD COLUMN added_at INTEGER NOT NULL DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_calendar_events_added_at ON calendar_events(added_at);
