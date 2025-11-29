CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  title TEXT NOT NULL,              
  slug TEXT UNIQUE NOT NULL,        
  content TEXT NOT NULL,            
  summary TEXT,                     
  cover_image TEXT,                 
  language TEXT DEFAULT 'ID',       
  tags TEXT[],                      
  is_published BOOLEAN DEFAULT false, 
  published_at TIMESTAMP WITH TIME ZONE, 
  views INTEGER DEFAULT 0           
);

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published blogs" 
ON "public"."blogs"
AS PERMISSIVE FOR SELECT 
TO public 
USING (is_published = true);