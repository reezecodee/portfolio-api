import { type Context } from "hono";
import * as service from "./guestbook.service";

export const getMessages = async (c: Context) => {
  try {
    const page = parseInt(c.req.query("page") || "1");
    const limit = parseInt(c.req.query("limit") || "10");
    const { data, total, error } = await service.getMessages(page, limit);

    if (error) {
      return c.json(
        {
          success: false,
          message: "Daftar pesan belum tersedia",
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
