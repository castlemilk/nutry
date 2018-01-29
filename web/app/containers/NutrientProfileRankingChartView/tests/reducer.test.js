
import { fromJS } from 'immutable';
import nutrientProfileRankingChartViewReducer from '../reducer';

describe('nutrientProfileRankingChartViewReducer', () => {
  it('returns the initial state', () => {
    expect(nutrientProfileRankingChartViewReducer(undefined, {})).toEqual(fromJS({}));
  });
});
