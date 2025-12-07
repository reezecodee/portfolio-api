import { type Context } from "hono";
import * as service from "./experience.service";

export const getExperiences = async (c: Context) => {
  try {
    const { data, error } = await service.getAllExperiences();

    if (error) {
      return c.json(
        {
          success: false,
          message: "Daftar pengalaman belum tersedia",
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
