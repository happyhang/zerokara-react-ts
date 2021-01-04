import { ValidatorParam, CheckResult } from './validatorTypes';

const customValidate = (
  param: ValidatorParam & { isValid: (value: unknown) => boolean },
) => (value: unknown): CheckResult => {
  const { message = 'Invalid value', isValid = () => false } = param || {};
  return {
    isValid: isValid(value),
    message,
  };
};

export default {
  customValidate,
};
