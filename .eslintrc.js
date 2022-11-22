const noCyclicModulesImportsConfig = `
[<all-modules>] --> [a]
[c] --> [b]
[d]
[e]
[g] --> [f]
`

module.exports = {
  extends: [
    'plugin:eslint-comments/recommended',
  ],
  plugins: [
    'plentific'
  ],

  rules: {
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    'eslint-comments/no-unused-disable': 'error',
    'plentific/debug': 'error',
    'plentific/no-cyclic-modules-imports': ['error', { config: noCyclicModulesImportsConfig }],
    'plentific/no-parallel-async': 'error',
    'plentific/no-trailing-slash': 'error',
    'plentific/no-window-location-replace': 'error',
  },

  overrides: [{
    files: ['examples/**/*.js{x,}'],
    parser: '@babel/eslint-parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
        legacyDecorators: true,
      },
    },
    rules: {
      quotes: [2, 'single']
    }
  }, {
    files: ['examples/**/*.ts{x,}'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
      project: './tsconfig.json',
    },
  }]
}
