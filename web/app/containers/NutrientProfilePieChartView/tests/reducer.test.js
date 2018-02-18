
import { fromJS } from 'immutable';
import nutrientProfilePieChartViewReducer from '../reducer';

describe('nutrientProfilePieChartViewReducer', () => {
  it('returns the initial state', () => {
    expect(nutrientProfilePieChartViewReducer(undefined, {})).toEqual(fromJS({}));
  });
});
