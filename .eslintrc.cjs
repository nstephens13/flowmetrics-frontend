/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'airbnb-base',
    '@vue/eslint-config-typescript',
    'plugin:import/typescript',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
  },
  rules: {
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
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-unused-vars': 'error',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'warn',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-unresolved': 0,
    'linebreak-style': ['error', 'unix'],
    'new-cap': 0,
  },
  plugins: ['@typescript-eslint'],
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
