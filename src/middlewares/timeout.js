const timeout = (ms) => (req, res, next) => {
  const timer = setTimeout(() => {
    if (res.headersSent) return;
    req.timedOut = true;
    const err = new Error('Gateway Timeout');
    err.status = 504;
    next(err);
  }, ms);

  res.on('finish', () => clearTimeout(timer));
  res.on('close', () => clearTimeout(timer));

  next();
};

module.exports = timeout;
