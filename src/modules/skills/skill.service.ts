import { supabase } from "../../config/supabase";

export const getAllSkills = async () => {
  return await supabase
    .from("skills")
    .select("*")
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });
};
