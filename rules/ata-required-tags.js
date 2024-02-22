const tagsDeclarations = [
]

module.exports = {
  meta: {
    docs: {
      description: "Enforcing required tags by path in ata tests.",
      category: "acceptance-tests",
    },
    fixable: "code",
    schema: [{
      type: "object",
      properties: {
        matchers: {
          type: "array",
          items: {
            type: "object",
            properties: {
              pathPattern: {
                type: "string",
              },
              requiredTags: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      additionalProperties: false,
    }],
    type: "problem",
  },
  getCollectedTagsDeclarations: () => tagsDeclarations,
  create: function (context) {
    return {
      Property(node) {
        const { key, value, parent } = node
        if (
          key &&
          key.name === 'tags' &&
          key.type === 'Identifier' &&
          value?.type === 'ArrayExpression' &&
          parent?.parent &&
          parent.parent.type === 'CallExpression' &&
          parent.parent.callee?.name === 'test'
        ) {
          const { elements } = value
          const { callee } = parent.parent
          const tags = elements.filter((element) => element.type === 'Literal').map(({ value }) => value)

          tagsDeclarations.push({
            tags,
            filename: context.getFilename(),
          })

          if (context.getFilename().endsWith('test.ts')) {
            const options = context.options[0]
            if (!options) {
              throw Error('missing cofiguration')
            }
            const { matchers } = options
            matchers.some(({ pathPattern, requiredTags: requiredTagsPatterns }) => {
              if (new RegExp(pathPattern).test(context.getFilename())) {

                requiredTagsPatterns.forEach((requiredTagPattern) => {
                  const requiredTags = requiredTagPattern.split('|')
                  if (!requiredTags.some((requiredTag) => tags.includes(requiredTag))) {
                    let fix = undefined
                    if (requiredTags.length === 1) {
                      const [requiredTag] = requiredTags
                      fix = (fixer) => {
                        // Determine the insertion point and text format based on existing elements
                        const lastElement = elements[elements.length - 1];
                        const insertionText = elements.length > 0 ? `, '${requiredTag}'` : `'${requiredTag}'`;
                        const insertionPoint = lastElement ? lastElement.range[1] : value.range[0] + 1; // Adjust for array start

                        return fixer.insertTextAfterRange([insertionPoint - 1, insertionPoint], insertionText);
                      }
                    }


                    context.report({
                      node,
                      message: `Missing required tag: ${requiredTags.join(', ')}`,
                      fix,
                    })
                  }
                })
              }
            })
          }
        }

      }
    }
  }
}
