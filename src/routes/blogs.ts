import { Hono } from "hono";
import { supabase } from "../config/supabase";

const blogRoute: Hono = new Hono();

blogRoute.get("/", async (c) => {
  const { data, error } = await supabase.from("blogs").select("*");
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data);
});

export default blogRoute;
