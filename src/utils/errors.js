const createError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  error.code = status;
  return error;
};

module.exports = { createError };
