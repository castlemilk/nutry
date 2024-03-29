import { createSelector } from 'reselect';

/**
 * Direct selector to the nutrientProfileRankingChartView state domain
 */
// const selectSearchDomain = (state) => state.get('search');
const selectFoodProfileDomain = (state) => state.get('foodProfile');
const selectNutrientProfileRankingChartViewDomain = (state) => state.get('nutrientRanking');

/**
 * Other specific selectors
 */
// const makeSelectSearchResults = () => createSelector(
//   selectSearchDomain,
//   (substate) => substate ? substate.get('results', []) : []
// );

/**
 * Default selector used by NutrientProfileRankingChartView
 */

const makeSelectLoading = () => createSelector(
  selectNutrientProfileRankingChartViewDomain,
  (substate) => substate.get('loading')
);
const makeSelectRankingResults = () => createSelector(
  selectNutrientProfileRankingChartViewDomain,
  (substate) => substate.get('rankingResults')
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
  selectNutrientProfileRankingChartViewDomain,
  makeSelectLoading,
  makeSelectRankingResults,
  makeSelectNutrientSelected,
  makeSelectPortionSelected,
  // makeSelectSearchResults,
};
