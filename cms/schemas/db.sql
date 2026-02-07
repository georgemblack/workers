CREATE TABLE posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    published TEXT NOT NULL,
    updated TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL,
    external_link TEXT,
    content TEXT NOT NULL,
    deleted INTEGER NOT NULL DEFAULT 0
);