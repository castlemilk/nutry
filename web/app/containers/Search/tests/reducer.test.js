
import { fromJS } from 'immutable';
import searchBReducer from '../reducer';

describe('searchBReducer', () => {
  it('returns the initial state', () => {
    expect(searchBReducer(undefined, {})).toEqual(fromJS({}));
  });
});
