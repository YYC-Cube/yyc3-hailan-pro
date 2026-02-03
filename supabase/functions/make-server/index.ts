import { Hono } from "jsr:@hono/hono@^4.0.0";
import { cors } from "jsr:@hono/hono@^4.0.0/cors";
import { logger } from "jsr:@hono/hono@^4.0.0/logger";

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
app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

// Assets endpoints
app.get("/assets", async (c) => {
  try {
    return c.json({ success: true, data: [] });
  } catch (error) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

app.post("/assets", async (c) => {
  try {
    const body = await c.req.json();
    const id = body.id || crypto.randomUUID();
    
    const newAsset = {
      ...body,
      id,
      mintDate: body.mintDate || new Date().toISOString().split('T')[0],
      serverTimestamp: new Date().toISOString(),
    };

    return c.json({ success: true, data: newAsset });
  } catch (error) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Swarm endpoints
app.get("/swarm/health", (c) => {
  return c.json({ 
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

app.post("/swarm/upload", async (c) => {
  try {
    const body = await c.req.json();
    const mockHash = `swarm-${crypto.randomUUID()}`;
    
    return c.json({
      success: true,
      data: {
        hash: mockHash,
        url: `https://swarm.example.com/${mockHash}`,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// IPFS endpoints
app.post("/ipfs/upload", async (c) => {
  try {
    const body = await c.req.json();
    const mockCID = `Qm${crypto.randomUUID().replace(/-/g, '')}`;
    
    return c.json({
      success: true,
      data: {
        cid: mockCID,
        url: `https://ipfs.io/ipfs/${mockCID}`,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

Deno.serve(app.fetch);