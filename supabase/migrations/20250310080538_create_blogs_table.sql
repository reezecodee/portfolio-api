CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    lang_type TEXT NOT NULL,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    link TEXT NOT NULL,
    min_read INTEGER NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
)