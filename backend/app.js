import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import pitchRoutes from "./routes/pitchRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import searchPitchRoutes from "./routes/searchPitch.js";

const app = express();
config({ path: "./config/config.env" });

// Enable CORS for the frontend (localhost:5173)
app.use(
  cors({
    origin: [
      "https://falcon-liart-three.vercel.app/",
      "http://localhost:5173/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json()); // For parsing JSON requests

// Register routes
app.use("/api", pitchRoutes);
app.use("/api", likeRoutes);
app.use("/api", feedbackRoutes);

app.use("/api/search", searchPitchRoutes);
dbConnection(); // Connect to the database

export default app;
