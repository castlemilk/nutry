/*
 *
 * NutrientProfileRankingChartView actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_NUTRIENT_RANKING,
  GET_NUTRIENT_RANKING_SUCCESS,
  GET_NUTRIENT_RANKING_FAILURE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadRankings() {
  return {
    type: GET_NUTRIENT_RANKING,
  };
}
export function loadRankingsSuccess(rankingResults) {
  return {
    type: GET_NUTRIENT_RANKING_SUCCESS,
    rankingResults,
  };
}
export function loadRankingsFailure(err) {
  return {
    type: GET_NUTRIENT_RANKING_FAILURE,
    err,
  };
}
