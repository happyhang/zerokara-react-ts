# Forms

Forms are used for screen that requires data entry to the system. We mainly uses `Formik` for form management.

## Form Component

For most forms you will be using the wrapped form component `FormikForm` from `common/form`. The components help to set up some base code so that those does not need to be defined in every screen. You can supply almost all `Formik` props to it as usual, except that the `validate` method has contract change and some additional props are added.

### Behaviour

Whenever you are defining a form using `FormikForm`, these will be the default behaviour of the form:

- Validation is done to prevent user from submitting invalid form.

- Validation only occurs on `blur` event (for performance reason).

- If there is an error Validation on submit triggered, the first input with error would be highlighted.
  - Note that the order is based on the validation order rather than the DOM position, as doing this using DOM position is a lot more complex.

- When the user submits a form, make sure that the submit button is disabled to prevent double submission.
  - If you use the standard button you can set the props `isLoading` to `true`.
  - When there is error returned by back end, has to reenable the button back so that the user has chance to retry.

If you happen to need to define own form, it is advisable to follow the above behaviours for consistency.

### Comparing to `Formik`

#### `validate` Props

The `validate` props will has the following signature:

```js
({ form: object, validator: object }) => validator: object
```

`form` - contains the form values like usual `Formik`.
`validator` - a helper to aid with doing validations (refer to `SignUpValidation` for example). Note that you have to return the same instance of `validator` back in the end of method.

## Common Components

There are a series of components in `common/form` namespace you can import to render different form types like texts, numbers, drop downs.

In most of the time, you only need to use the premade components to compose the form unless you need a new input type that is not implemented yet.

_PS: Most premade components has optimizations to prevent rerenders so they might not work on some very edge cases._

### Making a New Form Component

When you are writing a new form component for `Formik`, please make sure that:

- It refers to the `name` props as the target field to set the value to `Formik`.
- It does not rerender on form change that is not related to this component (Tip: implement `componentShouldUpdate`)
- It displays validation message when the field is touched and has validation error.

## Validation

You will be mostly using `validator` object provided in the `validate` method for most validations. It is designed to be simple and chainable.

You will use the `validateField` method in the `validator` to do validation, it has the following signature:

```ts
validateField(fieldName: string, ...validations: Validations)
```

`fieldName` - The field name to validate against.
`validations` - The validations to use against the field value. You can specify as many validations you want.

The `validations` would be using defined validation methods in `common/validation` to perform validations.

### Defining new Validation

Too add a new validation to the library, you can define a method which return a method which does the validation and return the result in the following signature:

```js
{
  isValid: boolean,
  message: string,
}
```

For example to define a validation to check if the value is larger than 0, you can write it like this:

```js
const largerThanZero = (param) => (value) => {
  const { message = 'Must be larger than 0' } = param || {};
  return {
    isValid: !value || value > 0,
    message,
  };
};
```
