
import { fromJS } from 'immutable';
import foodProfileReducer from '../reducer';

describe('foodProfileReducer', () => {
  it('returns the initial state', () => {
    expect(foodProfileReducer(undefined, {})).toEqual(fromJS({}));
  });
});
