// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
    // Handle CSS imports (if you have global CSS imports)
    // '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Optional: if you face issues with CSS
  },
  preset: 'ts-jest', // Use ts-jest preset for TypeScript
  // transform: { // ts-jest already handles this via preset
  //   '^.+\\.(ts|tsx)?$': 'ts-jest',
  // },
  // globals: { // Not typically needed with ts-jest preset for basic setup
  //   'ts-jest': {
  //     tsconfig: 'tsconfig.jest.json' // Optional: if you have a separate tsconfig for tests
  //   }
  // }
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
