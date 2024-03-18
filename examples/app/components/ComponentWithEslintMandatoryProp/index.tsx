interface Props {
  // This prop is optional in typescript, but specified as mandatory in eslint config. ESlint will throw an error if it's not provided to this component
  eslintMandatoryProp?: string;
  otherProp: string;
}

export const ComponentWithEslintMandatoryProp = ({
  eslintMandatoryProp,
  otherProp,
}: Props) => {
  return `${eslintMandatoryProp} ${otherProp}`;
};
