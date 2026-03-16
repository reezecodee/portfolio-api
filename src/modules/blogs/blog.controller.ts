import { type Context } from "hono";
import * as service from "./blog.service";

export const getList = async (c: Context) => {
  try {
    const page = parseInt(c.req.query("page") || "1");
    const limit = parseInt(c.req.query("limit") || "6");
    const { data, total, error } = await service.getBlogList(page, limit);
    if (error) return c.json({ success: false, message: error.message }, 500);

    return c.json({
      success: true,
      data,
      pagination: {
        current_page: page,
        per_page: limit,
        total_data: total,
        total_pages: Math.ceil((total || 0) / limit),
      },
    });
  } catch (e) {
    return c.json({ success: false, message: "Internal Server Error" }, 500);
  }
};

export const getAdminList = async (c: Context) => {
  const { data, error } = await service.getAdminBlogList();
  if (error) return c.json({ success: false, message: error.message }, 400);
  return c.json({ success: true, data });
};

export const getDetail = async (c: Context) => {
  const slug = c.req.param("slug");
  const { data, error } = await service.getBlogBySlug(slug);
  if (error || !data)
    return c.json({ success: false, message: "Not Found" }, 404);
  return c.json({ success: true, data });
};

export const create = async (c: Context) => {
  const body = await c.req.json();
  const { data, error } = await service.createBlog(body);
  if (error) return c.json({ success: false, message: error.message }, 400);
  return c.json({ success: true, data }, 201);
};

export const update = async (c: Context) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const { data, error } = await service.updateBlog(id, body);
  if (error) return c.json({ success: false, message: error.message }, 400);
  return c.json({ success: true, data });
};

export const remove = async (c: Context) => {
  const id = c.req.param("id");
  const { error } = await service.deleteBlog(id);
  if (error) return c.json({ success: false, message: error.message }, 400);
  return c.json({ success: true, message: "Blog deleted" });
};
