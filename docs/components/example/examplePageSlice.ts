import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingData } from 'common/util/loading';
import { ExampleState } from './examplePageTypes';

const initialState: ExampleState = {
  pageLoading: 'Loading',
};

const exampleSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setInitialState() {
      return initialState;
    },
    setPageLoading(state, { payload }: PayloadAction<LoadingData>) {
      state.pageLoading = payload;
    },
  },
});

export const exampleActions = exampleSlice.actions;
export const exampleReducer = exampleSlice.reducer;
