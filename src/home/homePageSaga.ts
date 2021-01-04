import { Action } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';
import { call } from 'typed-redux-saga';
import {
  homeActions,
} from './homePageSlice';

function* onInit(action: Action): Generator {
  if (!homeActions.init.match(action)) { return; }

  // eslint-disable-next-line no-console
  const logFunction = (text: string) => console.log(text);
  yield call(logFunction, 'INIT Saga');
}

export default function* mainSaga(): Generator {
  yield takeLatest(homeActions.init.type, onInit);
}
