const httpStatus = require('http-status');
const config = require('../config/env');

const errorHandler = (err, req, res, next) => {
  let statusCode = httpStatus.INTERNAL_SERVER_ERROR;

  if (err.code) {
    statusCode = err.code;
  } else if (err.status && typeof err.status === 'number') {
    statusCode = err.status;
  } else if (res.statusCode !== 200) {
    statusCode = res.statusCode;
  }

  res.status(statusCode);

  res.json({
    success: false,
    message: err.message || httpStatus[statusCode] || 'Internal Server Error',
  });
};

module.exports = errorHandler;
