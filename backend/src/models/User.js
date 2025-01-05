import mongoose from "mongoose";

// Define the schema for the User model
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true }, // User's name
    email: { type: String, required: true, unique: true }, // User's email (must be unique)
    passwordHash: { type: String, required: true }, // Hashed password for authentication
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

// Create and export the User model
const User = mongoose.model("User", userSchema);
export default User;
