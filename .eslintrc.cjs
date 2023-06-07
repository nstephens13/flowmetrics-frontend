/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/eslint-config-typescript',
    'plugin:import/typescript',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'warn',
    'import/no-unresolved': 0,
    'linebreak-style': ['error', 'unix']
  },
  plugins: ['@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  overrides: [
    {
      files: ['src/main.ts', 'src/shims-vue.d.ts'],
      rules: {
        'vue/multi-word-component-names': 'off',
        'vue/no-reserved-component-names': 'off',
        '@typescript-eslint/ban-types': 0,
        '@typescript-eslint/no-explicit-any': 0
      }
    }
  ]
}
