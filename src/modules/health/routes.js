import express from 'express';
import { catchAsync } from '../utils/catchAsync.js';
import * as healthController from './controller.js';

export const healthRouter = express.Router();

healthRouter.get('/', catchAsync(healthController.getHealth));
healthRouter.get('/ready', catchAsync(healthController.getReady));
