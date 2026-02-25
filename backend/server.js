require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const aiRoutes = require("./routes/ai");

const app = express();
const PORT = process.env.PORT || 5001;

console.log(">>> SMARTWRITE SERVER STARTING UP <<<");
console.log("Version: 2026-02-25-v2");
console.log("Express Version Check:", require('express/package.json').version);

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
// Express 5.0 strictly requires named parameters for wildcards!
app.get("/{*any}", (req, res) => {
    // Prevent infinite loops for API calls
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: "API route not found" });
    }

    // Serve index.html for all other routes so React Router can handle them
    const indexPath = path.join(distPath, "index.html");
    res.sendFile(indexPath, (err) => {
        if (err) {
            const fallbackPath = path.join(rootDistPath, "index.html");
            res.sendFile(fallbackPath, (err2) => {
                if (err2) {
                    console.error("Critical: Static files missing", { distPath, rootDistPath });
                    res.status(500).send("Static assets missing. Please check build logs.");
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
