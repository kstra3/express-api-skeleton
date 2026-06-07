const notFound = (req, res, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  error.code = 404;
  next(error);
};

module.exports = notFound;
