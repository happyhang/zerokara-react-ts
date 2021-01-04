import { ISagaModule } from 'redux-dynamic-modules-saga';
import homeSaga from './homePageSaga';
import { homeReducer } from './homePageSlice';
import { HomePageReduxState } from './homePageTypes';

export default (): ISagaModule<HomePageReduxState> => ({
  id: 'home',
  reducerMap: {
    home: homeReducer,
  },
  sagas: [homeSaga],
  retained: true,
});
