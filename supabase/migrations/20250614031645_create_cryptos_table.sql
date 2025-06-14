CREATE TABLE cryptos (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT NOT NULL,
    percent TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
)