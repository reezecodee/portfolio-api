import { z } from "zod";

export const PROJECT_SCHEMA = z.object({
  title: z.string().trim().min(1, "Judul wajib diisi"),
  slug: z.string().trim().lowercase().min(1, "Slug wajib diisi"),
  summary: z.string().trim().min(1, "Summary wajib diisi"),
  image_url: z.string().trim().url().optional().or(z.literal("")),
  category: z.string().trim().min(1, "Kategori wajib diisi"),
  language: z.enum(["ID", "EN"]).default("ID"),
  content: z.string().trim().min(1, "Konten wajib diisi"),
  tools: z.array(z.string()).default([]),
  demo_url: z.string().trim().optional().or(z.literal("")),
  repo_url: z.string().trim().optional().or(z.literal("")),
  is_featured: z.boolean().optional().default(false),
  display_order: z.number().optional().default(0),
});
