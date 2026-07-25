const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "FormaAI Backend is Running 🚀",
  });
});

// Port
const PORT = process.env.PORT || 5000;

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});