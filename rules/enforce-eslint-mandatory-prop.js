const hasProp = require("jsx-ast-utils/hasProp");

module.exports = {
  /** @type {import('eslint').Rule.RuleMetaData} */
  meta: {
    type: "problem",
    docs: {
      description: "Enforce passing a mandatory prop to a component",
    },
    schema: [
      {
        type: "object",
        additionalProperties: {
          type: "object",
          additionalProperties: {
            type: "object",
            additionalProperties: {
              type: "boolean",
            },
          },
        },
      },
    ],
  },
  /** @type {import('eslint').Rule.RuleModule['create']} */
  create: function (context) {
    const config = context.options[0].config;

    return {
      JSXElement(node) {
        const mandatoryProps = config[node.openingElement.name.name];

        if (!mandatoryProps) return;

        Object.keys(mandatoryProps).forEach((prop) => {
          if (!hasProp(node.openingElement.attributes, prop)) {
            context.report({
              node,
              message: `Mandatory prop ${prop} is missing in component ${node.openingElement.name.name}`,
            });
          }
        });
      },
    };
  },
};
