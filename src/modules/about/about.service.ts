import { supabase } from "../../config/supabase";

export const getProfile = async () => {
  return await supabase
    .from("about")
    .select("*")
    .eq("is_active", true)
    .single();
};
