import { Hono } from "hono";
import skillRoute from "./skills";
import projectRoute from "./projects";
import blogRoute from "./blogs";

const app: Hono = new Hono();

app.route("/skills", skillRoute);
app.route("/projects", projectRoute);
app.route("/blogs", blogRoute);

export default app;
