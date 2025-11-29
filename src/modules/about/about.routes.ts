import { Hono } from "hono";
import * as controller from "./about.controller";

const route = new Hono();

route.get("/", controller.getAboutData);

export default route;
