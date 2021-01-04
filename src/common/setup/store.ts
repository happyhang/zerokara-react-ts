import { createStore, IExtension } from 'redux-dynamic-modules';
import { getSagaExtension } from 'redux-dynamic-modules-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { appActions } from 'context/app/appSlice';
import reducers from './reducers';
import sagas from './sagas';

const reduxModuleExtensions: IExtension[] = [];

const reduxPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['persist'],
};

// Add saga middleware.
reduxModuleExtensions.push(getSagaExtension(null,
  // The native saga error log does not have our source-mapped stack trace.
  // Trying to log the stack trace with source map helps alot on debugging.
  (error) => {
    // eslint-disable-next-line no-console
    console.error('An unhandled exception has occured in saga. Exception details:', error);
    // eslint-disable-next-line no-use-before-define
    store.dispatch(appActions.setGlobalError(error));
  }));

const getMainModule = () => ({
  id: 'main',
  reducerMap: {
    // Due to limitation of integration between redux-persist and redux-dynamic-modules,
    // The persist reducers have to be thrown into a child object.
    // The name `context` is chosen currently because most reducers are related to context.
    // Consider declaring and putting another reducer declaration if another name is needed.
    // https://github.com/microsoft/redux-dynamic-modules/issues/94
    context: persistReducer(reduxPersistConfig, reducers),
  },
  sagas: [sagas],
});

const store = createStore({
  extensions: reduxModuleExtensions,
}, getMainModule());

export const reduxPersistor = persistStore(store, null, () => store.dispatch(appActions.initApp()));

export default store;
