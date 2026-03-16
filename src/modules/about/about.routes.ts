import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { ABOUT_SCHEMA } from "./about.schema";
import * as controller from "./about.controller";

const route = new Hono();

// Public Routes
route.get("/active", controller.getAboutData);

// Admin Routes
route.get("/", controller.getAboutList);
route.post("/", zValidator("json", ABOUT_SCHEMA), controller.createAbout);
route.put("/:id", zValidator("json", ABOUT_SCHEMA), controller.updateAbout);
route.delete("/:id", controller.deleteAbout);

export default route;
