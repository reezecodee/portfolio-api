import { type Context } from "hono";
import * as service from "./project.service";

export const getList = async (c: Context) => {
  try {
    const page = parseInt(c.req.query("page") || "1");
    const limit = parseInt(c.req.query("limit") || "6");
    const category = c.req.query("category") || "";

    const { data, total, error } = await service.getProjects(
      page,
      limit,
      category,
    );

    if (error) {
      return c.json({ success: false, message: error.message }, 500);
    }

    return c.json({
      success: true,
      data: data,
      pagination: {
        current_page: page,
        per_page: limit,
        total_data: total,
        total_pages: Math.ceil((total || 0) / limit),
      },
    });
  } catch (e: any) {
    return c.json({ success: false, message: "Internal Server Error" }, 500);
  }
};

export const getDetail = async (c: Context) => {
  try {
    const slug = c.req.param("slug");
    const { data, error } = await service.getProjectBySlug(slug);

    if (error || !data) {
      return c.json(
        {
          success: false,
          message: "Project tidak ditemukan",
        },
        404,
      );
    }

    return c.json({
      success: true,
      data: data,
    });
  } catch (e) {
    return c.json({ success: false, message: "Internal Server Error" }, 500);
  }
};

export const getAdminProjects = async (c: Context) => {
  const { data, error } = await service.getAdminList();
  if (error) return c.json({ success: false, message: error.message }, 400);
  return c.json({ success: true, data });
};

export const create = async (c: Context) => {
  const body = await c.req.json();
  const { data, error } = await service.createProject(body);
  if (error) return c.json({ success: false, message: error.message }, 400);
  return c.json({ success: true, data }, 201);
};

export const update = async (c: Context) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const { data, error } = await service.updateProject(id, body);
  if (error) return c.json({ success: false, message: error.message }, 400);
  return c.json({ success: true, data });
};

export const remove = async (c: Context) => {
  const id = c.req.param("id");
  const { error } = await service.deleteProject(id);
  if (error) return c.json({ success: false, message: error.message }, 400);
  return c.json({ success: true, message: "Project deleted" });
};
