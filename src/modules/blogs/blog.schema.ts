import z from "zod";

export const BLOG_SCHEMA = z.object({
  title: z.string().trim().min(1),
  slug: z.string().trim().lowercase(),
  content: z.string().trim().min(1),
  summary: z.string().trim().min(1),
  cover_image: z.string().trim().optional().or(z.literal("")),
  language: z.enum(["ID", "EN"]).default("ID"),
  tags: z.array(z.string()).default([]),
  is_published: z.boolean().default(false),
  published_at: z.string().nullable().optional().or(z.literal("")),
  views: z.number().optional().default(0),
});
