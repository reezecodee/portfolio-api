import { supabase } from "../../config/supabase";

const CATEGORY_ORDER = [
  "Languages",
  "Frameworks",
  "Libraries",
  "Databases",
  "Tools",
  "Cloud",
];

export const getAllSkills = async () => {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) return { data: null, error };

  const tempGroup = (data || []).reduce((acc: any, skill) => {
    const cat = skill.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
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

  return {
    data: sortedResult,
    error: null,
  };
};
