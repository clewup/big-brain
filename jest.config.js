const nextJest = require('next/jest');
const { resolve } = require('path');

const createJestConfig = nextJest({
    dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/testUtils/setupTests.tsx'],
    moduleNameMapper: {
        '^@/(.*)$': resolve(__dirname, 'src/$1'),
    },
};

module.exports = createJestConfig(customJestConfig);
