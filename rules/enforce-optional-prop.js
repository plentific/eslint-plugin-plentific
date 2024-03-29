// @ts-check
const hasProp = require("jsx-ast-utils/hasProp");

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce passing a prop to a component based on config",
    },
    schema: [
      {
        type: "object", // Configuration object
        additionalProperties: {
          type: "object", // Component name
          additionalProperties: {
            type: "boolean", // Prop name
          },
        },
      },
    ],
  },
  create: function (context) {
    const config = context.options[0];

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
