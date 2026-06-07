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
};

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

module.exports = app;
