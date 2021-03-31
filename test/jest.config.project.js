const path = require('path');

module.exports = {
	clearMocks: true,
	collectCoverageFrom: ['**/components/**/*.js'],
	coverageDirectory: 'coverage',
	coveragePathIgnorePatterns: ['.*/__test__/.*'],
	testEnvironment: 'node',
	rootDir: path.join(__dirname, '..'),
	roots: [path.join(__dirname, '../components')],
	testMatch: ['**/__tests__/**.test.js'],
	globalSetup: require.resolve('./setup'),
	setupFilesAfterEnv: [require.resolve('./setup-env')],
	watchPlugins: [
		'jest-watch-typeahead/filename',
		'jest-watch-typeahead/testname',
	],
};
