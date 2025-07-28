const path = require('path')
const nextJest = require('next/jest')

// Get the project root directory (parent of scripts)
const projectRoot = path.resolve(__dirname, '..')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: projectRoot,
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  rootDir: projectRoot,
  setupFilesAfterEnv: [path.join(projectRoot, 'scripts', 'jest.setup.js')],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [path.join(projectRoot, '.next/'), path.join(projectRoot, 'node_modules/')],
  moduleNameMapper: {
    '^@/(.*)$': path.join(projectRoot, 'src/$1'),
    '^@lib/(.*)$': path.join(projectRoot, 'src/lib/$1'),
    '^@modules/(.*)$': path.join(projectRoot, 'src/modules/$1'),
    '^@design/(.*)$': path.join(projectRoot, 'src/design/$1'),
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