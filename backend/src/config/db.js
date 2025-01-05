import mongoose from "mongoose";

/**
 * Function: connectDB
 * Description: Establishes a connection to the MongoDB database using Mongoose.
 * The MongoDB connection string is retrieved from the environment variables.
 */
const connectDB = async () => {
  try {
    // Log the MongoDB connection string for debugging (ensure sensitive data is secured in production).
    // console.log("MONGO_URI:", process.env.MONGO_URI);

    // Attempt to connect to the MongoDB database.
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Use the new MongoDB connection string parser.
      useUnifiedTopology: true, // Use the new server discovery and monitoring engine.
    });

    // Log the host of the connected database.
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log the error if the connection fails.
    console.error("Database connection failed:", error);

    // Exit the application with a non-zero status code to indicate failure.
    process.exit(1);
  }
};

// Export the function for use in other parts of the application.
export default connectDB;
