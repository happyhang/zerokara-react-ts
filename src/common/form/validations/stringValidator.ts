import { CheckResult, ValidatorParam } from './validatorTypes';

const required = (param?: ValidatorParam) => (value: string): CheckResult => {
  const { message = 'Cannot be blank' } = param || {};
  return {
    isValid: !!value,
    message,
  };
};

const minLength = (length: number, param?: ValidatorParam) => (value: string): CheckResult => {
  const { message = `Must be over ${length} characters` } = param || {};
  return {
    isValid: !value || value.length >= length,
    message,
  };
};

const length = (exactLength: number, param?: ValidatorParam) => (value: string): CheckResult => {
  const { message = `This value must be exactly ${exactLength} characters` } = param || {};
  return {
    isValid: !value || value.length === exactLength,
    message,
  };
};

const sameAs = (sameAsValue: string, param?: ValidatorParam) => (value: string): CheckResult => {
  const { message = `This value must be exactly same as '${sameAsValue}'` } = param || {};
  return {
    isValid: !value || value === sameAsValue,
    message,
  };
};

const email = (param?: ValidatorParam) => (value: string): CheckResult => {
  const { message = 'Invalid email' } = param || {};
  return {
    isValid: !value || !!value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),
    message,
  };
};

const password = (param?: ValidatorParam) => (value: string): CheckResult => {
  const { message = 'Password must be more than 6 characters' } = param || {};
  return {
    isValid: !value || value.length >= 6,
    message,
  };
};

const numeric = (param?: ValidatorParam) => (value: string): CheckResult => {
  const { message = 'Must be numeric.' } = param || {};
  return {
    isValid: !value || !Number.isNaN(Number(value)),
    message,
  };
};

const json = (param?: ValidatorParam) => (value: string): CheckResult => {
  const { message = 'Must be a valid JSON.' } = param || {};

  let isValid = true;
  if (value) {
    try {
      JSON.parse(value);
    } catch (e) {
      isValid = false;
    }
  }

  return {
    isValid,
    message,
  };
};

export default {
  required,
  email,
  length,
  minLength,
  sameAs,
  password,
  numeric,
  json,
};
