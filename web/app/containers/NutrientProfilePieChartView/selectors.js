import { createSelector } from 'reselect';

/**
 * Direct selector to the nutrientProfileRankingChartView state domain
 */
const selectSearchDomain = (state) => state.get('search');
const selectFoodProfileDomain = (state) => state.get('foodProfile');
const selectNutrientProfilePieChartViewDomain = (state) => state.get('nutrientPie');

/**
 * Other specific selectors
 */
const makeSelectSearchResults = () => createSelector(
  selectSearchDomain,
  (substate) => substate ? substate.get('results', []) : []
);

/**
 * Default selector used by NutrientProfileRankingChartView
 */

const makeSelectNutrientProfileRankingChartView = () => createSelector(
  selectNutrientProfilePieChartViewDomain,
  (substate) => substate.toJS()
);
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

export default makeSelectNutrientProfileRankingChartView;
export {
  makeSelectLoading,
  makeSelectNutrients,
  makeSelectSummaryNutrients,
  makeSelectDetailedNutrients,
  makeSelectNutrientSelected,
  makeSelectPortionSelected,
  makeSelectSearchResults,
};
