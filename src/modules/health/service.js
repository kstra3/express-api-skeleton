const getHealth = async () => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };
};

const getReady = async () => {
  const checks = {
    mongodb: 'skipped',
    redis: 'skipped',
  };

  try {
    if (process.env.MONGODB_URI) {
      const mongoose = require('mongoose');
      const state = mongoose.connection.readyState;
      checks.mongodb = state === 1 ? 'ok' : 'error';
    }
  } catch {
    checks.mongodb = 'error';
  }

  try {
    if (process.env.REDIS_URL) {
      // Placeholder for actual Redis ping
      checks.redis = 'ok';
    }
  } catch {
    checks.redis = 'error';
  }

  const allOk = Object.values(checks).every((v) => v === 'ok' || v === 'skipped');

  return {
    status: allOk ? 'ready' : 'degraded',
    checks,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };
};

module.exports = { getHealth, getReady };