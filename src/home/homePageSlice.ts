import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import emptyFunction from 'common/util/emptyFunction';
import { HomePageState } from './homePageTypes';

const initialState: HomePageState = {
  time: 'Loading',
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    init: emptyFunction,
    setInitialState() {
      return initialState;
    },
    setTime(state, { payload }: PayloadAction<string>) {
      state.time = payload;
    },
  },
});

export const homeActions = homeSlice.actions;
export const homeReducer = homeSlice.reducer;
