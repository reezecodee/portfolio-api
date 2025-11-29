CREATE TABLE IF NOT EXISTS experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  position TEXT NOT NULL,       
  company TEXT NOT NULL,        
  location TEXT,                
  start_date DATE NOT NULL,     
  end_date DATE,                
  description TEXT[],           
  display_order INTEGER DEFAULT 0
);

ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" 
ON "public"."experiences"
AS PERMISSIVE FOR SELECT 
TO public 
USING (true);