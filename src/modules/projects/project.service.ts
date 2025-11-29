import { supabase } from "../../config/supabase";

export const getAllProjects = async () => {
  return await supabase
    .from("projects")
    .select("id, title, slug, summary, image_url, category, tools")
    .order("display_order", { ascending: true }) 
    .order("created_at", { ascending: false }); 
};

export const getProjectBySlug = async (slug: string) => {
  return await supabase.from("projects").select("*").eq("slug", slug).single();
};
