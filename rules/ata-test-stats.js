const { stringify, extractString } = require('../utils/nodeHelper')
const { findProperty } = require('../utils/objectExpressionHelper')

const testDeclarations = [
]

const extractListFromArrayExpressionProperty = (node, name) => {
  const property = findProperty(node, name)
  if (property && property.value.type === 'ArrayExpression') {
    return property.value.elements.filter((element) => element.type === 'Literal').map(({ value }) => value)
  }
  return
}


module.exports = {
  meta: {
    docs: {
      description: "Rule to help collect ata stats.",
      category: "acceptance-tests",
    },
    schema: [{
      type: "object",
      properties: {
        matchers: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
      additionalProperties: false,
    }],
    type: "problem",
  },
  getCollectedTestDeclarations: () => testDeclarations,
  create: function (context) {
    return {
      CallExpression({ callee, arguments }) {

        // Check if the callee is a function named 'test'
        if (
          callee.type === 'Identifier' &&
          callee.name === 'test' &&
          arguments.length > 1 &&
          arguments[1].type === 'ObjectExpression'
        ) {
          const title = extractString(arguments[0])
          const optionsNode = arguments[1]
          const tags = extractListFromArrayExpressionProperty(optionsNode, 'tags')

          const tcrIds = extractListFromArrayExpressionProperty(optionsNode, 'tcrIds')

          testDeclarations.push({
            tags,
            tcrIds,
            title: extractString(arguments[0]),
            filename: context.getFilename(),
          })
        }
      }
    }
  }
}
