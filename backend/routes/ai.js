const express = require("express");
const router = express.Router();
const { generateRewrittenText } = require("../utils/gemini");
const History = require("../models/History");

// Get all history
router.get("/history", async (req, res) => {
    try {
        const history = await History.find().sort({ timestamp: -1 }).limit(50);
        res.json(history);
    } catch (error) {
        console.error("Fetch History Error:", error);
        res.status(500).json({ error: "Failed to fetch history" });
    }
});

// Clear all history
router.delete("/history", async (req, res) => {
    try {
        await History.deleteMany({});
        res.json({ message: "History cleared" });
    } catch (error) {
        console.error("Clear History Error:", error);
        res.status(500).json({ error: "Failed to clear history" });
    }
});

// Rewrite text
router.post("/rewrite", async (req, res) => {
    const { text, tone, context, length } = req.body;

    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }

    try {
        const result = await generateRewrittenText(text, tone || "Professional", context || "General", length || "Medium");

        // Split subject line if present
        let subject = "";
        let content = result;

        if (result.startsWith("Subject: ")) {
            const parts = result.split("\n");
            subject = parts[0].replace("Subject: ", "").trim();
            content = parts.slice(1).join("\n").trim();
        }

        // Save to MongoDB (Optional - don't crash if it fails)
        let historySaved = false;
        let historyItem = null;

        if (req.dbConnected !== false) {
            try {
                historyItem = new History({
                    inputText: text,
                    tone: tone || "Professional",
                    length: length || "Medium",
                    context: context || "General",
                    output: { subject, content }
                });
                await historyItem.save();
                historySaved = true;
            } catch (dbError) {
                console.error("Failed to save history:", dbError.message);
            }
        }

        res.json({
            subject,
            content,
            _id: historyItem?._id,
            timestamp: historyItem?.timestamp || new Date(),
            warning: historySaved ? null : "History could not be saved because the database is unavailable."
        });
    } catch (error) {
        console.error("Rewrite Error Detail:", error);

        // Determine the status code based on the error message
        let status = 500;
        if (error.message.includes("429") || error.message.includes("quota")) {
            status = 429;
        } else if (error.message.includes("400") || error.message.includes("key")) {
            status = 400;
        }

        res.status(status).json({
            error: error.message,
            tip: status === 429 ? "Your Gemini API quota is exceeded. Check AI Studio for limits." : "Check backend logs for details."
        });
    }
});

module.exports = router;
