CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  title TEXT NOT NULL,              
  slug TEXT UNIQUE NOT NULL,        
  summary TEXT,                     
  image_url TEXT,                   
  category TEXT NOT NULL,           
  content TEXT,                     
  tools TEXT[],                     
  demo_url TEXT,                    
  repo_url TEXT,                    
  is_featured BOOLEAN DEFAULT false, 
  display_order INTEGER DEFAULT 0    
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" 
ON "public"."projects"
AS PERMISSIVE FOR SELECT 
TO public 
USING (true);