import { ComponentWithEslintMandatoryProp } from "examples/app/components/ComponentWithEslintMandatoryProp";

export const Example = () => {
  return (
    <>
      <ComponentWithEslintMandatoryProp
        someMandatoryProp
        eslintMandatoryProp
        otherEslintMandatoryProp
      />
      {/* This component is missing both `eslintMandatoryProp` and `otherEslintMandatoryProp` and should show two eslint errors */}
      {/* eslint-disable-next-line plentific/enforce-optional-prop */}
      <ComponentWithEslintMandatoryProp someMandatoryProp />
      {/* This component is missing `otherEslintMandatoryProp` and should show an eslint error */}
      {/* eslint-disable-next-line plentific/enforce-optional-prop */}
      <ComponentWithEslintMandatoryProp someMandatoryProp eslintMandatoryProp />
    </>
  );
};
