import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { PROJECT_SCHEMA } from "./project.schema";
import * as controller from "./project.controller";

const route = new Hono();

// Public Routes
route.get("/", controller.getList);
route.get("/:slug", controller.getDetail);

// Admin Routes
route.get("/admin/all", controller.getAdminProjects);
route.post("/", zValidator("json", PROJECT_SCHEMA), controller.create);
route.put("/:id", zValidator("json", PROJECT_SCHEMA), controller.update);
route.delete("/:id", controller.remove);

export default route;
