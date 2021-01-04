import * as React from 'react';
import {
  Formik, FormikConfig, FormikBag, FormikValues, FormikProps, FormikErrors, FormikState,
} from 'formik';
import FormValidator, { Validate } from './validations/formValidator';

export interface FormikFormProps<T> extends Omit<FormikConfig<T>, 'validate'> {
  validate?: Validate<T>,
  formikRef?: React.Ref<FormikBag<unknown, T>>,
  children: (
    formikBag: FormikProps<T> & { lastSubmitErrors: FormikErrors<T>|undefined }
    ) => React.ReactNode,
}

// A Formik wrapper that is used to enforce certain
// application form behaviour to ensure consistency.
// Only on edge cases you would need to use the normal
// formik rather than this component.
const FormikForm = <T extends FormikValues>({
  validate,
  formikRef,
  children,
  ...rest
}: FormikFormProps<T>): React.ReactElement<FormikFormProps<T>> => {
  const lastValidationRef = React.useRef<FormValidator<T>|null>(null);
  const lastSubmittedValidationResultRef = React
    .useRef<FormikErrors<T>|undefined>(undefined);
  const isSubmitting = React.useRef(false);

  const onValidate = React.useCallback((form) => {
    if (!validate) {
      return {};
    }

    const validator = new FormValidator<T>(form);
    validate({
      form,
      validator,
    });

    const result = validator.toResult();

    // Set the last validation result for future use.
    lastValidationRef.current = validator;

    if (isSubmitting.current === true) {
      lastSubmittedValidationResultRef.current = result;
      isSubmitting.current = false;
    }

    return result;
  }, [validate]);

  return (
    <Formik
      // Framework code.
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      innerRef={formikRef as ((instance: unknown) => void)}
      validate={onValidate}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {(formikBag) => {
        const newFormikBag = {
          ...formikBag,
          handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => {
            isSubmitting.current = true;
            formikBag.handleSubmit(e);
          },
          resetForm: (nextState?: Partial<FormikState<T>>) => {
            lastSubmittedValidationResultRef.current = undefined;
            formikBag.resetForm(nextState);
          },
          lastSubmitErrors: lastSubmittedValidationResultRef.current,
        };
        return children(newFormikBag);
      }}
    </Formik>
  );
};

export default FormikForm;
