const Joi = require('joi');

const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(3000),
  API_KEY: Joi.string().allow(''),
  ENABLE_REQUEST_LOG: Joi.string().valid('true', 'false').default('true'),
  RATE_LIMIT_WINDOW_MS: Joi.number().default(900000),
  RATE_LIMIT_MAX: Joi.number().default(100),
  JWT_SECRET: Joi.string().default('secret'),
  JWT_EXPIRES_IN: Joi.string().default('7d'),
  MONGODB_URI: Joi.string().allow('').optional(),
  REDIS_URL: Joi.string().allow('').optional(),
  CORS_ORIGIN: Joi.string().default('*'),
}).unknown();

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Invalid environment variables: ${error.message}`);
}

module.exports = {
  env: value.NODE_ENV,
  port: value.PORT,
  apiKey: value.API_KEY,
  enableRequestLog: value.ENABLE_REQUEST_LOG === 'true',
  rateLimitWindowMs: value.RATE_LIMIT_WINDOW_MS,
  rateLimitMax: value.RATE_LIMIT_MAX,
  corsOrigin: value.CORS_ORIGIN,
};
