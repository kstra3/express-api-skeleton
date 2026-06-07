require('dotenv').config();
const config = require('./config/env');
const app = require('./app');
const { connectDB } = require('./config/db');
const { connectRedis } = require('./config/redis');
const logger = require('./utils/logger');

const startServer = async () => {
  await connectDB();
  await connectRedis();

  const server = app.listen(config.port, () => {
    logger.info(`Server running on http://localhost:${config.port} (${config.env})`);
  });

  const gracefulShutdown = () => {
    logger.info('Received shutdown signal. Closing server...');
    server.close(() => {
      logger.info('Server closed.');
      process.exit(0);
    });

    setTimeout(() => {
      logger.error('Forced shutdown due to timeout.');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
};

startServer().catch((err) => {
  logger.error(`Failed to start server: ${err.message}`);
  process.exit(1);
});
