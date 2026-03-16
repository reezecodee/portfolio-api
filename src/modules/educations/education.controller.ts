import { type Context } from "hono";
import * as service from "./education.service";

export const getEducations = async (c: Context) => {
  const { data, error } = await service.getAllEducations();
  if (error) return c.json({ success: false, message: error.message }, 500);
  return c.json({ success: true, data });
};

export const createEdu = async (c: Context) => {
  const body = await c.req.json();
  const { data, error } = await service.createEducation(body);
  if (error) return c.json({ success: false, message: error.message }, 400);
  return c.json({ success: true, message: "Education created", data }, 201);
};

export const updateEdu = async (c: Context) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const { data, error } = await service.updateEducation(id, body);
  if (error) return c.json({ success: false, message: error.message }, 400);
  return c.json({ success: true, message: "Education updated", data });
};

export const deleteEdu = async (c: Context) => {
  const id = c.req.param("id");
  const { error } = await service.deleteEducation(id);
  if (error) return c.json({ success: false, message: error.message }, 400);
  return c.json({ success: true, message: "Education deleted" });
};
