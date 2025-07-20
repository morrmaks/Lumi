module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: [
		'react',
		'react-hooks',
		'@typescript-eslint',
		'prettier',
		'unused-imports'
	],
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended'
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	env: {
		browser: true,
		es2021: true,
		jest: true,
		node: true
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		'prettier/prettier': [
			'warn',
			{
				endOfLine: 'auto'
			}
		],
		'react/jsx-filename-extension': [
			2,
			{ extensions: ['.js', '.jsx', '.tsx'] }
		],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'warn',
		'unused-imports/no-unused-imports': 'error',
		'unused-imports/no-unused-vars': [
			'warn',
			{
				vars: 'all',
				varsIgnorePattern: '^_',
				args: 'after-used',
				argsIgnorePattern: '^_'
			}
		],
		'import/prefer-default-export': 'off',
		'import/extensions': 'off',
		'react/react-in-jsx-scope': 'off',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn'
	}
}