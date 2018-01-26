
import { fromJS } from 'immutable';
import nutrientRowViewReducer from '../reducer';

describe('nutrientRowViewReducer', () => {
  it('returns the initial state', () => {
    expect(nutrientRowViewReducer(undefined, {})).toEqual(fromJS({}));
  });
});
