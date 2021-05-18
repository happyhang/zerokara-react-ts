import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingData, initialLoadingTrueState } from 'common/util/loading';
import { ExamplePageState } from './examplePageTypes';

const initialState: ExamplePageState = {
  pageLoading: initialLoadingTrueState,
};

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    setInitialState() {
      return initialState;
    },
    init: (state) => state,
    setPageLoading(state, { payload }: PayloadAction<LoadingData>) {
      state.pageLoading = payload;
    },
  },
});

export const exampleActions = exampleSlice.actions;
export const exampleReducer = exampleSlice.reducer;
