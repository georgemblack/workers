CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value INTEGER NOT NULL
);

-- Passkey registration starts closed. See "Registering a new passkey" in the README.
INSERT OR IGNORE INTO settings (key, value) VALUES ('registration_open_until', 0);
