import { Hono } from "hono";
import * as controller from "./experience.controller";

const route = new Hono();

route.get("/", controller.getExperiences);

export default route;
