import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import assets from "./assets.ts";
import swarm from "./swarm.ts";
import ipfs from "./ipfs.ts";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-0c2cab55/health", (c) => {
  return c.json({ status: "ok" });
});

// Register routes
app.route("/make-server-0c2cab55/assets", assets);
app.route("/make-server-0c2cab55/swarm", swarm);
app.route("/make-server-0c2cab55/ipfs", ipfs);

Deno.serve(app.fetch);
