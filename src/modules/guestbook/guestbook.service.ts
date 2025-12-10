import { supabase } from "../../config/supabase";
import { formatDate } from "../../utils/format-date";

export const getMessages = async (page = 1, limit = 2) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await supabase
    .from("guestbook")
    .select(
      `
      id,
      message,
      created_at,
      visitors (
        name,
        avatar_url
      )
    `,
      { count: "exact" }
    )
    .eq("is_visible", true)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) return { data: null, total: 0, error };

  const formattedMessage = data.map((item) => {
    const visitor = Array.isArray(item.visitors)
      ? item.visitors[0]
      : item.visitors;

    const safeVisitor = visitor || {};
    const name = safeVisitor.name || "Anonymous";

    return {
      ...item,
      visitors: {
        ...safeVisitor,
        initial: name.charAt(0).toUpperCase(),
      },
      created_at: formatDate(item.created_at, "numeric"),
    };
  });

  return {
    data: formattedMessage,
    total: count,
    error: null,
  };
};

export const createMessage = async (userId: string, message: string) => {
  return await supabase
    .from("guestbook")
    .insert([
      {
        user_id: userId,
        message: message,
      },
    ])
    .select()
    .single();
};
