import { createSelector } from 'reselect';

/**
 * Direct selector to the foodProfile state domain
 */
const selectFoodProfileDomain = (state) => state.get('foodProfile');

/**
 * Other specific selectors
 */


/**
 * Default selector used by FoodProfile
 */

const makeSelectFoodProfile = () => createSelector(
  selectFoodProfileDomain,
  (substate) => substate.toJS()
);
const makeSelectSerialNumber = () => createSelector(
  selectFoodProfileDomain,
  (substate) => substate.get('serialNumber')
);
const makeSelectProfileLoading = () => createSelector(
  selectFoodProfileDomain,
  (substate) => substate.get('loading')
);
const makeSelectProfile = () => createSelector(
  selectFoodProfileDomain,
  (substate) => substate.get('profileBody')
);
const makeSelectSource = () => createSelector(
  selectFoodProfileDomain,
  (substate) => substate.get('source')
);

export default makeSelectFoodProfile;
export {
  selectFoodProfileDomain,
  makeSelectProfileLoading,
  makeSelectProfile,
  makeSelectSource,
  makeSelectSerialNumber,

};
