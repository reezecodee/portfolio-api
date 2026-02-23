import z from "zod";

export const EXPERIENCE_SCHEMA = z.object({
  position: z.string().trim().min(1, "Posisi wajib diisi"),
  company: z.string().trim().min(1, "Nama perusahaan wajib diisi"),
  location: z.string().trim().min(1, "Lokasi wajib diisi"),
  start_date: z.string().trim().min(1, "Tanggal mulai wajib diisi"),
  end_date: z.string().nullable().optional().or(z.literal("")),
  description: z.array(z.string()).default([]),
  display_order: z.number().optional().default(0),
});
