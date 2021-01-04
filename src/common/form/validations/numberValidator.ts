import { CheckResult, ValidatorParam } from './validatorTypes';

const gt = (
  compareValue: string|number,
  param?: ValidatorParam,
) => (value: string|number): CheckResult => {
  const { message = `Must be greater than ${compareValue}` } = param || {};

  const valueNumber = Number(value);
  const compareValueNumber = Number(compareValue);

  return {
    isValid: !value || valueNumber > compareValueNumber,
    message,
  };
};

const lt = (
  compareValue: string|number,
  param?: ValidatorParam,
) => (value: string|number): CheckResult => {
  const { message = `Must be less than ${compareValue}` } = param || {};

  const valueNumber = Number(value);
  const compareValueNumber = Number(compareValue);

  return {
    isValid: !value || valueNumber < compareValueNumber,
    message,
  };
};

export default {
  gt,
  lt,
};
