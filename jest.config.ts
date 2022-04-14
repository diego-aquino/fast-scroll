export default {
  roots: ['<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  testEnvironment: 'jsdom',
  clearMocks: true,

  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['json', 'lcov'],
  coveragePathIgnorePatterns: ['^<rootDir>/node_modules', '^<rootDir>/src/types/.+\\.ts$'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx,ts,tsx}', '!**/*.d.ts'],

  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  moduleNameMapper: {
    '^~/([^\\.]*)$': '<rootDir>/src/$1',
    '^~~/([^\\.]*)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': '@swc/jest',
  },

  testMatch: ['<rootDir>/src/**/*.test.[jt]s?(x)'],
  testPathIgnorePatterns: ['node_modules', 'build'],

  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
