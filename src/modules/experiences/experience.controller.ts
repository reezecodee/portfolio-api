import { type Context } from "hono";
import * as service from "./experience.service";

export const getExperiences = async (c: Context) => {
  try {
    const { data, error } = await service.getAllExperiences();

    if (error) {
      return c.json(
        {
          success: false,
          message: "Gagal memuat data experiences",
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
