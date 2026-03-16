import { type Context } from "hono";
import * as service from "./guestbook.service";

export const getMessages = async (c: Context) => {
  const page = parseInt(c.req.query("page") || "1");
  const limit = parseInt(c.req.query("limit") || "10");
  const { data, total, error } = await service.getMessages(page, limit);

  if (error) return c.json({ success: false, message: error.message }, 500);
  return c.json({
    success: true,
    data,
    pagination: { current_page: page, total_data: total },
  });
};

export const getAdminList = async (c: Context) => {
  const { data, error } = await service.getAdminMessages();
  if (error) return c.json({ success: false, message: error.message }, 400);
  return c.json({ success: true, data });
};

export const postMessage = async (c: Context) => {
  try {
    const { message } = await c.req.json();
    const payload = c.get("jwtPayload");
    const { data, error } = await service.createMessage(payload.sub, message);
    if (error) return c.json({ success: false, message: error.message }, 400);
    return c.json({ success: true, data }, 201);
  } catch (e) {
    return c.json({ success: false, message: "Unauthorized" }, 401);
  }
};

export const toggleVisibility = async (c: Context) => {
  const id = c.req.param("id");
  const { is_visible } = await c.req.json();
  const { data, error } = await service.updateVisibility(id, is_visible);
  if (error) return c.json({ success: false, message: error.message }, 400);
  return c.json({ success: true, data });
};

export const remove = async (c: Context) => {
  const id = c.req.param("id");
  const { error } = await service.deleteMessage(id);
  if (error) return c.json({ success: false, message: error.message }, 400);
  return c.json({ success: true, message: "Deleted" });
};
