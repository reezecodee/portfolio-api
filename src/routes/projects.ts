import { Hono } from "hono";
import { supabase } from "../config/supabase";

const projectRoute: Hono = new Hono();

projectRoute.get("/", async (c) => {
  const { data: typeData, error: typeError } = await supabase
    .from("projects")
    .select("project_type")
    .neq("project_type", null);

  if (typeError) {
    return c.json({ error: typeError.message }, 500);
  }

  const projectTypes = Array.from(
    new Set(typeData?.map((item) => item.project_type))
  );

  const grouped: Record<string, any[]> = {};

  for (const type of projectTypes) {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("project_type", type)
      .limit(6)
      .order("created_at", { ascending: true });

    if (error) {
      return c.json({ error: error.message }, 500);
    }

    grouped[type] = data || [];
  }

  return c.json(grouped);
});

projectRoute.get("/specifics", async (c) => {
  const offset = Number(c.req.query("offset") || 6);
  const limit = 6;
  const projectType = c.req.query("project_type");

  if (!projectType) {
    return c.json({ error: "Missing project_type parameter" }, 400);
  }

  const { data, count, error } = await supabase
    .from("projects")
    .select("*", { count: "exact" })
    .eq("project_type", projectType)
    .range(offset, offset + limit - 1)
    .order("created_at", { ascending: true });

  if (error) {
    return c.json({ error: error.message }, 500);
  }

  return c.json({
    data,
    meta: {
      total: count,
      offset,
      has_more: count !== null ? offset + limit < count : false,
    },
  });
});

export default projectRoute;
