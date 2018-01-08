
import { fromJS } from 'immutable';
import landingPageReducer from '../reducer';

describe('landingPageReducer', () => {
  it('returns the initial state', () => {
    expect(landingPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
