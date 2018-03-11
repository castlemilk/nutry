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
const makeSelectSearchType = () => createSelector(
  selectSearchDomain,
  (searchState) => searchState.get('searchType')
);
const makeSelectProfileSelected = () => createSelector(
  selectSearchDomain,
  (searchState) => searchState.get('profileSelected')
);

export {
  makeSelectSearchString,
  makeSelectSearchResults,
  makeSelectSearchLoading,
  makeSelectSearchType,
  makeSelectProfileSelected,
};
