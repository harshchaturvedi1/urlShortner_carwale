import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

import app from "./app.js"; // Main application instance
import connectDB from "./config/db.js"; // Function to establish database connection
import { connectRedis } from "./config/redis.js"; // Function to establish Redis connection

// Establish a connection to MongoDB
connectDB();

// Establish a connection to Redis
connectRedis();

const PORT = process.env.PORT || 3005; // Set the server port (default: 3005)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
