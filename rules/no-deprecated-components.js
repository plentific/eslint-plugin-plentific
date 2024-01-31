module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Prevent importing deprecated component based on a configurable list of restricted paths.",
    },
    schema: [
      {
        type: "array",
        items: {
          type: "string",
        },
        uniqueItems: true,
      },
    ],
    messages: {
      deprecatedComponentImport:
        'Components and utils under "{{path}}" are considered deprecated, please migrate the usage to the agreed upon replacement.',
    },
  },

  create(context) {
    const restrictedPaths = new Set(context.options[0] || []);

    return {
      ImportDeclaration(node) {
        if (restrictedPaths.has(node.source.value)) {
          context.report({
            node,
            messageId: "deprecatedComponentImport",
            data: {
              path: node.source.value,
            },
          });
        }
      },
    };
  },
};
