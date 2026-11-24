-- Browser sessions created before this time (in seconds) are no longer valid.
-- "Sign out everywhere" sets it to now. See endAllSessions in src/storage.ts.
INSERT OR IGNORE INTO settings (key, value) VALUES ('sessions_valid_after', 0);
