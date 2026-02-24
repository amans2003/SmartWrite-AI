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

// MongoDB Connection Utility
const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB Atlas");
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        // don't exit process in serverless
    }
};

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

app.use("/api/ai", aiRoutes);

// Serving Frontend static files
// In Vercel, paths can be tricky. We use path.resolve.
const distPath = path.resolve(__dirname, "dist");
app.use(express.static(distPath));

// Catch-all route for React client-side routing
app.get("*", (req, res) => {
    // If it's an API route that didn't match, don't serve HTML
    if (req.url.startsWith('/api')) {
        return res.status(404).json({ error: "API route not found" });
    }
    res.sendFile(path.join(distPath, "index.html"));
});

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

// Only start the server if NOT running on Vercel (local dev)
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running locally on port ${PORT}`);
    });
}

module.exports = app;
