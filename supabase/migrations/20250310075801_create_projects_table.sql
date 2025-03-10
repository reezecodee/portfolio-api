CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    thumbnail TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    skill_icons TEXT[] NOT NULL CHECK (array_length(skill_icons, 1) > 0),
    project_type TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
)