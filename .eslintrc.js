/** @type {import('eslint').Linter.Config} */
const eslintConfig = {
  root: true,
  env: {
    node: true,
    es2021: true
  },
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  },

  parser: '@typescript-eslint/parser',

  plugins: ['@typescript-eslint', 'prettier'],

  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],

  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/consistent-type-imports': ['error'],
    '@typescript-eslint/consistent-type-exports': ['error'],
    // 'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    'import/no-unresolved': 'off',
    '@typescript-eslint/no-empty-function': 'off'
  }
};

module.exports = eslintConfig;
