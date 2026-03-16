import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { BLOG_SCHEMA } from "./blog.schema";
import * as controller from "./blog.controller";

const route = new Hono();

// Public Routes
route.get("/", controller.getList);
route.get("/:slug", controller.getDetail);

// Admin Routes
route.get("/admin/all", controller.getAdminList);
route.post("/", zValidator("json", BLOG_SCHEMA), controller.create);
route.put("/:id", zValidator("json", BLOG_SCHEMA), controller.update);
route.delete("/:id", controller.remove);

export default route;
