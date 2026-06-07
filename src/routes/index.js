const express = require('express');
const { swaggerDocs } = require('../config/swagger');

const apiRouter = express.Router();

apiRouter.use('/health', require('../modules/health/routes'));
apiRouter.use('/users', require('../modules/users/routes'));
apiRouter.use('/auth', require('../modules/auth/routes'));
apiRouter.use('/upload', require('../modules/upload/routes'));

module.exports = { apiRouter, initDocs: (app) => swaggerDocs(app) };