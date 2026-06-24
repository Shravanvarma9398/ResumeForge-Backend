const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const analysisRoutes = require("./routes/analysisRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "https://resume-forge-frontend-taupe.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/analysis", analysisRoutes);

app.get("/test-ai", async (req, res) => {
  
  try {
    const analyzeResume = require("./services/geminiServices");

    const analysis = await analyzeResume(`
      Name: Shravan Varma

      Skills:
      React
      Node.js
      MongoDB

      Projects:
      IdeaHub
      Weather App
    `);

    res.json({
      analysis,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/", (req, res) => {
    res.send("ResumeForge API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
