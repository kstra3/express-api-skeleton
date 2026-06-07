const express = require('express');
const { validateBody } = require('../../middlewares/validate');
const { createUserSchema } = require('../../validations/user.validation');
const catchAsync = require('../../utils/catchAsync');
const userController = require('./controller');

const router = express.Router();

router.get('/', catchAsync(userController.getUsers));
router.post('/', validateBody(createUserSchema), catchAsync(userController.createUser));

module.exports = router;