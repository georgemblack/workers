-- The activity log shown at /admin/activity. One row per successful sign-in or
-- change. See src/audit.ts for the events and what `details` holds for each.
CREATE TABLE IF NOT EXISTS audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at INTEGER NOT NULL,
  event TEXT NOT NULL,
  -- Where the request came from, as reported by Cloudflare. Any can be NULL.
  ip TEXT,
  country TEXT,
  region TEXT,
  city TEXT,
  asn INTEGER,
  as_org TEXT,
  user_agent TEXT,
  ray_id TEXT,
  -- JSON. Its shape depends on `event`.
  details TEXT NOT NULL DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON audit_log (created_at);
CREATE INDEX IF NOT EXISTS idx_audit_log_event ON audit_log (event, id);
