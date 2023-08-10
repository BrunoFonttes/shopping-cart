module.exports = {
	'env': {
		'es2021': true,
		'node': true
	},
	'extends': [
		'plugin:@typescript-eslint/recommended',
		"plugin:prettier/recommended"
	],
	'overrides': [
		{
			'env': {'node': true},
			'files': [
				'.eslintrc.{js,cjs}'
			],
			'parserOptions': {'sourceType': 'script'}
		}
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {'ecmaVersion': 'latest'},
	'plugins': [
		'@typescript-eslint', 'prettier'
	],
	'rules': {
		"padding-line-between-statements": [
			"error",
			{
				blankLine: "always", prev: ["const", "let", "var"], next: "*"
			},
			{
				blankLine: "always", prev: "*", next: ["const", "let", "var"]
			},
			{
				blankLine: "always", prev: "block-like", next: "*"
			},
			{
				blankLine: "always", prev: "*", next: "block-like"
			}
		],
		"lines-between-class-members": ["error", "always"],
		"object-curly-newline": ["error", {
			"ObjectExpression": {"multiline": true , "minProperties":3},
			"ObjectPattern": {"multiline": true , "minProperties":4},
			"ImportDeclaration": {"multiline": true, "minProperties": 4},
			"ExportDeclaration": {"multiline": true, "minProperties": 3}
		}],
		'eol-last': ["error", "always"],
		'no-console': 2,
		'prettier/prettier':'error'
	}
}
