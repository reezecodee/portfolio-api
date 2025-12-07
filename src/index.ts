import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

import aboutRoute from "./modules/about/about.routes";
import blogRoute from "./modules/blogs/blog.routes";
import educationRoute from "./modules/educations/education.routes";
import experienceRoute from "./modules/experiences/experience.routes";
import guestbookRoute from "./modules/guestbook/guestbook.routes";
import projectRoute from "./modules/projects/project.routes";
import skillRoute from "./modules/skills/skill.routes";

export const app = new Hono();

app.use("*", logger());
app.use("*", prettyJSON());

app.use(
  "*",
  cors({
    origin: (origin) => {
      const allowed = ["https://reeze.up.railway.app", "http://localhost:5173"];

      if (!origin || allowed.includes(origin)) {
        return origin;
      }

      return null;
    },
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    maxAge: 600,
  })
);

app.get("/", (c) => {
  return c.json({
    message: "Welcome to Portfolio API! 🚀",
    status: "active",
    version: "1.0.0",
  });
});

app.route("/api/v1/about", aboutRoute);
app.route("/api/v1/blogs", blogRoute);
app.route("/api/v1/educations", educationRoute);
app.route("/api/v1/experiences", experienceRoute);
app.route("/api/v1/guestbook", guestbookRoute);
app.route("/api/v1/projects", projectRoute);
app.route("/api/v1/skills", skillRoute);

const port = process.env.PORT || 3000;
console.log(`Server is running on port ${port}`);

export default {
  port,
  fetch: app.fetch,
  hostname: "0.0.0.0",
};
