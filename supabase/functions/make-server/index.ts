import { Hono } from "jsr:@hono/hono@^4.0.0";
import { cors } from "jsr:@hono/hono@^4.0.0/cors";
import { logger } from "jsr:@hono/hono@^4.0.0/logger";

// Initialize Hono with base path for Supabase Edge Functions
// This is critical for routing to work correctly when deployed
const app = new Hono().basePath('/functions/v1/make-server');

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "X-Client-Version"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Assets endpoints
app.get("/assets", async (c) => {
  try {
    // Return some mock assets
    const mockAssets = [
      {
        id: "asset-001",
        name: "年度健康体检报告 2024",
        type: "Report",
        date: "2024-01-15",
        status: "Verified",
        cid: "QmX7...",
        mintDate: "2024-01-16",
        serverTimestamp: new Date().toISOString()
      },
      {
        id: "asset-002",
        name: "疫苗接种记录",
        type: "Record",
        date: "2023-11-20",
        status: "Pending",
        cid: "QmY8...",
        mintDate: "2023-11-21",
        serverTimestamp: new Date().toISOString()
      }
    ];
    return c.json({ success: true, data: mockAssets });
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

app.get("/ipfs/get", (c) => {
  const cid = c.req.query('cid');
  return c.json({
    success: true,
    data: {
      metadata: {
        name: "Health Record " + (cid?.substring(0, 6) || "Unknown"),
        description: "Encrypted health data securely stored on IPFS",
        created: new Date().toISOString(),
        verified: true,
        author: "Dr. Hai Lan"
      }
    }
  });
});

app.post("/ipfs/reputation", async (c) => {
  return c.json({ success: true, message: "Reputation score updated" });
});

app.post("/ipfs/receipt", async (c) => {
  return c.json({ success: true, message: "Receipt generated" });
});

app.post("/ipfs/moderate", async (c) => {
  return c.json({ success: true, message: "Content moderation action recorded" });
});

app.post("/ipfs/pin", async (c) => {
  return c.json({ success: true, message: "Content pinned to local cluster" });
});

// Guardian/Moderator endpoints
app.get("/guardian/stats", (c) => {
  return c.json({
    success: true,
    data: {
      totalReviewed: 128,
      pending: 5,
      accuracy: 98.5,
      credits: 350
    }
  });
});

app.get("/guardian/leaderboard", (c) => {
  return c.json({
    success: true,
    data: [
      { id: "1", name: "Guardian_Alpha", score: 1250, rank: 1 },
      { id: "2", name: "HealthKeeper", score: 980, rank: 2 },
      { id: "3", name: "MediMod", score: 875, rank: 3 },
    ]
  });
});

app.get("/guardian/weekly-report", (c) => {
  return c.json({
    success: true,
    data: {
      week: "2024-W05",
      actions: 42,
      rewards: 15.5
    }
  });
});

// AI Chat endpoint
app.post("/chat/completions", async (c) => {
  try {
    const body = await c.req.json();
    const userMessage = body.message || "";
    
    return c.json({
      success: true,
      data: {
        content: `这是来自海蓝健康助手的模拟回复。我收到了您的消息："${userMessage}"。作为演示版本，我无法进行真实的医学分析，但您的数据已安全加密。`,
        suggestions: [
          { text: "查看今日健康数据", action: "view_stats" },
          { text: "预约体检", action: "book_appointment" }
        ]
      }
    });
  } catch (error) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

Deno.serve(app.fetch);