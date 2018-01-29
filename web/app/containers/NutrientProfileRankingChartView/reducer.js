/*
 *
 * NutrientProfileRankingChartView reducer
 *
 */

import { fromJS, Map } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_NUTRIENT_RANKING,
  GET_NUTRIENT_RANKING_SUCCESS,
  GET_NUTRIENT_RANKING_FAILURE,
} from './constants';

const initialState = fromJS({
  loading: true,
  rankingResults: Map({}),
});

function nutrientProfileRankingChartViewReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_NUTRIENT_RANKING:
      return state.set('loading', true);
    case GET_NUTRIENT_RANKING_SUCCESS:
      return state
        .set('loading', false)
        .set('rankingResults', action.rankingResults);
    case GET_NUTRIENT_RANKING_FAILURE:
      return state.set('loading', true);
    default:
      return state;
  }
}

export default nutrientProfileRankingChartViewReducer;
