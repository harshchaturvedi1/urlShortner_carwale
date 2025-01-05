import { nanoid } from "nanoid"; // For generating unique short IDs
import Url from "../models/Url.js"; // Mongoose model for URL data
import {
  incrementClickCount,
  getAnalytics,
} from "../services/analyticsService.js"; // Utility functions for analytics
import validator from "validator"; // For URL validation
import { redisClient } from "../config/redis.js"; // Redis client for caching

/**
 * Controller: Create a short URL.
 * Description: Validates the input URL, generates a short ID, saves it in the database,
 * and caches the URL for faster access.
 */
export const createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    // Validate the presence of originalUrl
    if (!originalUrl) {
      return res.status(400).json({ msg: "Original URL is required." });
    }

    // Validate the URL format
    if (
      !validator.isURL(originalUrl, {
        protocols: ["http", "https"],
        require_protocol: true,
      })
    ) {
      return res.status(400).json({
        msg: "Invalid URL format. Make sure to include http:// or https://.",
      });
    }

    // Generate a unique shortId for the URL
    const shortId = nanoid(8);

    // Save the URL and user association in the database
    const newUrl = new Url({
      originalUrl,
      shortId,
      userId: req.userId, // Associate the URL with the logged-in user
    });
    await newUrl.save();

    // Cache the URL in Redis
    await redisClient.set(shortId, originalUrl, { EX: 3600 }); // Expires in 1 hour

    res.status(201).json({
      msg: "URL shortened successfully",
      shortUrl: `${process.env.BASE_URL}/${shortId}`,
      shortId,
    });
  } catch (error) {
    console.error("createShortUrl error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

/**
 * Controller: Redirect using a short URL.
 * Description: Redirects users to the original URL using the short ID.
 * Caches the URL and increments the click count.
 */
export const redirectUrl = async (req, res) => {
  try {
    const { shortId } = req.params;

    // Check if cached in Redis
    const cachedUrl = await redisClient.get(shortId);
    if (cachedUrl) {
      console.log("Cache hit for shortId:", shortId);

      // Increment DB count
      await incrementClickCount(shortId);

      // Invalidate the analytics cache
      await redisClient.del(`analytics:${shortId}`);
      console.log("Invalidated analytics cache for shortId:", shortId);

      return res.redirect(cachedUrl);
    }

    // Fetch the URL from the database if not in cache
    const urlRecord = await Url.findOne({ shortId });
    if (!urlRecord) {
      return res.status(404).json({ msg: "URL not found." });
    }

    // Cache the short URL
    await redisClient.set(shortId, urlRecord.originalUrl, { EX: 3600 });
    console.log("Cache miss. URL fetched from DB and cached.");

    // Increment DB count
    await incrementClickCount(shortId);

    // Invalidate the analytics cache
    await redisClient.del(`analytics:${shortId}`);
    console.log("Invalidated analytics cache for shortId:", shortId);

    return res.redirect(urlRecord.originalUrl);
  } catch (error) {
    console.error("redirectUrl error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

/**
 * Controller: Retrieve analytics for a specific short URL.
 * Description: Provides data on the original URL, click count, and creation date.
 * Uses Redis to cache analytics data for faster access.
 */
export const getUrlAnalytics = async (req, res) => {
  try {
    const { shortId } = req.params;

    // Check if analytics data is cached in Redis
    const cachedAnalytics = await redisClient.get(`analytics:${shortId}`);
    if (cachedAnalytics) {
      console.log("Cache hit for analytics:", shortId);
      return res.json(JSON.parse(cachedAnalytics)); // Return cached analytics
    }

    // Fetching analytics data from the database
    const data = await getAnalytics(shortId);
    if (!data) {
      return res.status(404).json({ msg: "URL not found." });
    }

    // Prepare the analytics response
    const analytics = {
      shortId,
      originalUrl: data.originalUrl,
      clickCount: data.clickCount,
      createdAt: data.createdAt,
    };

    // Cache the analytics in Redis for faster access next time
    await redisClient.set(`analytics:${shortId}`, JSON.stringify(analytics), {
      EX: 3600,
    }); // Expires in 1 hour
    console.log("Cache miss. Analytics fetched from DB and cached.");

    // Respond with analytics data
    res.json(analytics);
  } catch (error) {
    console.error("getUrlAnalytics error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

/**
 * Controller: Fetch all URLs associated with the logged-in user (with pagination).
 * Description: Fetches URLs with pagination support and caches the response in Redis.
 */
export const getUserUrls = async (req, res) => {
  try {
    console.log("Fetching URLs for userId:", req.userId);

    const page = parseInt(req.query.page, 10) || 1; // Default to page 1
    const limit = parseInt(req.query.limit, 10) || 10; // Default to 10 items per page
    const skip = (page - 1) * limit;

    console.log(
      `Pagination Params: Page=${page}, Limit=${limit}, Skip=${skip}`
    );

    // Cache key for pagination
    const cacheKey = `user:${req.userId}:urls:page:${page}:limit:${limit}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("Cache hit for user URLs");
      return res.json(JSON.parse(cachedData));
    }

    // Fetching URLs from the database with pagination
    const urls = await Url.find({ userId: req.userId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Sort by creation date

    // Count total URLs for pagination
    const totalUrls = await Url.countDocuments({ userId: req.userId });

    const response = {
      urls,
      totalUrls,
      totalPages: Math.ceil(totalUrls / limit),
      currentPage: page,
    };

    console.log("Fetched URLs:", response);

    // Cache the response
    await redisClient.set(cacheKey, JSON.stringify(response), { EX: 600 });

    res.json(response);
  } catch (error) {
    console.error("Error fetching user URLs:", error);
    res.status(500).json({ msg: "Failed to fetch URLs." });
  }
};
