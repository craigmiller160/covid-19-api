const { defaults } = require('jest-config');

module.exports = {
    ...defaults,
    bail: true,
    collectCoverage: true,
    collectCoverageFrom: [
        'test/**/*.js'
    ],
    modulePaths: [
        '<rootDir>/src'
    ],
    testMatch: [
        '<rootDir>/test/**/*.{test,Spec}.js'
    ],
    moduleDirectories: [
        'node_modules',
        'src'
    ]
};