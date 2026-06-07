const httpStatus = require('http-status');

const errorHandler = (err, req, res, _next) => {
  let statusCode = httpStatus.INTERNAL_SERVER_ERROR;

  if (err.status && typeof err.status === 'number') {
    statusCode = err.status;
  } else if (res.statusCode !== 200) {
    statusCode = res.statusCode;
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || httpStatus[statusCode] || 'Internal Server Error',
  });
};

module.exports = errorHandler;
