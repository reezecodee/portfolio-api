import { supabase } from '../../config/supabase';

export const getMessages = async () => {
  return await supabase
    .from('guestbook')
    .select(`
      id,
      message,
      created_at,
      visitors (
        name,
        avatar_url
      )
    `) 
    .eq('is_visible', true)
    .order('created_at', { ascending: false })
    .limit(15); 
};

export const createMessage = async (userId: string, message: string) => {
  return await supabase
    .from('guestbook')
    .insert([
      { 
        user_id: userId, 
        message: message 
      } 
    ])
    .select()
    .single();
};