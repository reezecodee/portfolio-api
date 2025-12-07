import { type Context } from "hono";
import * as service from "./blog.service";

export const getList = async (c: Context) => {
  try {
    const { data, error } = await service.getBlogList();

    if (error) {
      return c.json(
        {
          success: false,
          message: "Daftar blog belum tersedia",
          error: error.message,
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

export const getDetail = async (c: Context) => {
  try {
    const slug = c.req.param("slug");
    const { data, error } = await service.getBlogBySlug(slug);

    if (error || !data) {
      return c.json(
        {
          success: false,
          message: "Artikel tidak ditemukan atau belum dipublish",
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
