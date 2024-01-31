module.exports = {
  rules: {
    debug: require("./rules/debug"),
    "no-concurrent-async": require("./rules/no-concurrent-async"),
    "no-deprecated-components": require("./rules/no-deprecated-components"),
    "no-cyclic-modules-imports": require("./rules/no-cyclic-modules-imports"),
    "no-trailing-slash": require("./rules/no-trailing-slash"),
    "no-window-location-replace": require("./rules/no-window-location-replace"),
  },
};
