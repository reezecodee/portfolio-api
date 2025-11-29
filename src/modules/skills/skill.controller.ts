import { type Context } from "hono";
import * as service from "./skill.service";

export const getSkills = async (c: Context) => {
  try {
    const { data, error } = await service.getAllSkills();

    if (error) {
      return c.json(
        {
          success: false,
          message: "Gagal memuat data skills",
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
