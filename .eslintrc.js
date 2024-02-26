const noCyclicModulesImportsConfig = `
[<all-modules>] --> [a]
[c] --> [b]
[d]
[e]
[g] --> [f]
`

module.exports = {
  extends: ["plugin:eslint-comments/recommended"],
  plugins: ["plentific"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  env: {
    es6: true,
  },
  rules: {
    "eslint-comments/disable-enable-pair": ["error", { allowWholeFile: true }],
    "eslint-comments/no-unused-disable": "error",
    "plentific/debug": "error",
    "plentific/no-concurrent-async": "error",
    "plentific/no-deprecated-components": [
      "error",
      {
        "examples/app/components/ComponentDeprecated":
          "examples/app/components/Component",
      },
    ],
    "plentific/no-cyclic-modules-imports": [
      "error",
      { config: noCyclicModulesImportsConfig },
    ],
    "plentific/no-trailing-slash": "error",
    "plentific/no-window-location-replace": "error",
    "plentific/ata-required-test-attributes": [
      "error",
      {
        matchers: [{
          pathPattern: '.*/ata/e2e/.*/.*\\.test\\.ts',
          requiredTags: ['e2e', 'high|highest|medium|low'],
        }]
      },
    ],
  },

  overrides: [
    {
      files: ["examples/**/*.js{x,}"],
      parser: "@babel/eslint-parser",
      parserOptions: {
        ecmaVersion: 2018,
        ecmaFeatures: {
          jsx: true,
          legacyDecorators: true,
        },
      },
      rules: {
        quotes: [2, "single"],
      },
    },
    {
      files: ["examples/**/*.ts{x,}"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
  ],
};
