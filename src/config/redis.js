const { createClient } = require('redis');

let redisClient = null;

const connectRedis = async () => {
  const url = process.env.REDIS_URL;
  if (!url) {
    console.log('REDIS_URL not set, skipping Redis connection');
    return;
  }

  redisClient = createClient({ url });
  redisClient.on('error', (err) => console.error('Redis error', err));
  redisClient.on('connect', () => console.log('Redis connected'));

  await redisClient.connect();
};

module.exports = { connectRedis, redisClient };
