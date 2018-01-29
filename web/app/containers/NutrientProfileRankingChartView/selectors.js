import { createSelector } from 'reselect';

/**
 * Direct selector to the nutrientProfileRankingChartView state domain
 */
const selectSearchDomain = (state) => state.get('search');
const selectNutrientProfileRankingChartViewDomain = (state) => state.get('nutrientRanking');

/**
 * Other specific selectors
 */
const makeSelectSearchResults = () => createSelector(
  selectSearchDomain,
  (substate) => substate.get('results')
);

/**
 * Default selector used by NutrientProfileRankingChartView
 */

const makeSelectNutrientProfileRankingChartView = () => createSelector(
  selectNutrientProfileRankingChartViewDomain,
  (substate) => substate.toJS()
);
const makeSelectLoading = () => createSelector(
  selectNutrientProfileRankingChartViewDomain,
  (substate) => substate.get('loading')
);
const makeSelectRankingResults = () => createSelector(
  selectNutrientProfileRankingChartViewDomain,
  (substate) => substate.get('rankingResults')
);

export default makeSelectNutrientProfileRankingChartView;
export {
  selectNutrientProfileRankingChartViewDomain,
  makeSelectLoading,
  makeSelectRankingResults,
  makeSelectSearchResults,
};
