import ApiResponse from '../../utils/response.js';
import * as healthService from './service.js';

export async function getHealth(req, res) {
  const response = new ApiResponse(res);
  const data = await healthService.getHealth();
  response.success(data);
}

export async function getReady(req, res) {
  const response = new ApiResponse(res);
  const data = await healthService.getReady();
  response.success(data);
}
