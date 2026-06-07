const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config/env');

const register = async (req, res) => {
  const { email, password } = req.body;

  // TODO: Check if user already exists in DB (e.g. await User.findOne({ email }))
  // TODO: Throw 409 Conflict if email already taken

  const _hashedPassword = await bcrypt.hash(password, 12);

  // TODO: Persist new user to DB (e.g. await User.create({ email, password: _hashedPassword }))

  const token = jwt.sign({ email }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });

  res.status(201).json({ success: true, data: { token, email } });
};

const login = async (req, res) => {
  const { email, password: _password } = req.body;

  // TODO: Find user by email in DB (e.g. const user = await User.findOne({ email }))
  // TODO: If not found, throw 401 Unauthorized
  // TODO: Verify password (e.g. const match = await bcrypt.compare(_password, user.password))
  // TODO: If no match, throw 401 Unauthorized

  const token = jwt.sign({ email }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });

  res.json({ success: true, data: { token, email } });
};

module.exports = { register, login };
