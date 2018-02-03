import { createSelector } from 'reselect';

const selectRoute = (state) => state.get('route');
const selectGlobal = (state) => state.get('global');

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);
const makeSelectLoggedIn = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loggedIn')
);
const makeSelectSearchResults = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('searchResults')
);

export {
  makeSelectLocation,
  makeSelectLoggedIn,
  makeSelectSearchResults,
};
