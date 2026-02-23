import { z } from "zod";

export const SKILL_SCHEMA = z.object({
  name: z.string().trim().min(1, "Nama skill wajib diisi"),
  category: z.string().trim().min(1, "Kategori wajib diisi"),
  logo_url: z.string().trim().optional().or(z.literal("")),
  display_order: z.number().optional().default(0),
});
