/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { compose } from 'redux';
import Search from 'containers/Search/Loadable';
import FoodProfile from 'containers/FoodProfile/Loadable';
import LandingPage from 'containers/LandingPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import reducer from './reducer';
import saga from './sagas';

export class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Search} />
          <Route path="/foodprofile/:profileId" component={FoodProfile} />
          <Route exact path="/overview" component={LandingPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}
const withReducer = injectReducer({ key: 'global', reducer });
const withSaga = injectSaga({ key: 'global', saga });

export default compose(
  withReducer,
  withSaga,
)(App);
