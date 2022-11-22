module.exports = {
  rules: {
    'debug': require('./rules/debug'),
    'no-cyclic-modules-imports': require('./rules/no-cyclic-modules-imports'),
    'no-parallel-async': require('./rules/no-parallel-async'),
    'no-trailing-slash': require('./rules/no-trailing-slash'),
    'no-window-location-replace': require('./rules/no-window-location-replace'),
  }
}
