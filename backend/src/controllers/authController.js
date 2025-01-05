import bcrypt from "bcrypt"; // Library for hashing and comparing passwords
import User from "../models/User.js"; // Mongoose model for user data
import { generateToken } from "../utils/jwt.js"; // Utility to generate JWT tokens

/**
 * Controller: registerUser
 * Description: Handles user registration by validating input, hashing the password, saving the user in the database, and returning a JWT.
 */
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "All fields are required." });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists." });
    }

    // Generate a salt and hash the password for secure storage
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const newUser = new User({
      username,
      email,
      passwordHash: hashedPassword, // Store the hashed password
    });
    await newUser.save();

    // Generate a JWT for authentication
    const token = generateToken(newUser._id);

    // Respond with success message and user data
    res.status(201).json({
      msg: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error("registerUser error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

/**
 * Controller: loginUser
 * Description: Handles user login by validating credentials, checking the database, and returning a JWT.
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ msg: "All fields are required." });
    }

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials." });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials." });
    }

    // Generate a JWT for authentication
    const token = generateToken(user._id);

    // Respond with success message and user data
    res.json({
      msg: "Login successful",
      user: { id: user._id, username: user.username, email: user.email },
      token,
    });
  } catch (error) {
    console.error("loginUser error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
