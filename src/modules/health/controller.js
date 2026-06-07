const ApiResponse = require('../../utils/response');
const healthService = require('./service');

const getHealth = async (req, res) => {
  const response = new ApiResponse(res);
  const data = await healthService.getHealth();
  response.success(data);
};

const getReady = async (req, res) => {
  const response = new ApiResponse(res);
  const data = await healthService.getReady();
  response.success(data);
};

module.exports = { getHealth, getReady };