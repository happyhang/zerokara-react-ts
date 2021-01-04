import { LoadingData } from 'common/util/loading';

export interface ExamplePageState {
  pageLoading: LoadingData,
}

export interface ExamplePageReduxState {
  example: ExamplePageState;
}
