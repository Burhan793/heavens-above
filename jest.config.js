// Jest configuration for Heavens Above project
module.exports = {
	testEnvironment: 'node',
	coverageDirectory: 'coverage',
	collectCoverageFrom: [
		'src/**/*.js',
		'!src/**/*.test.js',
		'!node_modules/**'
	],
	testMatch: [
		'**/__tests__/**/*.js',
		'**/?(*.)+(spec|test).js'
	],
	coverageThreshold: {
		global: {
			branches: 0,
			functions: 0,
			lines: 0,
			statements: 0
		}
	},
	verbose: true
};
