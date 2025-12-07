import { type Context } from "hono";
import * as service from "./education.service";

export const getEducations = async (c: Context) => {
  try {
    const { data, error } = await service.getAllEducations();

    if (error) {
      return c.json(
        {
          success: false,
          message: "Daftar edukasi belum tersedia",
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
