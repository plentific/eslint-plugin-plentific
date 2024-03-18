interface Props {
  // This prop is optional in typescript, but specified as mandatory in eslint config. ESlint will throw an error if it's not provided to this component
  eslintMandatoryProp?: boolean;
  otherEslintMandatoryProp?: boolean;
  someMandatoryProp: boolean;
}

export const ComponentWithEslintMandatoryProp = ({
  eslintMandatoryProp,
  otherEslintMandatoryProp,
  someMandatoryProp,
}: Props) => {
  return `${eslintMandatoryProp} ${otherEslintMandatoryProp} ${someMandatoryProp}`;
};
