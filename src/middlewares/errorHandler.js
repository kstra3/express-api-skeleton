const httpStatus = require('http-status');

const errorHandler = (err, req, res, _next) => {
  let statusCode = httpStatus.INTERNAL_SERVER_ERROR;

  if (err.status && typeof err.status === 'number') {
    statusCode = err.status;
  } else if (res.statusCode !== 200) {
    statusCode = res.statusCode;
  }

  const body = {
    success: false,
    message: err.message || httpStatus[statusCode] || 'Internal Server Error',
  };

  if (process.env.NODE_ENV === 'development') {
    body.stack = err.stack;
  }

  res.status(statusCode).json(body);
};

module.exports = errorHandler;
