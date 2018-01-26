
import { fromJS } from 'immutable';
import detailedCardViewReducer from '../reducer';

describe('detailedCardViewReducer', () => {
  it('returns the initial state', () => {
    expect(detailedCardViewReducer(undefined, {})).toEqual(fromJS({}));
  });
});
