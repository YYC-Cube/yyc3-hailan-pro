import { Hono } from "npm:hono";
import * as kv from "./kv_store.tsx";

const ipfs = new Hono();

// POST /ipfs/pin - Simulates pinning metadata to IPFS
ipfs.post("/pin", async (c) => {
  try {
    const body = await c.req.json();
    const { metadata, cid: providedCid } = body;

    if (!metadata) {
      return c.json({ success: false, error: "Metadata is required" }, 400);
    }

    // Generate a mock CID (Content ID) if not provided
    const cid = providedCid || `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    
    const entry = {
        cid,
        metadata,
        pinnedAt: new Date().toISOString(),
        node: "HL-IPFS-GATEWAY-01"
    };

    // Store in KV using the CID as part of the key
    await kv.set(`ipfs:pins:${cid}`, entry);

    return c.json({ 
        success: true, 
        data: entry 
    });
  } catch (error) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// POST /ipfs/reputation - Updates reputation for a CID
ipfs.post("/reputation", async (c) => {
    try {
        const body = await c.req.json();
        const { cid, score } = body;
        
        if (!cid || score === undefined) {
            return c.json({ success: false, error: "CID and score are required" }, 400);
        }

        const data: any = await kv.get(`ipfs:pins:${cid}`);
        if (!data) {
            return c.json({ success: false, error: "Content not found" }, 404);
        }

        // Initialize reputation if it doesn't exist
        const currentRep = data.reputation || { totalScore: 0, count: 0, average: 0 };
        const newTotal = currentRep.totalScore + score;
        const newCount = currentRep.count + 1;
        
        data.reputation = {
            totalScore: newTotal,
            count: newCount,
            average: parseFloat((newTotal / newCount).toFixed(1))
        };

        await kv.set(`ipfs:pins:${cid}`, data);
        
        return c.json({ success: true, reputation: data.reputation });
    } catch (error) {
        return c.json({ success: false, error: error.message }, 500);
    }
});

// POST /ipfs/receipt - Doctor provides an "Acknowledge" receipt (Multi-sig simulation)
ipfs.post("/receipt", async (c) => {
    try {
        const body = await c.req.json();
        const { cid, doctorId, doctorName } = body;
        
        if (!cid || !doctorId) {
            return c.json({ success: false, error: "CID and doctorId are required" }, 400);
        }

        const data: any = await kv.get(`ipfs:pins:${cid}`);
        if (!data) {
            return c.json({ success: false, error: "Content not found" }, 404);
        }

        const receipt = {
            receiptId: `rcpt_${Math.random().toString(36).substr(2, 9)}`,
            doctorId,
            doctorName: doctorName || "Authorized Professional",
            timestamp: new Date().toISOString(),
            status: "ACKNOWLEDGED",
            signature: `sig_${Math.random().toString(36).substr(2, 16)}`
        };

        const receipts = data.receipts || [];
        receipts.push(receipt);
        data.receipts = receipts;

        await kv.set(`ipfs:pins:${cid}`, data);
        
        return c.json({ success: true, receipt });
    } catch (error) {
        return c.json({ success: false, error: error.message }, 500);
    }
});

// GET /ipfs/get?cid=...
ipfs.get("/get", async (c) => {
    const cid = c.req.query("cid");
    if (!cid) return c.json({ success: false, error: "CID is required" }, 400);
    const data: any = await kv.get(`ipfs:pins:${cid}`);
    
    if (!data) {
        return c.json({ success: false, error: "Content not found" }, 404);
    }
    
    // Calculate Badge Level based on reputation
    const rep = data.reputation || { average: 0, count: 0 };
    let badge = "Novice";
    let color = "#94A3B8"; 
    
    if (rep.count >= 10 && rep.average >= 4.5) {
        badge = "Privacy Guardian";
        color = "#F59E0B"; 
    } else if (rep.count >= 5 && rep.average >= 4.0) {
        badge = "Trusted Contributor";
        color = "#10B981"; 
    } else if (rep.count >= 1) {
        badge = "Verified Pioneer";
        color = "#3B82F6"; 
    }

    return c.json({
        success: true,
        data: {
            ...data,
            badge: { name: badge, color }
        }
    });
});

// POST /ipfs/moderate - Privacy Guardians can flag/validate reports
ipfs.post("/moderate", async (c) => {
    try {
        const body = await c.req.json();
        const { cid, action, moderatorId } = body;
        
        if (!cid || !action || !moderatorId) {
            return c.json({ success: false, error: "Missing parameters" }, 400);
        }

        const data: any = await kv.get(`ipfs:pins:${cid}`);
        if (!data) {
            return c.json({ success: false, error: "Content not found" }, 404);
        }

        // Add to moderation log
        const moderationLog = data.moderationLog || [];
        const rewardAmount = action === 'VALIDATE' ? 50 : 20; 

        // --- NEW: Update Guardian Global Stats ---
        const statsKey = `guardian:stats:${moderatorId}`;
        const currentStats: any = (await kv.get(statsKey)) || { totalActions: 0, totalRewards: 0, approvals: 0, flags: 0 };
        
        // --- NEW: Calculate Decision Power based on Level ---
        const score = currentStats.totalRewards || 0;
        let decisionPower = 1.0;
        if (score >= 10000) decisionPower = 5.0;
        else if (score >= 5000) decisionPower = 2.5;
        else if (score >= 1000) decisionPower = 1.5;

        const updatedStats = {
            totalActions: currentStats.totalActions + 1,
            totalRewards: currentStats.totalRewards + rewardAmount,
            approvals: currentStats.approvals + (action === 'VALIDATE' ? 1 : 0),
            flags: currentStats.flags + (action === 'FLAG_FALSE' ? 1 : 0),
            lastActionAt: new Date().toISOString()
        };
        await kv.set(statsKey, updatedStats);

        // --- NEW: Update CID Confidence Score ---
        const weightDelta = action === 'VALIDATE' ? decisionPower : -decisionPower;
        data.confidenceScore = (data.confidenceScore || 0) + weightDelta;
        
        // --- NEW: Dispute Detection Logic ---
        // Check if there are conflicting decisions from Senior Arbiters (Power 5.0)
        const seniorDecisions = moderationLog.filter((l: any) => l.appliedPower >= 5.0);
        const hasConflict = seniorDecisions.some((l: any) => l.action !== action);
        
        if (hasConflict && decisionPower >= 5.0) {
            data.moderationStatus = 'JOINT_REVIEW_REQUIRED';
            data.conflictAlert = true;
        } else if (data.confidenceScore >= 10) {
            data.moderationStatus = 'VERIFIED_BY_GUARDIAN';
        } else if (data.confidenceScore <= -5) {
            data.moderationStatus = 'FLAGGED_FOR_REVIEW';
        } else {
            data.moderationStatus = 'PENDING_COMMUNITY_CONSENSUS';
        }

        moderationLog.push({
            moderatorId,
            action, 
            timestamp: new Date().toISOString(),
            rewardEarned: rewardAmount,
            appliedPower: decisionPower
        });
        
        data.moderationLog = moderationLog;
        data.incentiveWeights = (data.incentiveWeights || 0) + (action === 'VALIDATE' ? 100 : 0);

        await kv.set(`ipfs:pins:${cid}`, data);

        // --- NEW: Weekly Snapshot tracking ---
        const now = new Date();
        const weekStamp = Math.floor(now.getTime() / (1000 * 60 * 60 * 24 * 7));
        const weeklyKey = `guardian:weekly:${weekStamp}:${moderatorId}`;
        const currentWeekly: any = (await kv.get(weeklyKey)) || { rewards: 0, actions: 0, weekStart: new Date(now.getTime() - (now.getDay() * 24 * 60 * 60 * 1000)).toISOString() };
        await kv.set(weeklyKey, {
            ...currentWeekly,
            rewards: currentWeekly.rewards + rewardAmount,
            actions: currentWeekly.actions + 1,
            lastUpdated: now.toISOString()
        });

        // --- NEW: Update Leaderboard ---
        const leaderboardKey = `guardian:leaderboard`;
        let leaderboard: any[] = (await kv.get(leaderboardKey)) || [];
        const userIndex = leaderboard.findIndex(item => item.id === moderatorId);
        
        if (userIndex > -1) {
            leaderboard[userIndex].score = updatedStats.totalRewards;
            leaderboard[userIndex].actions = updatedStats.totalActions;
        } else {
            leaderboard.push({ 
                id: moderatorId, 
                name: `Guardian_${moderatorId.slice(-4)}`, 
                score: updatedStats.totalRewards,
                actions: updatedStats.totalActions
            });
        }
        
        // Sort and keep top 10
        leaderboard.sort((a, b) => b.score - a.score);
        leaderboard = leaderboard.slice(0, 10);
        await kv.set(leaderboardKey, leaderboard);
        
        return c.json({ 
            success: true, 
            status: data.moderationStatus,
            reward: rewardAmount,
            totalIncentive: data.incentiveWeights,
            guardianStats: updatedStats
        });
    } catch (error) {
        return c.json({ success: false, error: error.message }, 500);
    }
});

// GET /guardian/stats?moderatorId=...
ipfs.get("/guardian/stats", async (c) => {
    const moderatorId = c.req.query("moderatorId");
    if (!moderatorId) return c.json({ success: false, error: "ModeratorId required" }, 400);

    const stats = await kv.get(`guardian:stats:${moderatorId}`);
    
    // Calculate title
    const score = stats?.totalRewards || 0;
    let title = "Junior Guardian";
    if (score >= 10000) title = "Senior Arbiter";
    else if (score >= 5000) title = "Security Arbiter";
    else if (score >= 1000) title = "Privacy Guardian";

    // --- NEW: Check for Active Leader Badge (3 weeks of growth) ---
    const now = new Date();
    const currentWeek = Math.floor(now.getTime() / (1000 * 60 * 60 * 24 * 7));
    let growthStreak = 0;
    
    // Check last 3 weeks
    for (let i = 0; i < 3; i++) {
        const w = currentWeek - i;
        const currentW: any = await kv.get(`guardian:weekly:${w}:${moderatorId}`);
        const prevW: any = await kv.get(`guardian:weekly:${w - 1}:${moderatorId}`);
        if (currentW && prevW && currentW.rewards > prevW.rewards) {
            growthStreak++;
        } else {
            break;
        }
    }
    const isActiveLeader = growthStreak >= 2; // Positive growth for at least 2 consecutive periods

    return c.json({ 
        success: true, 
        stats: stats ? { ...stats, title, isActiveLeader } : { totalActions: 0, totalRewards: 0, approvals: 0, flags: 0, title, isActiveLeader } 
    });
});

// GET /guardian/leaderboard
ipfs.get("/guardian/leaderboard", async (c) => {
    const leaderboard = await kv.get(`guardian:leaderboard`);
    return c.json({ 
        success: true, 
        leaderboard: leaderboard || [] 
    });
});

// GET /guardian/weekly-report?moderatorId=...
ipfs.get("/guardian/weekly-report", async (c) => {
    const moderatorId = c.req.query("moderatorId");
    if (!moderatorId) return c.json({ success: false, error: "ModeratorId required" }, 400);

    const now = new Date();
    const weekStamp = Math.floor(now.getTime() / (1000 * 60 * 60 * 24 * 7));
    const currentWeekly = await kv.get(`guardian:weekly:${weekStamp}:${moderatorId}`);
    const lastWeekly = await kv.get(`guardian:weekly:${weekStamp - 1}:${moderatorId}`);

    return c.json({ 
        success: true, 
        report: {
            current: currentWeekly || { rewards: 0, actions: 0 },
            previous: lastWeekly || { rewards: 0, actions: 0 },
            weekNumber: weekStamp
        }
    });
});

export default ipfs;
