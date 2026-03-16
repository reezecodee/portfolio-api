import { supabase } from "../../config/supabase";
import { formatDate } from "../../utils/format-date";

const formatMsg = (item: any) => ({
  ...item,
  visitors: {
    ...(item.visitors || {}),
    initial: (item.visitors?.name || "A").charAt(0).toUpperCase(),
  },
  created_at: formatDate(item.created_at, "numeric"),
});

export const getMessages = async (page = 1, limit = 10) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  const { data, count, error } = await supabase
    .from("guestbook")
    .select(
      `id, message, is_visible, created_at, visitors (name, avatar_url)`,
      { count: "exact" },
    )
    .eq("is_visible", true)
    .order("created_at", { ascending: false })
    .range(from, to);

  return { data: (data || []).map(formatMsg), total: count, error };
};

export const getAdminMessages = () =>
  supabase
    .from("guestbook")
    .select(`id, message, is_visible, created_at, visitors (name)`)
    .order("created_at", { ascending: false });

export const createMessage = (userId: string, message: string) =>
  supabase
    .from("guestbook")
    .insert([{ user_id: userId, message }])
    .select()
    .single();

export const updateVisibility = (id: string, isVisible: boolean) =>
  supabase
    .from("guestbook")
    .update({ is_visible: isVisible })
    .eq("id", id)
    .select()
    .single();

export const deleteMessage = (id: string) =>
  supabase.from("guestbook").delete().eq("id", id);
