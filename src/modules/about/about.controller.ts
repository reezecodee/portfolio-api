import { type Context } from "hono";
import * as service from "./about.service";

export const getAboutData = async (c: Context) => {
  try {
    const { data, error } = await service.getProfile();

    if (error) {
      return c.json(
        {
          success: false,
          message: "Data profile belum tersedia",
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
