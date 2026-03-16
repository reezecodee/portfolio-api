import { supabase } from "../../config/supabase";
import { formatDate } from "../../utils/format-date";

const formatExp = (item: any) => ({
  ...item,
  start_date: formatDate(item.start_date),
  end_date: item.end_date ? formatDate(item.end_date) : "Present",
  duration_string: `${formatDate(item.start_date)} - ${item.end_date ? formatDate(item.end_date) : "Present"}`,
});

export const getAllExperiences = async () => {
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("start_date", { ascending: false });

  if (error) return { data: null, error };
  return { data: data.map(formatExp), error: null };
};

export const createExperience = (payload: any) =>
  supabase.from("experiences").insert(payload).select().single();

export const updateExperience = (id: string, payload: any) =>
  supabase.from("experiences").update(payload).eq("id", id).select().single();

export const deleteExperience = (id: string) =>
  supabase.from("experiences").delete().eq("id", id);
