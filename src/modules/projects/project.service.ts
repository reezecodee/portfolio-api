import { supabase } from "../../config/supabase";

const CATEGORY_ORDER = [
  "Web Development",
  "Mobile Development",
  "Machine Learning",
  "Backend API",
  "Tools",
];

export const getAllProjects = async () => {
  const { data, error } = await supabase
    .from("projects")
    .select("id, title, slug, summary, image_url, category, tools")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) return { data: null, error };

  const tempGroup = (data || []).reduce((acc: any, proj) => {
    const cat = proj.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(proj);
    return acc;
  }, {});

  const sortedResult = CATEGORY_ORDER.filter((cat) => tempGroup[cat]).map(
    (cat) => ({
      category: cat,
      items: tempGroup[cat],
    })
  );

  Object.keys(tempGroup).forEach((cat) => {
    if (!CATEGORY_ORDER.includes(cat)) {
      sortedResult.push({
        category: cat,
        items: tempGroup[cat],
      });
    }
  });

  return { data: sortedResult, error: null };
};

export const getProjectBySlug = async (slug: string) => {
  return await supabase.from("projects").select("*").eq("slug", slug).single();
};
