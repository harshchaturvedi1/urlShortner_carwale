import { verifyToken } from "../utils/jwt.js";

/**
 * Middleware: Authorization Middleware
 * Description: This middleware ensures that incoming requests have a valid JWT token.
 * It extracts and verifies the token, and attaches the user ID to the request object
 * for further processing in downstream route handlers or controllers.
 */
const authMiddleware = (req, res, next) => {
  const now = new Date().toISOString(); // Current timestamp for consistent logging

  // Log the incoming request method and URL (useful for debugging)
  // console.log(`[${now}] Incoming Request: ${req.method} ${req.originalUrl}`);

  // Extract the Authorization header
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    // Log and return error if Authorization header is missing
    console.log(`[${now}] Authorization header missing.`);
    return res.status(401).json({ msg: "No token, authorization denied." });
  }

  console.log(`[${now}] Authorization Header: ${authHeader}`);

  // Extract the token from the header
  const token = authHeader.split(" ")[1];
  if (!token) {
    // Log and return error if token is in an invalid format
    console.log(`[${now}] Token format invalid.`);
    return res.status(401).json({ msg: "Invalid token format." });
  }

  console.log(`[${now}] Extracted Token: ${token}`);

  try {
    // Verify the JWT token
    const decoded = verifyToken(token);
    console.log(`[${now}] Decoded Token Payload:`, decoded);

    // Attach the decoded user ID to the request object for further use
    req.userId = decoded.id;
    console.log(`[${now}] User ID attached to request: ${req.userId}`);

    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    // Log and return error if token verification fails
    console.error(`[${now}] authMiddleware error:`, error.message);
    return res.status(401).json({ msg: "Token is not valid." });
  }
};

export default authMiddleware;
