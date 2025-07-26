const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@design/(.*)$': '<rootDir>/src/design/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/index.{js,jsx,ts,tsx}',
    '!src/design/ui/**/*', // Exclude design system tests for now
    '!src/design/icons/**/*', // Exclude design icons
    '!src/design/ui-preset/**/*', // Exclude design preset
    '!src/app/**/*', // Exclude app directory for now to focus on lib and modules
  ],
  coverageThreshold: {
    global: {
      branches: 22,
      functions: 50,
      lines: 36,
      statements: 37,
    },
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)