import { type Context } from "hono";
import * as service from "./skill.service";

export const getSkills = async (c: Context) => {
  const { data, error } = await service.getAllSkills();
  if (error) return c.json({ success: false, message: error.message }, 500);
  return c.json({ success: true, data });
};

export const getAdminSkills = async (c: Context) => {
  const { data, error } = await service.getAdminList();
  if (error) return c.json({ success: false, message: error.message }, 500);
  return c.json({ success: true, data });
};

export const create = async (c: Context) => {
  const body = await c.req.json();
  const { data, error } = await service.createSkill(body);
  if (error) return c.json({ success: false, message: error.message }, 400);
  return c.json({ success: true, message: "Skill created", data }, 201);
};

export const update = async (c: Context) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const { data, error } = await service.updateSkill(id, body);
  if (error) return c.json({ success: false, message: error.message }, 400);
  return c.json({ success: true, message: "Skill updated", data });
};

export const remove = async (c: Context) => {
  const id = c.req.param("id");
  const { error } = await service.deleteSkill(id);
  if (error) return c.json({ success: false, message: error.message }, 400);
  return c.json({ success: true, message: "Skill deleted" });
};
