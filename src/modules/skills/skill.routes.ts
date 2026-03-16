import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { SKILL_SCHEMA } from "./skill.schema";
import * as controller from "./skill.controller";

const route = new Hono();

// Public Routes
route.get("/", controller.getSkills);

// Admin Routes
route.get("/admin/all", controller.getAdminSkills);
route.post("/", zValidator("json", SKILL_SCHEMA), controller.create);
route.put("/:id", zValidator("json", SKILL_SCHEMA), controller.update);
route.delete("/:id", controller.remove);

export default route;
