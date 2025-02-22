import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom', '<rootDir>/jest.setup.ts', ], 
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.app.json',
    },
  },
};

export default config;
