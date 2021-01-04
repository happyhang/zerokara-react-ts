import { combineReducers } from 'redux';
import { persistReducer } from 'context/persist/persistSlice';
import { appReducer } from 'context/app/appSlice';

export default combineReducers({
  persist: persistReducer,
  app: appReducer,
});
