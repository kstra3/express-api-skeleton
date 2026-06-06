import express from 'express';
import { swaggerDocs } from './swagger.js';
import { connectDB } from './db.js';
import { connectRedis } from './redis.js';

export const apiRouter = express.Router();

apiRouter.use('/health', (await import('./modules/health/routes.js')).default);
apiRouter.use('/users', (await import('./modules/users/routes.js')).default);
apiRouter.use('/auth', (await import('./modules/auth/routes.js')).default);
apiRouter.use('/upload', (await import('./modules/upload/routes.js')).default);

export const initDocs = (app) => swaggerDocs(app);
