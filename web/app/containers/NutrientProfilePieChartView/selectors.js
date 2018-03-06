import { createSelector } from 'reselect';

const selectFoodProfileDomain = (state) => state.get('foodProfile');


const makeSelectLoading = () => createSelector(
  selectFoodProfileDomain,
  (substate) => substate.get('loading')
);
const makeSelectSummaryNutrients = () => createSelector(
  selectFoodProfileDomain,
  (substate) => substate.getIn(['nutrients', 'bySummaryPie']).toJS()
);
const makeSelectDetailedNutrients = () => createSelector(
  selectFoodProfileDomain,
  (substate) => substate.getIn(['nutrients', 'byDetailedPie']).toJS()
);
const makeSelectNutrients = () => createSelector(
  selectFoodProfileDomain,
  (substate) => substate.get('tabSelected') === 'summary' ?
    substate.getIn(['nutrients', 'bySummaryPie']).toJS() :
    substate.getIn(['nutrients', 'byDetailedPie']).toJS()
);
const makeSelectNutrientSelected = () => createSelector(
  selectFoodProfileDomain,
  (substate) => substate.get('nutrientSelected')
);
const makeSelectPortionSelected = () => createSelector(
  selectFoodProfileDomain,
  (substate) => substate.get('portionSelected')
);
export {
  makeSelectLoading,
  makeSelectNutrients,
  makeSelectSummaryNutrients,
  makeSelectDetailedNutrients,
  makeSelectNutrientSelected,
  makeSelectPortionSelected,
};
