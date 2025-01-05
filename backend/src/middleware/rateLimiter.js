import rateLimit from "express-rate-limit";

// Middleware: Limits each IP to 100 requests per 15 minutes
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max requests per IP
  message: "Too many requests, please try again later.",
  standardHeaders: true, // Sends RateLimit-* headers
  legacyHeaders: false, // Disables X-RateLimit-* headers
});

export default rateLimiter;
