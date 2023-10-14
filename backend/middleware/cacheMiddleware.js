import { redis } from '../utils/redis.js';
import { clearCacheKeys } from '../utils/cacheUtils.js';


// function for generating cache key based on the request
export const generateCacheKey = (req) => {
  const { path, query } = req;
  return `ecommerce:${path}-${JSON.stringify(query)}`;
};

const cacheMiddleware = async (req, res, next) => {
  const cacheKey = generateCacheKey(req);

  redis.get(cacheKey, (err, cachedData) => {
    if (err) {
      console.error('Redis Error:', err);
      return next();
    }

    if (cachedData) {
      return res.json({ success: true, data: JSON.parse(cachedData) });
    }

    next();
  });
};

export default cacheMiddleware;
