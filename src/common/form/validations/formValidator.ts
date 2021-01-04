import { getIn, setIn, FormikErrors } from 'formik';
import { CheckResult } from './validatorTypes';

export type Validate<T> = (params: {
  form: T,
  validator: FormValidator<T>
}) => FormValidator<T>;

class FormValidator<T> {
  private form: unknown;

  private errors: FormikErrors<T>;

  isFormValidator: boolean;

  private firstError: string|null;

  constructor(form: unknown) {
    this.form = form;
    this.errors = {};
    this.isFormValidator = true;
    this.firstError = null;
  }

  validateField(
    field: string,
    // Dynamic value
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...conditions: Array<(value: any) => CheckResult>
  ): FormValidator<T> {
    const value = getIn(this.form, field);
    conditions.forEach((cond) => {
      const checkResult = cond(value);
      if (!checkResult.isValid) {
        this.errors = setIn(this.errors, field, checkResult.message);

        // Set first error if the field is not set yet.
        if (!this.firstError) {
          this.firstError = field;
        }

        // Do not continue check if the current one is already failed.
        return false;
      }

      return true;
    });
    return this;
  }

  toResult(): FormikErrors<T>|undefined {
    if (Object.keys(this.errors).length === 0) {
      return undefined;
    }

    return this.errors;
  }

  getFirstErrorField(): string|null {
    return this.firstError;
  }
}

export default FormValidator;
