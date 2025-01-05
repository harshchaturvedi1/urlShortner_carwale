import Url from "../models/Url.js";

/**
 * Increment the click count for a given shortId.
 *
 * @param {string} shortId - The unique identifier for the shortened URL.
 * @returns {Promise<void>} - Updates the click count in the database.
 */
export const incrementClickCount = async (shortId) => {
  try {
    await Url.findOneAndUpdate(
      { shortId },
      { $inc: { clickCount: 1 } }, // Increment the click count by 1
      { new: true } // Return the updated document
    );
  } catch (error) {
    console.error(
      `Failed to increment click count for shortId: ${shortId}`,
      error
    );
    throw error; // Propagate error for further handling
  }
};

/**
 * Retrieve analytics data for a short URL.
 *
 * @param {string} shortId - The unique identifier for the shortened URL.
 * @returns {Promise<Object|null>} - Returns the URL document or null if not found.
 */
export const getAnalytics = async (shortId) => {
  try {
    const urlDoc = await Url.findOne({ shortId });
    return urlDoc || null; // Return the document or null if not found
  } catch (error) {
    console.error(`Failed to fetch analytics for shortId: ${shortId}`, error);
    throw error; // Propagate error for further handling
  }
};
