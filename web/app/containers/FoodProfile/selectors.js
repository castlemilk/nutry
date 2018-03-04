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
const makeSelectProfileHeader = () => createSelector(
  selectFoodProfileDomain,
  (substate) => substate.get('profileHeader')
);
const makeSelectSerialNumber = () => createSelector(
  selectFoodProfileDomain,
  (substate) => substate.get('serialNumber')
);
const makeSelectProfileLoading = () => createSelector(
  selectFoodProfileDomain,
  (substate) => substate.get('loading')
);
// const makeSelectProfile = () => createSelector(
//   selectFoodProfileDomain,
//   (substate) => substate.get('profileBody')
// );
const makeSelectAllNutrients = () => createSelector(
  selectFoodProfileDomain,
  (substate) => substate.getIn(['nutrients', 'byId'])
);
const makeSelectNutrientsBySummaryIds = () => createSelector(
  selectFoodProfileDomain,
  (substate) => substate.getIn(['nutrients', 'bySummaryIds'])
);
const makeSelectNutrientsBySections = () => createSelector(
  selectFoodProfileDomain,
  (substate) => substate.getIn(['nutrients', 'bySections'])
);
const makeSelectNutrient = (prefix) => createSelector(
  selectFoodProfileDomain,
  (substate) => substate.getIn(['nutrients', 'byId', prefix])
);
const makeSelectSource = () => createSelector(
  selectFoodProfileDomain,
  (substate) => substate.get('source')
);
const makeSelectTabSelected = () => createSelector(
  selectFoodProfileDomain,
  (substate) => substate.get('tabSelected')
);
const makeSelectPortions = () => createSelector(
  selectFoodProfileDomain,
  (substate) => substate.get('portionsAvailable').toJS()
);
const makeSelectPortion = () => createSelector(
  selectFoodProfileDomain,
  (substate) => substate.get('portionSelected')
);
const makeSelectNutrientSelected = () => createSelector(
  selectFoodProfileDomain,
  (substate) => substate.get('nutrientSelected')
);
const makeSelectAgeGroup = () => createSelector(
  selectFoodProfileDomain,
  (substate) => substate.get('ageGroupSelected').toJS()
);
export {
  selectFoodProfileDomain,
  makeSelectProfileHeader,
  makeSelectProfileLoading,
  makeSelectTabSelected,
  makeSelectAllNutrients,
  makeSelectNutrientsBySummaryIds,
  makeSelectNutrientsBySections,
  makeSelectNutrient,
  makeSelectNutrientSelected,
  makeSelectPortion,
  makeSelectPortions,
  makeSelectAgeGroup,
  makeSelectSource,
  makeSelectSerialNumber,
};
