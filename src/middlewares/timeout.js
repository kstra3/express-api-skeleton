const timeout = (ms) => (req, res, next) => {
  const timer = setTimeout(() => {
    res.status(504).json({
      success: false,
      message: 'Gateway Timeout',
    });
  }, ms);

  res.on('finish', () => clearTimeout(timer));
  res.on('close', () => clearTimeout(timer));

  next();
};

module.exports = timeout;
