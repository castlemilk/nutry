
import { fromJS } from 'immutable';
import wikiViewReducer from '../reducer';

describe('wikiViewReducer', () => {
  it('returns the initial state', () => {
    expect(wikiViewReducer(undefined, {})).toEqual(fromJS({}));
  });
});
