CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT NOT NULL,
    dark_invert BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
