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

export default makeSelectProfiler;
export {
  selectProfilerDomain,
};
