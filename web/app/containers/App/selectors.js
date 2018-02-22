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
const makeSelectUsername = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('username')
);
const makeSelectSearchResults = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('searchResults')
);
const makeSelectSearchLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

export {
  makeSelectLocation,
  makeSelectLoggedIn,
  makeSelectUsername,
  makeSelectSearchResults,
  makeSelectSearchLoading,
};
