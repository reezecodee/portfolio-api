import { type Context } from "hono";
import * as service from "./project.service";

export const getList = async (c: Context) => {
  try {
    const { data, error } = await service.getAllProjects();

    if (error) {
      return c.json(
        {
          success: false,
          message: "Gagal memuat list projects",
          error: error.message,
        },
        500
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
        404
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
