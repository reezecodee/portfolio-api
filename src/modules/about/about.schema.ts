import z from "zod";

export const ABOUT_SCHEMA = z.object({
  full_name: z.string().trim(),
  headline: z.string().trim(),
  bio: z.string().trim().optional().or(z.literal("")),
  avatar_url: z.string().trim().optional().or(z.literal("")),
  email: z.string().trim().optional().or(z.literal("")),
  linkedin_url: z.string().trim().optional().or(z.literal("")),
  github_url: z.string().trim().optional().or(z.literal("")),
  is_active: z.boolean().optional().default(false),
});
