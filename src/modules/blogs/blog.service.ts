import { supabase } from "../../config/supabase";

export const getBlogList = async () => {
  return await supabase
    .from("blogs")
    .select(
      "id, title, slug, summary, cover_image, language, tags, published_at, views"
    )
    .eq("is_published", true)
    .order("published_at", { ascending: false });
};

export const getBlogBySlug = async (slug: string) => {
  const result = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();
  return result;
};
