import { Hono } from "hono";
import { authMiddleware } from "../../middlewares/auth.middleware";
import * as controller from "./guestbook.controller";

const route = new Hono();

// Public Routes
route.get("/", controller.getMessages);
route.post("/", authMiddleware, controller.postMessage);

// Admin Routes
route.get("/admin/all", controller.getAdminList);
route.patch("/:id/visibility", controller.toggleVisibility);
route.delete("/:id", controller.remove);

export default route;
