
import { fromJS } from 'immutable';
import wikiViewReducer from '../reducer';


import {
  defaultAction,
     } from '../actions';

describe('wikiViewReducer', () => {
  it('returns the initial state', () => {
    expect(wikiViewReducer(undefined, {})).toEqual(fromJS({}));
  });
  it('handles default action', () => {
    expect(wikiViewReducer(undefined, defaultAction())).toMatchSnapshot();
  });
});
