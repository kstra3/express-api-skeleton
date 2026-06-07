require('dotenv').config();
const config = require('./config/env');
const app = require('./app');
const { connectDB } = require('./config/db');
const { connectRedis } = require('./config/redis');

const startServer = async () => {
  await connectDB();
  await connectRedis();

  const server = app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port} (${config.env})`);
  });

  const gracefulShutdown = () => {
    console.log('Received shutdown signal. Closing server...');
    server.close(() => {
      console.log('Server closed.');
      process.exit(0);
    });

    setTimeout(() => {
      console.error('Forced shutdown due to timeout.');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
};

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

module.exports = app;
