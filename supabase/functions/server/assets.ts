import { Hono } from "jsr:@hono/hono@^4.0.0";
import * as kv from "./kv_store.tsx";

const assets = new Hono();

// GET /assets - List all assets
assets.get("/", async (c) => {
  try {
    // In a real app, you would probably filter by user ID, but we'll list all for now
    const items = await kv.getByPrefix("asset:");
    return c.json({ success: true, data: items });
  } catch (error) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// POST /assets - Create a new asset
assets.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const id = body.id || crypto.randomUUID();
    const key = `asset:${id}`;
    
    // Add server-side metadata
    const newAsset = {
      ...body,
      id,
      mintDate: body.mintDate || new Date().toISOString().split('T')[0],
      serverTimestamp: new Date().toISOString(),
    };

    await kv.set(key, newAsset);
    return c.json({ success: true, data: newAsset });
  } catch (error) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

export default assets;