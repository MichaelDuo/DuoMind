module.exports = {
	roots: ['<rootDir>/src'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	testMatch: [
		'<rootDir>/**/__tests__/**/*.{js,jsx,ts,tsx}',
		'<rootDir>/**/?(*.){steps,spec}.{js,jsx,ts,tsx}',
	],
	testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
};
