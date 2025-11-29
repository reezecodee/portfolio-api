import { type Context } from "hono";
import * as service from "./education.service";

export const getEducations = async (c: Context) => {
  try {
    const { data, error } = await service.getAllEducations();

    if (error) {
      return c.json(
        {
          success: false,
          message: "Gagal memuat data education",
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
