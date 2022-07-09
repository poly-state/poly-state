module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint', 'react-hooks'],
	rules: {
		indent: ['off', 'tab'],
		'linebreak-style': [0, 'auto'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'error',
		'react/react-in-jsx-scope': 0,
		'@typescript-eslint/explicit-function-return-type': 0,
		'@typescript-eslint/explicit-module-boundary-types': 0,
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
			},
		],
		'react/prop-types': 0,
		'no-unused-vars': 'off',
		'no-mixed-spaces-and-tabs': 'off',
	},
};
