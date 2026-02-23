import z from "zod";

export const GUESTBOOK_SCHEMA = z.object({
  user_id: z.string().trim().min(1, "User ID wajib ada"),
  message: z
    .string()
    .trim()
    .min(1, "Pesan tidak boleh kosong")
    .max(200, "Pesan maksimal 200 karakter"),
  is_visible: z.boolean().optional().default(false),
});
