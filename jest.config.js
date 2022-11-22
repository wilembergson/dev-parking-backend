module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/**/index.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  clearMocks: true,
  moduleNameMapper: {
    '~/test/(.+)': '<rootDir>/test/$1',
    '@domain/(.+)': '<rootDir>/src/domain/$1',
    '@application/(.+)': '<rootDir>/src/application/$1',
    '@infra/(.+)': '<rootDir>/src/infra/$1'
  },
  testMatch: ['**/*.spec.ts'],
  roots: ['<rootDir>/src', '<rootDir>/test'],
  transform: {
    '\\.ts$': 'ts-jest'
  }
}