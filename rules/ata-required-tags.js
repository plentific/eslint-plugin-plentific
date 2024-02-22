// more info https://eslint.org/docs/latest/developer-guide/working-with-rules

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if(key === 'parent') {
      return
    }
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value)
    }
    return value
  };
};

const tagsDeclarationList = [
]


module.exports = {
  meta: {
    docs: {
      description: "Enforcing required tags by path in ata tests.",
      category: "acceptance-tests",
    },
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

          tagsDeclarationList.push({
            tags,
            filename: context.getFilename(),
          })

          if (context.getFilename().endsWith('test.ts')) {
            const options = context.options[0]

            console.log(options)
            if (!options) {
              throw Error('missing cofiguration')
            }
            const { matchers } = options
            matchers.some(({ pathPattern, requiredTags: requiredTagsPatterns }) => {
              if (new RegExp(pathPattern).test(context.getFilename())) {

                requiredTagsPatterns.forEach((requiredTagPattern) => {
                  const requiredTags = requiredTagPattern.split('|')
                  if (!requiredTags.some((requiredTag) => tags.includes(requiredTag))) {
                    context.report({
                      node,
                      message: `Missing required tag: ${requiredTags.join(', ')}`,
                    })
                  }
                })
              }
            })

            console.log(context.getFilename())
            console.log('AAA', JSON.stringify(tags, getCircularReplacer(), 2))
          }
        }

      }
      // NOTE: just for debugging
      // Program(node) {
        // if(context.getFilename().endsWith('test.ts')) {
        //   console.log(context.getFilename())
        //   console.log(JSON.stringify(node, getCircularReplacer(), 2))
        // }
      // }
    }
  }
}
