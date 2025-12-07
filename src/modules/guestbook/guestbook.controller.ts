import { type Context } from "hono";
import * as service from "./guestbook.service";

export const getMessages = async (c: Context) => {
  try {
    const { data, error } = await service.getMessages();

    if (error) {
      return c.json(
        {
          success: false,
          message: "Daftar pesan belum tersedia",
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

export const postMessage = async (c: Context) => {
  try {
    const body = await c.req.json();
    const { message } = body;

    const payload = c.get("jwtPayload");
    const userId = payload.sub;

    if (!message) {
      return c.json({ error: "Pesan tidak boleh kosong" }, 400);
    }

    const { data, error } = await service.createMessage(userId, message);

    if (error) return c.json({ error: error.message }, 500);

    return c.json(
      {
        success: true,
        message: "Pesan berhasil dikirim!",
        data,
      },
      201
    );
  } catch (e) {
    return c.json({ error: "Unauthorized atau Bad Request" }, 401);
  }
};
