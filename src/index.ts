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

const app = new Hono();

app.use("*", logger());

app.use("*", prettyJSON());

app.use(
  "*",
  cors({
    origin: "*", // 'https://reeze.up.railway.app'
    allowMethods: ["GET", "POST", "OPTIONS"],
  })
);

app.get("/", (c) => {
  return c.json({
    message: "Welcome to Portfolio API! 🚀",
    status: "active",
    version: "1.0.0",
  });
});

app.route("/api/about", aboutRoute);
app.route("/api/blogs", blogRoute);
app.route("/api/educations", educationRoute);
app.route("/api/experiences", experienceRoute);
app.route("/api/guestbook", guestbookRoute);
app.route("/api/projects", projectRoute);
app.route("/api/skills", skillRoute);

const port = process.env.PORT || 3000;
console.log(`Server is running on port ${port}`);

export default {
  port,
  fetch: app.fetch,
  hostname: "0.0.0.0",
};
