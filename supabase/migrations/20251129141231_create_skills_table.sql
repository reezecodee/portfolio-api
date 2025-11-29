CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,           
  category TEXT NOT NULL,       
  logo_url TEXT,                
  display_order INTEGER DEFAULT 0 
);

ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" 
ON "public"."skills"
AS PERMISSIVE FOR SELECT 
TO public 
USING (true);