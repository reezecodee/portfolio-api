import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { EXPERIENCE_SCHEMA } from "./experience.schema";
import * as controller from "./experience.controller";

const route = new Hono();

route.get("/", controller.getExperiences);
route.post("/", zValidator("json", EXPERIENCE_SCHEMA), controller.createExp);
route.put("/:id", zValidator("json", EXPERIENCE_SCHEMA), controller.updateExp);
route.delete("/:id", controller.deleteExp);

export default route;
