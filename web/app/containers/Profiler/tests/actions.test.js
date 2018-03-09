import { getProfilerParsedSuccess } from 'mocks/getElasticsearchQueryMock';

import {
  CHANGE_PROFILER_SEARCH,
  SEARCH_COMPLETE,
  SEARCH_LOADING,
  SEARCH_FAILURE,
  ADD_PROFILER_ELEMENT,
  DELETE_PROFILER_ELEMENT,
  UPDATE_PROFILER_ELEMENT,
} from '../constants';

import {
  addProfilerElement,
  searchComplete,
  searchLoading,
  searchFailure,
  deleteProfilerElement,
  updateProfilerElement,
  changeSearch } from '../actions';

describe('Container [Profiler] - actions', () => {
  describe('changeSearch', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: CHANGE_PROFILER_SEARCH,
      };

      expect(changeSearch()).toEqual(expectedResult);
    });
  });
  describe('searchComplete', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: SEARCH_COMPLETE,
        results: getProfilerParsedSuccess,
      };

      expect(searchComplete(getProfilerParsedSuccess)).toEqual(expectedResult);
    });
  });
  describe('searchComplete', () => {
    it('should return the correct type when empty', () => {
      const expectedResult = {
        type: SEARCH_COMPLETE,
        results: [],
      };

      expect(searchComplete(null)).toEqual(expectedResult);
    });
  });
  describe('searchLoading', () => {
    it('should return the correct type when empty', () => {
      const expectedResult = {
        type: SEARCH_LOADING,
      };

      expect(searchLoading()).toEqual(expectedResult);
    });
  });
  describe('searchFailure', () => {
    it('should return the correct type when empty', () => {
      const error = new Error();
      const expectedResult = {
        type: SEARCH_FAILURE,
        error,
      };

      expect(searchFailure(error)).toEqual(expectedResult);
    });
  });
  describe('addProfilerElement', () => {
    it('should return the correct type when empty', () => {
      const expectedResult = {
        type: ADD_PROFILER_ELEMENT,
      };

      expect(addProfilerElement()).toEqual(expectedResult);
    });
  });
  describe('deleteProfilerElement', () => {
    it('should return the correct type when empty', () => {
      const id = 'uuid';
      const expectedResult = {
        type: DELETE_PROFILER_ELEMENT,
        id,
      };

      expect(deleteProfilerElement('uuid')).toEqual(expectedResult);
    });
  });
  describe('updateProfilerElement', () => {
    it('should return the correct type when empty', () => {
      const id = 'uuid';
      const key = 'scale';
      const value = 50;
      const expectedResult = {
        type: UPDATE_PROFILER_ELEMENT,
        id,
        key,
        value,
      };

      expect(updateProfilerElement(id, key, value)).toEqual(expectedResult);
    });
  });
});
