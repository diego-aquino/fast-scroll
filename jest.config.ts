export default {
  roots: ['<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  testEnvironment: 'jsdom',
  clearMocks: true,

  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['json', 'lcov'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/dev/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
  ],

  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  moduleNameMapper: {
    '^~/([^\\.]*)$': '<rootDir>/src/$1',
    '^~tests/([^\\.]*)$': '<rootDir>/tests/$1',
  },

  testMatch: ['<rootDir>/tests/**/*.test.[jt]s?(x)'],
  testPathIgnorePatterns: ['node_modules', 'build'],

  transform: {
    '^.+\\.(ts|tsx)$': '@swc/jest',
  },
};
