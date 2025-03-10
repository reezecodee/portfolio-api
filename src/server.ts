import app from "./routes/index";

Bun.serve({
  fetch: app.fetch,
  port: 3000,
});

console.log("Server running at http://localhost:3000");
