const { stringify, extractString } = require('../utils/nodeHelper')
const { findProperty } = require('../utils/objectExpressionHelper')
const { extractStringValues } = require ('../utils/arrayExpressionHelper')

const stringifyTags = (tags) => `(${tags.join(',')})`

const validateTags = (node, context) => {
  const { value } = node
  const { elements } = value
  const tags = extractStringValues(value)


  const options = context.options[0]
  if (!options) {
    throw Error('missing cofiguration')
  }
  const { matchers } = options
  matchers.forEach(({ pathPattern, requiredTags: requiredTagsPatterns }) => {
    if (new RegExp(pathPattern).test(context.getFilename())) {
      requiredTagsPatterns.forEach((requiredTagPattern) => {
        let requiredTags
        let predicate

        if(requiredTagPattern.includes('^')) {
          requiredTags = requiredTagPattern.split('^')
          predicate = (tags) => {
            const presentTags = tags.filter((tag) => requiredTags.includes(tag))
            return {
              failure: presentTags.length !== 1,
              message: (
                presentTags.length > 1
                  ? `Two many tags ${stringifyTags(presentTags)} but at most one required`
                  : presentTags.length === 0
                    ? `Missing required tag ${stringifyTags(requiredTags)}`
                    : undefined
              )
            }
          }
        } else if(requiredTagPattern.includes('|')) {
          requiredTags = requiredTagPattern.split('|')
          predicate = (tags) => {
            const presentTags = tags.filter((tag) => requiredTags.includes(tag))
            return {
              failure: presentTags.length < 1,
              message: presentTags.length < 1 ? `Missing required tag ${stringifyTags(requiredTags)}` : undefined
            }
          }
        } else {
          requiredTags = [requiredTagPattern]
          presentTags = tags.filter((tag) => requiredTags.includes(tag))
          predicate = (tags) => {
            return {
              failure: presentTags.length < 1,
              message: presentTags.length < 1 ? `Missing required tag ${stringifyTags(requiredTags)}` : undefined
            }
          }
        }

        const { failure, message } = predicate(tags)

        if (failure) {
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
            message,
            fix,
          })
        }
      })
    }
  })
}

const validateTcrIds = (node, context) => {
  const { value } = node
  const { elements } = value
  const tcrIds = extractStringValues(value).filter((tcrId) => tcrId)
  if (tcrIds.length === 0) {
    context.report({
      node,
      message: `Test must have at least one TCR id`,
    })
  }
}

module.exports = {
  meta: {
    docs: {
      description: "Enforcing required attributes (tags, tcr ids) by path in ata tests.",
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
  create: function (context) {
    return {
      Property(node) {
        const { key, value, parent } = node
        if (
          key &&
          key.type === 'Identifier' &&
          value?.type === 'ArrayExpression' &&
          parent?.parent &&
          parent.parent.type === 'CallExpression' &&
          parent.parent.callee?.name === 'test'
        ) {

          switch(key.name) {
            case 'tags':
              validateTags(node, context)
              break
            case 'tcrIds':
              validateTcrIds(node, context)
              break
          }
        }
      }
    }
  }
}
