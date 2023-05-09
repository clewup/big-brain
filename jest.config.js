import nextJest from 'next/jest';
import { resolve } from 'path';

const createJestConfig = nextJest({
    dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@/(.*)$': resolve(__dirname, 'src/$1'),
    },
};

module.exports = createJestConfig(customJestConfig);
