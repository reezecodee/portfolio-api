import { Hono } from "hono";
import { supabase } from "../config/supabase";

const projectRoute: Hono = new Hono();

projectRoute.get("/", async (c) => {
  const { data, error } = await supabase.from("projects").select("*");
  if (error) return c.json({ error: error.message }, 500);

  const grouped = data.reduce((acc, item) => {
    if (!acc[item.project_type]) {
      acc[item.project_type] = [];
    }

    acc[item.project_type].push.item;
    return acc;
  }, {});

  return c.json(grouped);
});

export default projectRoute;
