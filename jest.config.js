module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/src/tests/**/*.test.js'],
  modulePathIgnorePatterns: ['<rootDir>/express-api-skeleton/'],
  collectCoverageFrom: ['src/**/*.js', '!src/**/*.test.js', '!src/**/*.config.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'text-summary', 'lcov', 'html'],
  verbose: true,
};