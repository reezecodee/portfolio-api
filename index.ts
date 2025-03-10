import { Hono } from "hono";

const app: Hono = new Hono();

app.get('/', (c) => c.text('Hello, Bun + Hono.js🔥'))

Bun.serve({
    fetch: app.fetch,
    port: 3000
})

console.log('Server running at http://localhost:3000')