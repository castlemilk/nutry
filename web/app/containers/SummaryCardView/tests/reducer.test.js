
import { fromJS } from 'immutable';
import summaryCardViewReducer from '../reducer';

describe('summaryCardViewReducer', () => {
  it('returns the initial state', () => {
    expect(summaryCardViewReducer(undefined, {})).toEqual(fromJS({}));
  });
});
