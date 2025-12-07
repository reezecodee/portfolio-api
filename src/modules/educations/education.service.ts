import { supabase } from "../../config/supabase";
import { formatYear } from "../../utils/format-date";

export const getAllEducations = async () => {
  const { data, error } = await supabase
    .from("educations")
    .select("*")
    .order("display_order", { ascending: true })
    .order("start_date", { ascending: false });

  if (error) return { data: null, error };

  const formattedDate = data.map((item) => ({
    ...item,
    start_date: formatYear(item.start_date),
    end_date: formatYear(item.end_date),
    duration_string: `${formatYear(item.start_date)} - ${formatYear(
      item.end_date
    )}`,
  }));

  return {
    data: formattedDate,
    error: null,
  };
};
