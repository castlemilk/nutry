import { getProfilerParsedSuccess } from 'mocks/getElasticsearchQueryMock';
import {
    addProfilerElement,
    searchComplete,
    searchLoading,
    searchFailure,
    deleteProfilerElement,
    updateProfilerElement,
    changeSearch } from '../actions';

import profilerReducer from '../reducer';

describe('Container [Profiler] - reducers', () => {
  let state;
  beforeEach(() => {
  });
  it('should return the initial state', () => {
    expect(profilerReducer(undefined, {})).toMatchSnapshot();
  });
  it('should handle the changeSearch action correctly', () => {
    expect(profilerReducer(state, changeSearch())).toMatchSnapshot();
  });
  it('should handle the searchComplete action correctly', () => {
    expect(profilerReducer(state, searchComplete(getProfilerParsedSuccess))).toMatchSnapshot();
  });
  it('should handle the addProfilerElement action correctly', () => {
    expect(profilerReducer(state, addProfilerElement()).get('nutrient')).toMatchSnapshot();
  });
  it('should handle the deleteProfilerElement action correctly', () => {
    expect(profilerReducer(state, deleteProfilerElement('uuid'))).toMatchSnapshot();
  });
  it('should handle the updateProfilerElement action correctly', () => {
    expect(profilerReducer(state, updateProfilerElement('uuid'))).toMatchSnapshot();
  });
  it('should handle the loadProfileSuccess action correctly', () => {
    expect(profilerReducer(state, searchLoading())).toMatchSnapshot();
  });
  it('should handle loadProfileFailure correctly', () => {
    const err = new Error('failed to retrieve profile');
    expect(profilerReducer(state, searchFailure(err))).toMatchSnapshot();
  });
});
