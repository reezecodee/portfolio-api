import { type Context } from "hono";
import * as service from "./about.service";

export const getAboutData = async (c: Context) => {
  try {
    const { data, error } = await service.getActiveProfile();
    if (error)
      return c.json({ success: false, message: "Data tidak ditemukan" }, 404);
    return c.json({ success: true, data });
  } catch (e) {
    return c.json({ success: false, message: "Internal Server Error" }, 500);
  }
};

export const getAboutList = async (c: Context) => {
  try {
    const { data, error } = await service.getAllProfiles();
    if (error) return c.json({ success: false, message: error.message }, 400);
    return c.json({ success: true, data });
  } catch (e) {
    return c.json({ success: false, message: "Internal Server Error" }, 500);
  }
};

export const createAbout = async (c: Context) => {
  try {
    const body = await c.req.json();
    const { data, error } = await service.createProfile(body);
    if (error) return c.json({ success: false, message: error.message }, 400);
    return c.json({ success: true, message: "Profile created", data }, 201);
  } catch (e) {
    return c.json({ success: false, message: "Internal Server Error" }, 500);
  }
};

export const updateAbout = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { data, error } = await service.updateProfile(id, body);
    if (error) return c.json({ success: false, message: error.message }, 400);
    return c.json({ success: true, message: "Profile updated", data });
  } catch (e) {
    return c.json({ success: false, message: "Internal Server Error" }, 500);
  }
};

export const deleteAbout = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const { error } = await service.deleteProfile(id);
    if (error) return c.json({ success: false, message: error.message }, 400);
    return c.json({ success: true, message: "Profile deleted" });
  } catch (e) {
    return c.json({ success: false, message: "Internal Server Error" }, 500);
  }
};
