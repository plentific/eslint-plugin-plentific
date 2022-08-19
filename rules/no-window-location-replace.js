module.exports = {
  meta: {
    type: "problem",
    fixable: "code",
    schema: [] // no options
  },
  create: function (context) {
    return {
      CallExpression(node) {
        const { callee } = node
        const { type, property, object } = callee
        if (
          type === 'MemberExpression' && property.type === 'Identifier' &&
          property.name === 'replace' && object.type === 'MemberExpression'
        ) {
          if (
            object.property.type === 'Identifier' && object.property.name === 'location' &&
            object.object.type === 'Identifier' && object.object.name === 'window'
          ) {
            context.report({
              node,
              message: 'window.location.replace is not allowed please use windowLocationReplace from \'modules/common/utils/window\'',
              fix: function (fixer) {
                return fixer.replaceText(callee, 'windowLocationReplace')
              }
            })
          }
        }
      }
    }
  }
}
