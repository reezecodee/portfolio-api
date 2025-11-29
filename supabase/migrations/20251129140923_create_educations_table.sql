CREATE TABLE IF NOT EXISTS educations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  institution TEXT NOT NULL,    
  degree TEXT NOT NULL,         
  location TEXT,                
  start_date DATE NOT NULL,     
  end_date DATE,                
  score TEXT,                   
  description TEXT[],           
  display_order INTEGER DEFAULT 0
);

ALTER TABLE educations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" 
ON "public"."educations"
AS PERMISSIVE FOR SELECT 
TO public 
USING (true);