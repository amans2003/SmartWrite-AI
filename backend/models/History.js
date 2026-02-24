const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
    inputText: { type: String, required: true },
    tone: { type: String, required: true },
    length: { type: String, required: true },
    context: { type: String, required: true },
    output: {
        subject: { type: String },
        content: { type: String, required: true }
    },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("History", HistorySchema);
