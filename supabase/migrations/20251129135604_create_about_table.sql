CREATE TABLE IF NOT EXISTS about (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name TEXT NOT NULL,
  headline TEXT,
  bio TEXT,
  avatar_url TEXT,
  email TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  is_active BOOLEAN DEFAULT true
);

ALTER TABLE about ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" 
ON "public"."about"
AS PERMISSIVE FOR SELECT 
TO public 
USING (true);