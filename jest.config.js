import nextJest from 'next/jest'
import { resolve } from 'path'

const createJestConfig = nextJest({
    dir: './',
})

/** @type {import('jest').Config} */
const customJestConfig = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        // eslint-disable-next-line no-undef
        '^@/(.*)$': resolve(__dirname, 'src/$1'),
    },
}

// eslint-disable-next-line no-undef
module.exports = createJestConfig(customJestConfig)
