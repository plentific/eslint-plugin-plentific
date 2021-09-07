module.exports = {
  create: function (context) {
    return {
      Property(node) {
        const { key, value } = node
        if(
          /managers/.test(context.getFilename()) &&
          key.name === 'path' && 
          value.value && value.value.endsWith('/')
        )  {
          context.report({
            node, 
            message: 'Trailing slashes are not desired anymore please contact b/e developer to fix issue.'
          })
        }
      }
    }
  }
}