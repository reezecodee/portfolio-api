import { Hono } from "hono";
import { cors } from "hono/cors";
import skillRoute from "./skills";
import projectRoute from "./projects";
import blogRoute from "./blogs";
import cryptoRoute from "./cryptos";

const app: Hono = new Hono();
app.use("*", cors());

app.route("/skills", skillRoute);
app.route("/cryptos", cryptoRoute);
app.route("/projects", projectRoute);
app.route("/blogs", blogRoute);

export default app;
