import { ISagaModule } from 'redux-dynamic-modules-saga';
import exampleSaga from './examplePageSaga';
import { exampleReducer } from './examplePageSlice';
import { ExamplePageReduxState } from './examplePageTypes';

export default (): ISagaModule<ExamplePageReduxState> => ({
  id: 'example',
  reducerMap: {
    example: exampleReducer,
  },
  sagas: [exampleSaga],
  retained: true,
});
