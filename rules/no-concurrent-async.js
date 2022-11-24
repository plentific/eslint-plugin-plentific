const { ReferenceTracker } = require("eslint-utils")

module.exports = {
  meta: {
    docs: {
      description: "Disallow using `Promise.all`.",
      category: "acceptance-tests",
    },
    schema: [],
    type: "problem",
  },
  create(context) {
    return {
      'Program:exit'() {
        const tracker = new ReferenceTracker(context.getScope())
        for (const { node } of tracker.iterateGlobalReferences({
          Promise: {
            all: {
              [ReferenceTracker.CALL]: true,
            }
          }
        })) {
          context.report({
            node,
            message: "Concurrent async execution using `Promise.all` is not allowed. Please use `for await...of` to ensure order of interactions.",
          })
        }
      },
    }
  },
}
