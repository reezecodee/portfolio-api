import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { EDUCATION_SCHEMA } from "./education.schema";
import * as controller from "./education.controller";

const route = new Hono();

route.get("/", controller.getEducations);
route.post("/", zValidator("json", EDUCATION_SCHEMA), controller.createEdu);
route.put("/:id", zValidator("json", EDUCATION_SCHEMA), controller.updateEdu);
route.delete("/:id", controller.deleteEdu);

export default route;
