module.exports = {
	env: { browser: true, es2020: true },
	ignorePatterns: ['dist', '.eslintrc.js'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: ['./tsconfig.json', './tsconfig.node.json'],
		tsconfigRootDir: __dirname,
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	plugins: ['@typescript-eslint'],
	rules: {
		indent: ['off', 'tab'],
		'linebreak-style': [0, 'auto'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'@typescript-eslint/explicit-function-return-type': 0,
		'@typescript-eslint/explicit-module-boundary-types': 0,
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
			},
		],
		'no-unused-vars': 'off',
		'no-mixed-spaces-and-tabs': 'off',
	},
};
