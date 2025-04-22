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

// Get frontend URLs from .env (comma separated)
const allowedOrigins = process.env.FRONTEND_URL.split(",");

// Enable CORS for specified frontend URLs
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like curl/postman) or allowed origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json()); // For parsing JSON requests

// Register routes
app.use("/api", pitchRoutes);
app.use("/api", likeRoutes);
app.use("/api", feedbackRoutes);
app.use("/api/search", searchPitchRoutes);

// Connect to the database
dbConnection();

export default app;
