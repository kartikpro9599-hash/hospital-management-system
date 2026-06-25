import rateLimit from "express-rate-limit";

export const globalRateLimiter = rateLimit({
  windowMs: 50 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
  message: {
    success: false,
    message: "You have requested too many times please try again later",
  },
});

export const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "You have exceed the limit",
  },
});
