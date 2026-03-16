import { supabase } from "../../config/supabase";

export const getActiveProfile = () =>
  supabase.from("about").select("*").eq("is_active", true).single();

export const getAllProfiles = () =>
  supabase.from("about").select("*").order("created_at", { ascending: false });

export const createProfile = (payload: any) =>
  supabase.from("about").insert(payload).select().single();

export const updateProfile = (id: string, payload: any) =>
  supabase.from("about").update(payload).eq("id", id).select().single();

export const deleteProfile = (id: string) =>
  supabase.from("about").delete().eq("id", id);
