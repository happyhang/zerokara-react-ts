import * as React from 'react';
import {
  Router, Route, Switch,
} from 'react-router-dom';
import NotFoundPage from 'common/ui/NotFoundPage';

import history from './history';
import HomePage from '../../home';

const Routes: React.FunctionComponent = () => (
  <Router history={history}>
    <Switch>
      <Route>
        <Switch>
          <Route exact path="/" component={HomePage} />

          {/* Not Found Page: DO NOT put anything below this */}
          <Route component={NotFoundPage} />
        </Switch>
      </Route>
    </Switch>
  </Router>
);

export default Routes;
