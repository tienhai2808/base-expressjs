const { createClient } = require("redis");
require("dotenv").config();

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("error", (err) => console.error("Redis chưa được kết nối:", err));
redisClient.on("connect", () => console.log("Redis đã được kết nối"));

const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error("Redis connection failed:", err);
    throw err;
  }
};

module.exports = { redisClient, connectRedis };
