// import { fromJS, List } from 'immutable';

import appReducer from '../reducer';

import {
  login,
  loginSuccess,
  loginFailure,
  searchComplete } from '../actions';

describe('Container [App] - reducers', () => {
  let state;
  beforeEach(() => {
  });
  it('should return the initial state', () => {
    expect(appReducer(undefined, {})).toMatchSnapshot();
  });
  it('should handle the loginSuccess action correctly', () => {
    expect(appReducer(state, login())).toMatchSnapshot();
  });
  it('should handle the loginSuccess action correctly', () => {
    const token = 'd95f8aed95f8aed95f8aed95f8aed95f8ae';

    expect(appReducer(state, loginSuccess(token))).toMatchSnapshot();
  });
  it('should handle the loginFailure action correctly', () => {
    const err = 'error message';
    expect(appReducer(state, loginFailure(err))).toMatchSnapshot();
  });
  it('should handle the loginFailure action correctly', () => {
    const searchResults = [];
    expect(appReducer(state, searchComplete(searchResults))).toMatchSnapshot();
  });
});
