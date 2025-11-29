import { supabase } from "../../config/supabase";

export const getAllEducations = async () => {
  return await supabase
    .from("educations")
    .select("*")
    .order("display_order", { ascending: true })
    .order("start_date", { ascending: false });
};
