import { Hono } from "npm:hono";
import * as kv from "./kv_store.tsx";

const swarm = new Hono();

// POST /swarm/aggregate - Aggregate data from multiple nodes
swarm.post("/aggregate", async (c) => {
  try {
    const { nodes } = await c.req.json();
    
    if (!Array.isArray(nodes) || nodes.length === 0) {
      return c.json({ success: false, error: "Invalid nodes data" }, 400);
    }

    // Simple aggregation logic: calculate average confidence and active predictions
    let totalConfidence = 0;
    let activePredictions = 0;
    const scenes = new Set();

    nodes.forEach(node => {
        if (node.predictions) {
            node.predictions.forEach(p => {
                totalConfidence += p.confidence;
                activePredictions++;
                scenes.add(p.scene);
            });
        }
    });

    const averageConfidence = activePredictions > 0 ? totalConfidence / activePredictions : 0;

    const result = {
        timestamp: new Date().toISOString(),
        nodeCount: nodes.length,
        averageConfidence,
        activeScenes: Array.from(scenes),
        status: averageConfidence > 0.8 ? "OPTIMAL" : "LEARNING"
    };

    // Store the aggregation result
    await kv.set(`swarm:aggregation:${Date.now()}`, result);

    return c.json({ success: true, data: result });
  } catch (error) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// GET /swarm/status - Get current system status
swarm.get("/status", async (c) => {
    // Return a mock status or fetch from KV if we were persisting heartbeats
    return c.json({
        success: true,
        data: {
            onlineNodes: 3, // Mocked for now, or could fetch from a 'heartbeat' prefix
            systemStatus: "ONLINE",
            lastAggregation: new Date().toISOString()
        }
    });
});

export default swarm;
