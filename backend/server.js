import { app } from "./app.js";
import { globalRateLimiter } from "./middleware/rateLimiter.js";
import dotenv from "dotenv";
const PORT = process.env.PORT || 5000;

app.get("/", globalRateLimiter, async (req, res) => {
  res.json({
    message: "server is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
