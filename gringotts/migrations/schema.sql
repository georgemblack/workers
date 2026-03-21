CREATE TABLE transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL,
  day INTEGER NOT NULL,
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  amount REAL NOT NULL,
  credit INTEGER NOT NULL DEFAULT 0,
  merchant TEXT,
  category TEXT,
  account TEXT NOT NULL,
  description TEXT NOT NULL,
  notes TEXT,
  tags TEXT,
  skipped INTEGER NOT NULL DEFAULT 0,
  reviewed INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE rules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  merchant TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL
);

CREATE INDEX idx_transactions_month ON transactions(month);
CREATE INDEX idx_transactions_year ON transactions(year);
CREATE INDEX idx_transactions_reviewed ON transactions(reviewed);
CREATE INDEX idx_transactions_skipped ON transactions(skipped);
CREATE INDEX idx_transactions_key ON transactions(key);
