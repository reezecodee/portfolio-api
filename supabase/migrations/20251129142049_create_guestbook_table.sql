-- TABEL VISITORS
CREATE TABLE IF NOT EXISTS visitors (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  email TEXT,
  name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user'))
);

ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" 
ON visitors FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" 
ON visitors FOR INSERT WITH CHECK (auth.uid() = id);

-- TRIGGER COPY DATA USER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.visitors (id, email, name, avatar_url)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url' 
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- TABEL GUESTBOOK (Dengan Relasi ke Visitors)
CREATE TABLE IF NOT EXISTS guestbook (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  user_id UUID REFERENCES visitors(id) NOT NULL, -- Relasi
  message TEXT NOT NULL,       
  is_visible BOOLEAN DEFAULT true 
);

ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view visible messages" 
ON "guestbook" FOR SELECT 
TO public 
USING (is_visible = true);

CREATE POLICY "Authenticated users can insert messages" 
ON "guestbook" FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);