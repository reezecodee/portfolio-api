import { supabase } from "../../config/supabase";
import { formatDate } from "../../utils/format-date";

export const getBlogList = async () => {
  const { data, error } = await supabase
    .from("blogs")
    .select(
      "id, title, slug, summary, cover_image, language, tags, published_at, views"
    )
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (error) return { data: null, error };

  const formattedDate = data.map((item) => ({
    ...item,
    published_at: formatDate(item.published_at, "numeric"),
  }));

  return {
    data: formattedDate,
    error: null,
  };
};

export const getBlogBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error) return { data: null, error };

  const formattedData = {
    ...data,
    published_at: formatDate(data.published_at, "numeric"),
    created_at: formatDate(data.created_at, "numeric"),
  };

  return { data: formattedData, error: null };
};
