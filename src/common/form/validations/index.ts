import { FormikErrors } from 'formik';

export { default as FormValidator } from './formValidator';
export type { Validate } from './formValidator';

export { default as stringValidator } from './stringValidator';
export { default as numberValidator } from './numberValidator';
export { default as utilValidator } from './utilValidator';

/**
 * Loop thru the formik errors and extract all error messages found (including nested ones).
 * Useful if there is no complex nested arrays to validate with.
 * @param errors Formik validation errors.
 */
export const extractErrorMessages = <T>(errors: FormikErrors<T>): string[] => {
  const result: string[] = [];

  // As we can't deduce the type of the object.
  // eslint-disable-next-line @typescript-eslint/ban-types
  const recursive = (obj: object) => Object.values(obj).forEach((error) => {
    if (typeof error === 'string') {
      result.push(error);
    } if (typeof error === 'object' && !!error) {
      recursive(error);
    }
  });
  recursive(errors);

  return result;
};
