require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const aiRoutes = require("./routes/ai");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// 1. Health check BEFORE DB connection to verify server start
app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        diagnostics: {
            dirname: __dirname,
            cwd: process.cwd(),
            node_version: process.version,
            hasMongo: !!process.env.MONGODB_URI,
            hasGemini: !!process.env.GEMINI_API_KEY
        }
    });
});

// MongoDB Connection Utility
const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        console.error("MONGODB_URI is missing");
        return;
    }
    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("Connected to MongoDB Atlas");
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
    }
};

// Middleware for API routes to ensure DB connection
app.use(async (req, res, next) => {
    if (req.url.startsWith('/api') && req.url !== '/api/health') {
        await connectDB();
    }
    next();
});

app.use("/api/ai", aiRoutes);

// Serving Frontend static files
const distPath = path.resolve(__dirname, "dist");
const rootDistPath = path.resolve(process.cwd(), "backend", "dist");

app.use(express.static(distPath));
app.use(express.static(rootDistPath));

// Catch-all route for React client-side routing
app.get("/(.*)", (req, res) => {
    if (req.url.startsWith('/api')) {
        return res.status(404).json({ error: "API route not found" });
    }

    // Try primary path, fallback to secondary
    res.sendFile(path.join(distPath, "index.html"), (err) => {
        if (err) {
            res.sendFile(path.join(rootDistPath, "index.html"), (err2) => {
                if (err2) {
                    res.status(500).send("Static files not found during deployment.");
                }
            });
        }
    });
});

// Remove redundant old health check
// app.get("/health", (req, res) => { ... })

// Only start the server if NOT running on Vercel (local dev)
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running locally on port ${PORT}`);
    });
}

module.exports = app;
