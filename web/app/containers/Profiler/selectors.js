import { createSelector } from 'reselect';

/**
 * Direct selector to the profiler state domain
 */
const selectProfilerDomain = (state) => state.get('profiler');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Profiler
 */

const makeSelectProfiler = () => createSelector(
  selectProfilerDomain,
  (substate) => substate.toJS()
);
const makeSelectAllElements = () => createSelector(
  selectProfilerDomain,
  (substate) => {
    // const elements = substate.get('elements');
    // if (elements.size === 0) {
    //   return [];
    // }
    // console.log(elements);
    // const items = Array.from(elements.entries()).map((element) => Object.assign({ id: element[0] }, element[1]));
    // console.log(items);
    // return items;
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
  selectProfilerDomain,
  (searchState) => searchState.get('loading')
);
const makeSelectElement = (id) => createSelector(
  selectProfilerDomain,
  (substate) => substate.getIn(['elements', id])
);

export default makeSelectProfiler;
export {
  selectProfilerDomain,
  makeSelectSearchResults,
  makeSelectSearchLoading,
  makeSelectAllElements,
  makeSelectElement,
};
