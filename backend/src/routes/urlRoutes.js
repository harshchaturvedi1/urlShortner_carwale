import express from "express";
import {
  createShortUrl,
  getUrlAnalytics,
  getUserUrls,
  // redirectUrl, // Uncomment if needed
} from "../controllers/urlController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route POST /api/url/shorten
 * @desc Shorten a URL (requires authentication)
 */
router.post("/shorten", authMiddleware, createShortUrl);

/**
 * @route GET /api/url/analytics/:shortId
 * @desc Get analytics for a specific short URL (requires authentication)
 */
router.get("/analytics/:shortId", authMiddleware, getUrlAnalytics);

/**
 * @route GET /api/url/user-urls
 * @desc Get all URLs created by the authenticated user (with pagination)
 */
router.get("/user-urls", authMiddleware, getUserUrls);

//this route should be last to prevent conflicts with other routes
// router.get("/:shortId", redirectUrl);

export default router;
