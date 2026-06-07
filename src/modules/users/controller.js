const ApiResponse = require('../../utils/response');
const userService = require('./service');

const getUsers = (req, res) => {
  const response = new ApiResponse(res);
  const users = userService.getUsers();
  response.success(users);
};

const createUser = (req, res) => {
  const response = new ApiResponse(res);
  const user = userService.createUser(req.body);
  response.success(user, 201);
};

module.exports = {
  getUsers,
  createUser,
};
