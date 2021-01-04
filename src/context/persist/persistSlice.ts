import { createSlice } from '@reduxjs/toolkit';
import emptyFunction from 'common/util/emptyFunction';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PersistState {}

const initialState: PersistState = {
};

const persistSlice = createSlice({
  name: 'persist',
  initialState,
  reducers: {
    setLoginUser: emptyFunction,
  },
});

export const persistActions = persistSlice.actions;
export const persistReducer = persistSlice.reducer;
