const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const message = error.details.map((d) => d.message).join(', ');
    const err = new Error(message);
    err.code = 400;
    return next(err);
  }
  next();
};

module.exports = { validateBody };
