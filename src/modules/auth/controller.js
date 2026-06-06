const jwt = require('jsonwebtoken');

const register = (req, res) => {
  const { email, password } = req.body;
  const token = jwt.sign({ email }, process.env.JWT_SECRET || 'fallback-secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
  res.json({ success: true, data: { token, email } });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const token = jwt.sign({ email }, process.env.JWT_SECRET || 'fallback-secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
  res.json({ success: true, data: { token, email } });
};

module.exports = { register, login };
