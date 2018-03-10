import { createSelector } from 'reselect';

/**
 * Direct selector to the profiler state domain
 */
const selectProfilerDomain = (state) => state.get('profiler');
const selectSearchDomain = (state) => state.get('search');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Profiler
 */
const makeSelectAllElements = () => createSelector(
  selectProfilerDomain,
  (substate) => {
    const elements = substate.get('elements');
    if (elements.size > 0) {
      const [...entries] = substate.get('elements').entries();
      return entries.map((value) => Object.assign({ id: value[0] }, value[1].toJS()));
    }
    return [];
  }
);
const makeSelectSearchResults = () => createSelector(
  selectProfilerDomain,
  (searchState) => searchState.get('results')
);
const makeSelectSearchLoading = () => createSelector(
  selectSearchDomain,
  (substate) => substate.get('loading')
);
const makeSelectElement = (id) => createSelector(
  selectProfilerDomain,
  (substate) => substate.getIn(['elements', id])
);
export {
  makeSelectSearchResults,
  makeSelectSearchLoading,
  makeSelectAllElements,
  makeSelectElement,
};
