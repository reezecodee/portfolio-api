import { supabase } from "../../config/supabase";

export const getAllExperiences = async () => {
  return await supabase
    .from("experiences")
    .select("*")
    .order("start_date", { ascending: false });
};
