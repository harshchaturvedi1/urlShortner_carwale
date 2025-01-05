import { createClient } from "redis"; // Import Redis client from the Redis library

// Initialize Redis client
const redisClient = createClient();

// Event listener for handling Redis connection errors
redisClient.on("error", (err) => {
  console.error("Redis connection error:", err); // Log error details if Redis connection fails
});

/**
 * Function: connectRedis
 * Description: Establishes a connection to the Redis server. Logs a success message upon connection
 * or terminates the process if the connection fails.
 */
const connectRedis = async () => {
  try {
    // Attempt to connect to the Redis server
    await redisClient.connect();
    console.log("Redis connected successfully"); // Log success message
  } catch (error) {
    // Log the error details and terminate the process with a non-zero status code
    console.error("Failed to connect to Redis:", error);
    process.exit(1); // Exit process if Redis connection fails
  }
};

// Export the Redis client and connect function for use in other parts of the application
export { redisClient, connectRedis };
