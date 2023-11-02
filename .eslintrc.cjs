/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'airbnb-base',
    'prettier',
    '@vue/typescript/recommended',
    '@vue/eslint-config-typescript',
    'plugin:import/typescript',
  ],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
  },
  ignorePatterns: ['src/generated-api/*'],
  rules: {
    'prettier/prettier': 'error',
    'import/extensions': [
      'warn',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        '': 'never',
      },
    ],
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/no-unused-vars': 'error',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'warn',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-unresolved': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'linebreak-style': ['error', 'unix'],
    'new-cap': 0,
  },
  plugins: ['@typescript-eslint', 'prettier'],
  overrides: [
    {
      files: ['src/main.ts', 'src/shims-vue.d.ts'],
      rules: {
        'vue/multi-word-component-names': 'off',
        'vue/no-reserved-component-names': 'off',
        '@typescript-eslint/ban-types': 0,
        '@typescript-eslint/no-explicit-any': 0,
      },
    },
  ],
};
