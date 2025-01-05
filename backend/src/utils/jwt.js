import jwt from "jsonwebtoken";

/**
 * Generate JWT
 * @param {string} userId - Unique user identifier
 * @returns {string} JWT token valid for 1 day
 */
export function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

/**
 * Verify JWT
 * @param {string} token - JWT token to verify
 * @returns {object} Decoded token payload
 * @throws {Error} If the token is invalid or expired
 */
export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
