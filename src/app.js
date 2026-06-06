import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';

import { env } from '../config/env.js';
import { apiRouter } from './routes/index.js';

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
  origin: env.corsOrigin,
  credentials: true,
}));

app.use(compression());

app.use(mongoSanitize());

app.use(xss());

app.use(hpp());

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

if (env.enableRequestLog) {
  const stream = { write: (message) => console.log(message.trim()) };
  app.use(morgan('combined', { stream }));
}

app.use('/api', apiRouter);

export default app;
