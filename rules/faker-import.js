module.exports = {
  meta: {
    type: "problem",
    fixable: "code",
    schema: [] // no options
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        if(node.source.value.includes('import Faker from \'faker\'')) {
          context.report({
            node,
            message: 'default export is expected for Faker import',
            fix: fixer => fixer.replaceText(node.source.value, 'import * as Faker from \'faker\'')
          });
        }
      },
    }
  }
}
