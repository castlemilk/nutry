
import { fromJS } from 'immutable';
import { INITIAL_STATE } from '../constants';
import foodProfileReducer from '../reducer';

describe('foodProfileReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS(INITIAL_STATE);
  });
  it('returns the initial state', () => {
    const expectedResult = state;
    expect(foodProfileReducer(undefined, {})).toEqual(expectedResult);
  });
});
