import { getSearchParsedSuccess } from 'mocks/getElasticsearchQueryMock';
import { profileInfo } from 'fixtures/foodprofile';
import {
  changeSearchString,
  searchComplete,
  searchLoading,
  searchFailure,
  changeSearchType,
  profileSelected,
  searchRefresh } from '../actions';

import searchReducer from '../reducer';

describe('Container [Search] - reducers', () => {
  let state;
  beforeEach(() => {
  });
  it('should return the initial state', () => {
    expect(searchReducer(undefined, {})).toMatchSnapshot();
  });
  it('should handle the changeSearchString action correctly', () => {
    expect(searchReducer(state, changeSearchString('blabla'))).toMatchSnapshot();
  });
  it('should handle the searchComplete action correctly', () => {
    expect(searchReducer(state, searchComplete(getSearchParsedSuccess))).toMatchSnapshot();
  });
  it('should handle the searchRefresh action correctly', () => {
    expect(searchReducer(state, searchRefresh())).toMatchSnapshot();
  });
  it('should handle the changeSearchType action correctly', () => {
    expect(searchReducer(state, changeSearchType('all'))).toMatchSnapshot();
  });
  it('should handle the profileSelected action correctly', () => {
    expect(searchReducer(state, profileSelected(profileInfo))).toMatchSnapshot();
  });
  it('should handle the searchLoading action correctly', () => {
    expect(searchReducer(state, searchLoading())).toMatchSnapshot();
  });
  it('should handle searchFailure correctly', () => {
    const err = new Error('failed to retrieve profile');
    expect(searchReducer(state, searchFailure(err))).toMatchSnapshot();
  });
});
