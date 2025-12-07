import { supabase } from "../../config/supabase";
import { formatDate } from "../../utils/format-date";

export const getMessages = async () => {
  const { data, error } = await supabase
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
    `
    )
    .eq("is_visible", true)
    .order("created_at", { ascending: false })
    .limit(15);

  if (error) return { data: null, error };

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
