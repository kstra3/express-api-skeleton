const uuid = require('crypto').randomUUID;

const requestId = (req, res, next) => {
  req.id = req.id || uuid();
  res.set('X-Request-Id', req.id);
  next();
};

module.exports = requestId;
