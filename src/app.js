const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const config = require('./config/env');
const { apiRouter } = require('./routes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use((req, res, next) => {
  res.set('X-Content-Type-Options', 'nosniff');
  next();
});

app.use(helmet({
  contentSecurityPolicy: false,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
}));

app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
}));

app.use(compression());

app.use(mongoSanitize());

app.use(xss());

app.use(hpp());

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

if (config.enableRequestLog) {
  const stream = { write: (message) => console.log(message.trim()) };
  app.use(morgan('combined', { stream }));
}

app.use('/api', apiRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
