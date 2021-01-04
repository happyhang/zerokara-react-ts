import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import emptyFunction from 'common/util/emptyFunction';

export interface AppContextState {
  isInitCompleted: boolean,
  globalError: Error|string|null,
}

const initialState: AppContextState = {
  isInitCompleted: false,
  globalError: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    initApp: emptyFunction,
    setInitCompleted(state) {
      state.isInitCompleted = true;
    },
    setGlobalError(state, { payload }: PayloadAction<Error|string>) {
      state.globalError = payload;
    },
  },
});

export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;
