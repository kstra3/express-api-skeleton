const express = require('express');
const { validateBody } = require('../../middlewares/validate');
const catchAsync = require('../../utils/catchAsync');
const authController = require('./controller');
const { registerSchema, loginSchema } = require('./validations');

const router = express.Router();

router.post('/register', validateBody(registerSchema), catchAsync(authController.register));
router.post('/login', validateBody(loginSchema), catchAsync(authController.login));

module.exports = router;
