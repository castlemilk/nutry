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

export default makeSelectFoodProfile;
export {
  selectFoodProfileDomain,
};
