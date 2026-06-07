const { createClient } = require('redis');
const logger = require('../utils/logger');

let redisClient = null;

const connectRedis = async () => {
  const url = process.env.REDIS_URL;
  if (!url) {
    logger.info('REDIS_URL not set, skipping Redis connection');
    return;
  }

  redisClient = createClient({ url });
  redisClient.on('error', (err) => logger.error(`Redis error: ${err.message}`));
  redisClient.on('connect', () => logger.info('Redis connected'));

  await redisClient.connect();
};

module.exports = { connectRedis, get redisClient() { return redisClient; } };
