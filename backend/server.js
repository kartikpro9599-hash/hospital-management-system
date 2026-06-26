import { app } from "./app.js";
import { globalRateLimiter } from "./middleware/rateLimiter.js";

app.get("/", globalRateLimiter, async (req, res) => {
  res.json({
    message: "server is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
