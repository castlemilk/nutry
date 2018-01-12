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
    console.log('makeSelectAllElements():')
    console.log(substate.get('elements'))
    const elements = substate.get('elements')
    if (elements.size > 0 ) {
      const [...elements] = substate.get('elements').entries()
      return elements.map((value) => {
        return Object.assign({ id: value[0]}, value[1].toJS())
      })
    } else {
      return []
    }


  }
);
const makeSelectElement = (id) => createSelector(
  selectProfilerDomain,
  (substate) => substate.getIn(['elements', id])
);

export default makeSelectProfiler;
export {
  selectProfilerDomain,
  makeSelectAllElements,
  makeSelectElement,
};
