// @ts-enable
const ESLint = require("eslint");
const hasProp = require("jsx-ast-utils/hasProp");

module.exports = {
  /** @type {ESLint.Rule.RuleMetaData} */
  meta: {
    type: "problem",
    docs: {
      description:
        "Prevent importing deprecated component based on a configurable list of restricted paths.",
    },
    schema: {
      type: "array",
      minItems: 1,
      maxItems: 1,
      items: [
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
  },
  /** @type {ESLint.Rule.RuleModule['create']} */
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
