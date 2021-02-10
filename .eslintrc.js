module.exports = {
  extends: [
    'plugin:eslint-comments/recommended',
  ],
  plugins: [
    'plentific'
  ],
  parserOptions: {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  rules: {
    'plentific/no-trailing-slash': 'error',
    'plentific/no-trans-component': 'error',
    'eslint-comments/no-unused-disable': 'error',
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
  },
}