import { Hono } from "hono";
import { cors } from "hono/cors";
import { Database } from "bun:sqlite";
const db = new Database("gimbodata.sqlite");

const app = new Hono();
app
  .use(cors())
  .all("/", (c) => c.text("Gimbocha API"))
  .get("/users", (c) => c.json(db.query('SELECT * FROM users').all()))
  .post("/createUser", async (c) => {
    const body = await c.req.json();
    if (typeof body.firstname != "string")
      return c.text("ไม่มีชื่อจริง", { status: 400 });
    if (typeof body.lastname != "string")
      return c.text("ไม่มีชื่อสกุล", { status: 400 });
    if (typeof body.gender != "string")
      return c.text("ไม่มีเพศ", { status: 400 });
    
    await db.exec('INSERT INTO users (firstname, lastname, gender) VALUES ($1, $2, $3)',[body.firstname, body.lastname, body.gender])
    return c.json({ message: "success" });
  })
  .notFound((c) => c.text("ไม่พบ", { status: 404 }));

const server = Bun.serve({
  port: 3000,
  fetch: app.fetch,
});

console.log(`Listening on ${server.url}`);
export {}
