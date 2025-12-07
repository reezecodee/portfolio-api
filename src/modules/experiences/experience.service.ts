import { supabase } from "../../config/supabase";
import { formatDate } from "../../utils/format-date";

export const getAllExperiences = async () => {
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("start_date", { ascending: false });

  if (error) return { data: null, error };

  const formattedData = data.map((item) => ({
    ...item,
    start_date: formatDate(item.start_date),
    end_date: formatDate(item.end_date),
    duration_string: `${formatDate(item.start_date)} - ${formatDate(
      item.end_date
    )}`,
  }));

  return {
    data: formattedData,
    error: null,
  };
};
