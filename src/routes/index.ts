import { Hono } from "hono";
import { cors } from "hono/cors";
import skillRoute from "./skills";
import projectRoute from "./projects";
import blogRoute from "./blogs";

const app: Hono = new Hono();
app.use(
  "*",
  cors({
    origin: (origin) => {
      const allowedOrigins = [
        "http://localhost:5173", // dev
        "https://reeze.vercel.app", // production
      ];
      return allowedOrigins.includes(origin ?? "") ? origin : "";
    },
  })
);

app.route("/skills", skillRoute);
app.route("/projects", projectRoute);
app.route("/blogs", blogRoute);

export default app;
