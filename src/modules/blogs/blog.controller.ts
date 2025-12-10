import { type Context } from "hono";
import * as service from "./blog.service";

export const getList = async (c: Context) => {
  try {
    const page = parseInt(c.req.query("page") || "1");
    const limit = parseInt(c.req.query("limit") || "6");
    const { data, total, error } = await service.getBlogList(page, limit);

    if (error) {
      return c.json(
        {
          success: false,
          message: "Gagal memuat daftar blog",
          error: error.message,
        },
        500
      );
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
    console.error(e);
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
