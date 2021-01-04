import {
  put, takeLatest,
} from 'redux-saga/effects';
import { bindLoadingActions } from 'common/util/loading';
import {
  INIT, setInitialState, setPageLoading,
} from './examplePageActions';

function* onInit(): Generator {
  yield put(setInitialState());

  const [, loadingFail, loadingSuccess] = bindLoadingActions(setPageLoading);
  try {
    // TODO Load some data.
    yield put(loadingSuccess());
  } catch (e) {
    yield put(loadingFail(e.message));
  }
}

export default function* mainSaga(): Generator {
  yield takeLatest(INIT, onInit);
}
