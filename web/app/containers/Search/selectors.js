import { createSelector } from 'reselect';

/**
 * Direct selector to the searchB state domain
 */
const selectSearchDomain = (state) => state.get('search');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SearchB
 */

const makeSelectSearch = () => createSelector(
  selectSearchDomain,
  (substate) => substate.toJS()
);
const makeSelectSearchString = () => createSelector(
  selectSearchDomain,
  (searchState) => searchState.get('searchString')
);
const makeSelectSearchResults = () => createSelector(
  selectSearchDomain,
  (searchState) => searchState.get('results')
);
const makeSelectSearchLoading = () => createSelector(
  selectSearchDomain,
  (searchState) => searchState.get('loading')
);

export default makeSelectSearch;
export {
  selectSearchDomain,
  makeSelectSearchString,
  makeSelectSearchResults,
  makeSelectSearchLoading,
  makeSelectSearch,
};
