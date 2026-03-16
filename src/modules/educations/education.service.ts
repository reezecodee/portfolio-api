import { supabase } from "../../config/supabase";
import { formatYear } from "../../utils/format-date";

const formatEdu = (item: any) => ({
  ...item,
  start_date: formatYear(item.start_date),
  end_date: formatYear(item.end_date),
  duration_string: `${formatYear(item.start_date)} - ${formatYear(item.end_date)}`,
});

export const getAllEducations = async () => {
  const { data, error } = await supabase
    .from("educations")
    .select("*")
    .order("display_order", { ascending: true })
    .order("start_date", { ascending: false });

  if (error) return { data: null, error };
  return { data: data.map(formatEdu), error: null };
};

export const createEducation = (payload: any) =>
  supabase.from("educations").insert(payload).select().single();

export const updateEducation = (id: string, payload: any) =>
  supabase.from("educations").update(payload).eq("id", id).select().single();

export const deleteEducation = (id: string) =>
  supabase.from("educations").delete().eq("id", id);
