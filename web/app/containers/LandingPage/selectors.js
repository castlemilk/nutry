import { createSelector } from 'reselect';

/**
 * Direct selector to the landingPage state domain
 */
const selectLandingPageDomain = (state) => state.get('landingPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by LandingPage
 */

const makeSelectLandingPage = () => createSelector(
  selectLandingPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectLandingPage;
export {
  selectLandingPageDomain,
};
