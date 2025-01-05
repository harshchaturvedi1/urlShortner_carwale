import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

/**
 * Route: Register a new user
 * POST /api/auth/register
 */
router.post("/register", registerUser);

/**
 * Route: Authenticate and log in a user
 * POST /api/auth/login
 */
router.post("/login", loginUser);

export default router;
