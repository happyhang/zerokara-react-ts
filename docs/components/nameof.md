# Utility: nameof

`nameof` is originally a [C# language feature](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/nameof). Thanks to [`ts-nameof`](https://github.com/dsherret/ts-nameof), the construct get ported to TypeScript with more features built in than the original C# version.

## What it Does

Basically it takes of an code identifier and convert the identifier name to a string during compilation.

```js
nameof(firstName) // Outputs 'firstName'
nameof(console.log) // Outputs 'log'
nameof(members.name.first) // Outputs 'first'
nameof(members[0].firstName) // Outputs 'firstName'

nameof.full(console.log) // Outputs 'console.log'
nameof.full(members.name.first) // Outputs 'members.name.first'
nameof.full(members.name.first, 1) // Outputs 'name.first'
nameof.full(members[0].firstName) // Outputs 'members[0].firstName'

nameof.full(members[nameof.interpolate(i)].firstName)
// ^ Outputs 'members[${i}].firstName', useful for dynamic values
```

A full feature list and API can be referred in the [repo](https://github.com/dsherret/ts-nameof).

## Why Use This

Some people may wonder why this is needed as they can just hardcode the string straight away and no functionality loss. It seems that it does nothing useful during runtime and increase compile time complexity.

Actually, this construct be very powerful when combined with type checking and Intellisense.

### Reduce Typo & Enforce Typings

The identifiers used in the `nameof` fall into compiler's type checking, therefore any typo would also be shown as errors in the IDE and compiler. This ensures the names are correctly entered.

### Intellisense

Intellisense auto complete is available when you are in the IDE, which allows developer to complete the identifier quicker.

## Example

The place this is used is most probably in the form validation, where it is used to specify the form field name.

```ts
validator
  .validateField(
    nameof.full(form.pageLoading.isLoading, 1),
    stringValidator.required(),
  );
```

## Note

Something to note on the construct:
- It is a compiler time construct rather than a runtime one. It means the code get transformed to a string at compile time. There are certain behaviour that you need to take note.
