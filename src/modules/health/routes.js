const express = require('express');
const router = express.Router();
const catchAsync = require('../../utils/catchAsync');
const healthController = require('./controller');

router.get('/', catchAsync(healthController.getHealth));
router.get('/ready', catchAsync(healthController.getReady));

module.exports = router;