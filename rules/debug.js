// more info https://eslint.org/docs/latest/developer-guide/working-with-rules

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

module.exports = {
  create: function (context) {
    return {
      // NOTE: just for debugging
      Program(node) {
        // if(context.getFilename().endsWith('window-location-replace.ts')) {
        //   console.log(context.getFilename())
        //   console.log(JSON.stringify(node, getCircularReplacer(), 2))
        // }
      }
    }
  }
}
