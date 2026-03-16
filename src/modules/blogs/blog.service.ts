import { supabase } from "../../config/supabase";
import { formatDate } from "../../utils/format-date";

const formatBlogData = (item: any) => ({
  ...item,
  published_at: item.published_at
    ? formatDate(item.published_at, "numeric")
    : null,
  created_at: item.created_at ? formatDate(item.created_at, "numeric") : null,
});

export const getBlogList = async (page = 1, limit = 6) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  const { data, count, error } = await supabase
    .from("blogs")
    .select(
      "id, title, slug, summary, cover_image, language, tags, published_at, views, is_published",
      { count: "exact" },
    )
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .range(from, to);

  if (error) return { data: null, total: 0, error };
  return { data: data.map(formatBlogData), total: count, error: null };
};

export const getAdminBlogList = async () => {
  return await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });
};

export const getBlogBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) return { data: null, error };
  return { data: formatBlogData(data), error: null };
};

export const createBlog = (payload: any) =>
  supabase.from("blogs").insert(payload).select().single();

export const updateBlog = (id: string, payload: any) =>
  supabase
    .from("blogs")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

export const deleteBlog = (id: string) =>
  supabase.from("blogs").delete().eq("id", id);
