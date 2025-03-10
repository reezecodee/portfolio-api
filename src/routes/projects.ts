import { Hono } from "hono";
import { supabase } from "../config/supabase";

const projectRoute: Hono = new Hono();

projectRoute.get("/", async (c) => {
  const { data, error } = await supabase.from("projects").select("*");
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data);
});

export default projectRoute;
