
import { fromJS } from 'immutable';
import profilerReducer from '../reducer';

describe('profilerReducer', () => {
  it('returns the initial state', () => {
    expect(profilerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
