import { Validate, stringValidator } from 'common/form/validations';
import { ExamplePageState } from './examplePageTypes';

const validateForm: Validate<ExamplePageState> = ({ validator, form }) => {
  validator
    .validateField(
      nameof.full(form.pageLoading.isLoading, 1),
      stringValidator.required(),
    );

  return validator;
};

export default validateForm;
