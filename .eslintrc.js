/* eslint-env node */

module.exports = {
  root: true,
  extends: ['@nuxtjs/eslint-config-typescript', '@vue/eslint-config-prettier'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { ignoreRestSiblings: true },
    ],
    'prettier/prettier': ['error', { singleQuote: true }],
  },
};
