import { Hono } from "hono";
import * as controller from "./education.controller";

const route = new Hono();

route.get("/", controller.getEducations);

export default route;
