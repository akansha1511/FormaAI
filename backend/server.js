const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const formRoutes = require("./routes/formRoutes");
const aiRoutes = require("./routes/aiRoutes");
const templateRoutes = require("./routes/templateRoutes");
const responseRoutes = require("./routes/responseRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/responses", responseRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
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