import { createSelector } from 'reselect';

/**
 * Direct selector to the detailedCardView state domain
 */
const selectDetailedCardViewDomain = (state) => state.get('foodProfile');

/**
 * Other specific selectors
 */


/**
 * Default selector used by DetailedCardView
 */
const makeSelectNutrientBySection = () => createSelector(
  selectDetailedCardViewDomain,
  (substate) => substate.getIn(['nutrients', 'bySection'])
);
export {
  makeSelectNutrientBySection,
};
