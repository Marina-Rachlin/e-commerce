import { redis } from '../utils/redis.js';

// Function to clear cache keys matching a pattern
export const clearCacheKeys = async (pattern) => {
  const keys = await redis.keys(pattern);

  if (keys.length > 0) {
    await redis.del(...keys);
    console.log(`Cleared ${keys.length} cache keys matching pattern "${pattern}"`);
  } else {
    console.log(`No cache keys found matching pattern "${pattern}"`);
  }
};