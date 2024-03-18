module.exports = {
  rules: {
    debug: require("./rules/debug"),
    "ata-required-test-attributes": require("./rules/ata-required-test-attributes"),
    "ata-test-stats": require("./rules/ata-test-stats"),
    "no-concurrent-async": require("./rules/no-concurrent-async"),
    "no-deprecated-components": require("./rules/no-deprecated-components"),
    "no-cyclic-modules-imports": require("./rules/no-cyclic-modules-imports"),
    "enforce-eslint-mandatory-prop": require("./rules/enforce-eslint-mandatory-prop"),
    "no-trailing-slash": require("./rules/no-trailing-slash"),
    "no-window-location-replace": require("./rules/no-window-location-replace"),
  },
};
