
import { rankingResults } from 'fixtures/foodprofile';

import {
  GET_NUTRIENT_RANKING,
  GET_NUTRIENT_RANKING_SUCCESS,
  GET_NUTRIENT_RANKING_FAILURE,
} from '../constants';

import {
  loadRankings,
  loadRankingsSuccess,
  loadRankingsFailure } from '../actions';

describe('Container [NutrientProfileRankingChartView] - actions', () => {
  describe('loadRankings', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: GET_NUTRIENT_RANKING,
      };

      expect(loadRankings()).toEqual(expectedResult);
    });
  });
  describe('loadRankingsSuccess', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: GET_NUTRIENT_RANKING_SUCCESS,
        rankingResults,
      };

      expect(loadRankingsSuccess(rankingResults)).toEqual(expectedResult);
    });
  });
  describe('loadRankingsFailure', () => {
    it('should return the correct type', () => {
      const err = new Error();
      const expectedResult = {
        type: GET_NUTRIENT_RANKING_FAILURE,
        err,
      };
      expect(loadRankingsFailure(err)).toEqual(expectedResult);
    });
  });
});
