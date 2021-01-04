/* eslint-disable import/extensions */
import * as React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { GlobalErrorPage } from 'common/ui/ErrorBoundary';
import Store, { reduxPersistor } from './common/setup/store';
import Routes from './common/setup/routes';

import './styles/global.scss';
import 'jquery/dist/jquery.slim.js';
import 'bootstrap/dist/js/bootstrap.bundle.js';

const App: React.FunctionComponent = () => (
  <Provider store={Store}>
    <GlobalErrorPage>
      <PersistGate
        persistor={reduxPersistor}
      >
        <Routes />
      </PersistGate>
    </GlobalErrorPage>
  </Provider>
);

export default App;
