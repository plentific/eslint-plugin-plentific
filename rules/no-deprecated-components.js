module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Prevent importing deprecated component based on a configurable list of restricted paths.",
    },
    schema: [
      {
        type: "object",
        additionalProperties: {
          type: "string",
        },
      },
    ],
    messages: {
      deprecatedComponentImport:
        'Components and utils under "{{path}}" are considered deprecated, please migrate the usage to "{{replacement}}". If this rule is blocking you and you have to disable it, please include a comment with JIRA ticket and the reason for not doing the migration.',
    },
  },

  create(context) {
    const restrictedPaths = context.options[0] || {};

    return {
      ImportDeclaration(node) {
        if (restrictedPaths.hasOwnProperty(node.source.value)) {
          context.report({
            node,
            messageId: "deprecatedComponentImport",
            data: {
              path: node.source.value,
              replacement: restrictedPaths[node.source.value],
            },
          });
        }
      },
    };
  },
};
