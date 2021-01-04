import {
  take, put, call,
} from 'typed-redux-saga';
import { appActions } from './appSlice';

/**
 * This method would be called whenever persist has done.
 * Do all initialisation stuffs before start rendering stuffs to user.
 */
function* onInitApp(): Generator {
  yield put(appActions.setInitCompleted());
}

export default function* mainSaga(): Generator {
  yield take(appActions.initApp.type);
  yield call(onInitApp);
}
