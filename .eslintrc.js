/* eslint-env node */

module.exports = {
  root: true,
  extends: ['@nuxtjs/eslint-config-typescript', '@vue/eslint-config-prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      { ignoreRestSiblings: true },
    ],
    'prettier/prettier': ['error', { singleQuote: true }],
  },
};
