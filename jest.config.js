import nextJest from 'next/jest'
import { resolve } from 'path'

const createJestConfig = nextJest({
    dir: './',
})

/** @type {import('jest').Config} */
const customJestConfig = {
    moduleNameMapper: {
        // eslint-disable-next-line no-undef
        '^@/(.*)$': resolve(__dirname, 'src/$1'),
    },
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
}

// eslint-disable-next-line no-undef
module.exports = createJestConfig(customJestConfig)
