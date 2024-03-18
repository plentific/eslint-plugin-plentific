import { ComponentWithEslintMandatoryProp } from "examples/app/components/ComponentWithEslintMandatoryProp";

export const Usage = () => {
  return (
    <>
      {/* This component is missing `eslintMandatoryProp` and should show an eslint error */}
      {/* eslint-disable-next-line plentific/enforce-eslint-mandatory-prop */}
      <ComponentWithEslintMandatoryProp otherProp="some value" />
      {/* This component is missing `eslintMandatoryProp` and should show an eslint error */}
      {/* eslint-disable-next-line plentific/enforce-eslint-mandatory-prop */}
      <ComponentWithEslintMandatoryProp otherProp="some value"></ComponentWithEslintMandatoryProp>
    </>
  );
};
