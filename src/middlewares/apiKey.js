const apiKey = (req, res, next) => {
  const provided = req.headers['x-api-key'];
  const expected = process.env.API_KEY;

  if (!expected || expected === '') {
    return next();
  }

  if (!provided || provided !== expected) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or missing API key',
    });
  }

  next();
};

module.exports = apiKey;
