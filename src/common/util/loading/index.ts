import compose from 'lodash/fp/compose';
import { PayloadActionCreator, PayloadAction } from '@reduxjs/toolkit';

export interface LoadingData {
  isLoading: boolean,
  isError: boolean,
  message: string,
  data: unknown,
}

export const initialLoadingState: LoadingData = ({
  isLoading: false,
  isError: false,
  message: '',
  data: null,
});

export const initialLoadingTrueState: LoadingData = ({
  isLoading: true,
  isError: false,
  message: '',
  data: null,
});

export const loadingStart = (): LoadingData => ({
  ...initialLoadingState,
  isLoading: true,
});

export const loadingFail = (message?: string, data?: unknown): LoadingData => ({
  ...initialLoadingState,
  isError: true,
  message: message || '',
  data,
});

export const loadingSuccess = (message?: string, data?: unknown): LoadingData => ({
  ...initialLoadingState,
  message: message || '',
  data,
});

export const bindLoadingActions = (actionCreator: PayloadActionCreator<LoadingData>)
  : Array<(message?: string, data?: unknown) => PayloadAction<LoadingData>> => [
  () => compose(actionCreator, loadingStart)(),
  (message?: string, data?: unknown) => compose(actionCreator, loadingFail)(message, data),
  (message?: string, data?: unknown) => compose(actionCreator, loadingSuccess)(message, data),
];
