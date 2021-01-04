# Saga

## Using `redux-typed-saga`

Have to use [redux-typed-saga](https://github.com/agiledigital/typed-redux-saga) in order to be able to infer correct typings on saga.

View [this issue](https://github.com/redux-saga/redux-saga/issues/2008) for more details.

The difference between using `redux-typed-saga` is not big. Just to make sure to use the followings.

### Calling Saga

```ts
import { call } from 'redux-typed-saga';

yield* call(someMethod)
```

### A Saga method accepting action

Normally used for `takeEvery` or `takeLatest`.

```ts
import { Action } from '@reduxjs/toolkit';
import { SagaGenerator } from 'typed-redux-saga';

function* functionName(action: Action): Generator {
  if (!pageActions.expectedAction.match(action)) { return; }
  // The action payload would be implicitly typed to the action payload type.
  // Do your saga logic next.
}
```

### A Saga method with Return Type

```ts
import { SagaGenerator } from 'typed-redux-saga';

function* functionName(): SagaGenerator<string> // Returns a string
```
