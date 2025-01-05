import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/authRoutes.js";
import urlRoutes from "./routes/urlRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";
import { createClient } from "redis";
import { redirectUrl } from "./controllers/urlController.js";

const app = express();

// Initialize Redis client
const redisClient = createClient();

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

// Connect to Redis server
(async () => {
  try {
    await redisClient.connect();
    console.log("Redis connected successfully");
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
    process.exit(1); // Exit process if Redis connection fails
  }
})();

// Middleware for enhanced security and performance
app.use(helmet()); // Adds security headers to HTTP responses
app.use(cors()); // Enables CORS for cross-origin requests
app.use(express.json()); // Parses incoming JSON payloads
app.use(rateLimiter); // Rate limiter to prevent abuse (e.g., DDOS)

// API route handlers
app.use("/api/auth", authRoutes); // Handles authentication-related routes
app.use("/api/url", urlRoutes); // Handles URL shortening and analytics routes

// Short URL redirection (must come last to avoid route conflicts)
app.get("/:shortId", redirectUrl); // Handles redirection to the original URL

// Basic health check endpoint
app.get("/", (req, res) => {
  res.json({ msg: "URL Shortener API is running..." });
});

export default app;
