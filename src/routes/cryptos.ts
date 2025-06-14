import { Hono } from "hono";
import { supabase } from "../config/supabase";

const cryptoRoute: Hono = new Hono();

cryptoRoute.get("/", async (c) => {
  const { data, error } = await supabase.from("cryptos").select("*");
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data);
});

export default cryptoRoute;
