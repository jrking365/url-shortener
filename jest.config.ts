import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
  return {
    collectCoverageFrom: ['<rootDir>/src/**/*.ts*', '<rootDir>/src/*.ts*'],
    coverageThreshold: {
      global: {
        branches: 85,
        functions: 85,
        lines: 85,
        statements: 85,
      },
    },
    transform: {
      '^.+\\.tsx?$': [
        'ts-jest',
        {
          diagnostics: false,
          isolatedModules: true,
          tsconfig: '<rootDir>/tsconfig.json',
        },
      ],
    },
    modulePathIgnorePatterns: [
      '<rootDir>/config/',
      '<rootDir>/node_modules/',
    ],
    preset: 'ts-jest',
    testEnvironment: 'node',
    // setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'], // Use setupFilesAfterEnv instead of setupFiles
    verbose: true
  };
};