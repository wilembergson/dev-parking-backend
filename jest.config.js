module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/**/index.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  clearMocks: true,
  moduleNameMapper: {
    '~/test/(.+)': '<rootDir>/test/$1',
    '@domain/(.+)': '<rootDir>/src/core/domain/$1',
    '@application/(.+)': '<rootDir>/src/core/application/$1',
    '@infra/(.+)': '<rootDir>/src/core/infra/$1',
  },
  testMatch: ['**/*.spec.ts'],
  roots: ['<rootDir>/src', '<rootDir>/test'],
  transform: {
    '\\.ts$': 'ts-jest',
  },
};
