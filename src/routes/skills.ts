import { Hono } from "hono";
import { supabase } from "../config/supabase";

const skillRoute: Hono = new Hono();

skillRoute.get("/", async (c) => {
  const { data, error } = await supabase.from("skills").select("*");
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data);
});

export default skillRoute;
