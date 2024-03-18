interface Props {
  // These two props are optional in typescript, but specified as mandatory in eslint config. ESlint will throw an error if at least one of those is not provided to this component
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
