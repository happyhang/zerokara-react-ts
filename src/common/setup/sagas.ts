import { all, fork } from 'redux-saga/effects';
import appSaga from 'context/app/appSaga';

export default function* root(): Generator {
  yield all([
    fork(appSaga),
  ]);
}
