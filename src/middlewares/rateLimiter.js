const { LRUCache } = require('lru-cache');
const config = require('../config/env');

const rateLimiter = (options = {}) => {
  const windowMs = options.windowMs || config.rateLimitWindowMs;
  const limit = options.limit || config.rateLimitMax;
  const maxKeys = options.maxKeys || 5000;

  const cache = new LRUCache({
    max: maxKeys,
    ttl: windowMs,
  });

  return (req, res, next) => {
    const key = req.ip || req.socket?.remoteAddress || 'unknown';
    const now = Date.now();

    let record = cache.get(key);

    if (!record || now - record.startTime > windowMs) {
      record = { count: 1, startTime: now };
      cache.set(key, record);
      return next();
    }

    record.count += 1;

    if (record.count > limit) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.',
      });
    }

    next();
  };
};

module.exports = rateLimiter;
