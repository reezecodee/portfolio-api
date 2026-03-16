import { type Context } from "hono";
import * as service from "./experience.service";

export const getExperiences = async (c: Context) => {
  const { data, error } = await service.getAllExperiences();
  if (error) return c.json({ success: false, message: error.message }, 500);
  return c.json({ success: true, data });
};

export const createExp = async (c: Context) => {
  const body = await c.req.json();
  const { data, error } = await service.createExperience(body);
  if (error) return c.json({ success: false, message: error.message }, 400);
  return c.json({ success: true, message: "Experience created", data }, 201);
};

export const updateExp = async (c: Context) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const { data, error } = await service.updateExperience(id, body);
  if (error) return c.json({ success: false, message: error.message }, 400);
  return c.json({ success: true, message: "Experience updated", data });
};

export const deleteExp = async (c: Context) => {
  const id = c.req.param("id");
  const { error } = await service.deleteExperience(id);
  if (error) return c.json({ success: false, message: error.message }, 400);
  return c.json({ success: true, message: "Experience deleted" });
};
