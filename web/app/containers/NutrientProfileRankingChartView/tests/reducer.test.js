
import {
  rankingResults } from 'fixtures/foodprofile';
import {
    loadRankings,
    loadRankingsSuccess,
    loadRankingsFailure } from '../actions';

import nutrientProfileRankingChartViewReducer from '../reducer';

describe('Container [FoodProfile] - reducers', () => {
  let state;
  beforeEach(() => {
  });
  it('should return the initial state', () => {
    expect(nutrientProfileRankingChartViewReducer(undefined, {})).toMatchSnapshot();
  });
  it('should handle the loadRankings action correctly', () => {
    expect(nutrientProfileRankingChartViewReducer(state, loadRankings())).toMatchSnapshot();
  });
  it('should handle the loadRankingsSuccess action correctly', () => {
    expect(nutrientProfileRankingChartViewReducer(state, loadRankingsSuccess(rankingResults))).toMatchSnapshot();
  });
  it('should handle the loadRankingsFailure action correctly on empty', () => {
    const err = new Error('failed to retrieve profile');
    expect(nutrientProfileRankingChartViewReducer(state, loadRankingsFailure(err))).toMatchSnapshot();
  });
});
