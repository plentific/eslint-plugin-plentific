module.exports = {
  rules: {
    'debug': require('./rules/debug'),
    'no-trailing-slash': require('./rules/no-trailing-slash'),
    'no-cyclic-modules-imports': require('./rules/no-cyclic-modules-imports'),
    'no-window-location-replace': require('./rules/no-window-location-replace'),
  }
}
