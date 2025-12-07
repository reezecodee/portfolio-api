import { type Context } from "hono";
import * as service from "./skill.service";

export const getSkills = async (c: Context) => {
  try {
    const { data, error } = await service.getAllSkills();

    if (error) {
      return c.json(
        {
          success: false,
          message: "Daftar kemampuan belum tersedia",
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
