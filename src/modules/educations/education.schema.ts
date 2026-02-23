import z from "zod";

export const EDUCATION_SCHEMA = z.object({
  institution: z.string().trim().min(1, "Nama institusi wajib diisi"),
  degree: z.string().trim().min(1, "Gelar/Jurusan wajib diisi"),
  location: z.string().trim().optional().or(z.literal("")),
  start_date: z.string().trim().min(1, "Tanggal mulai wajib diisi"),
  end_date: z.string().nullable().optional().or(z.literal("")),
  score: z.string().trim().optional().or(z.literal("")),
  description: z.array(z.string()).default([]),
  display_order: z.number().optional().default(0),
});
