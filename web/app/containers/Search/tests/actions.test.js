import { getSearchParsedSuccess } from 'mocks/getElasticsearchQueryMock';
import { profileInfo } from 'fixtures/foodprofile';

import {
  SEARCH_TYPE_CHANGED,
  REFRESH_SEARCH,
  CHANGE_SEARCH,
  SEARCH_COMPLETE,
  SEARCH_FAILURE,
  SEARCH_LOADING,
  PROFILE_SELECTED,
} from '../constants';

import {
  changeSearchString,
  searchComplete,
  searchLoading,
  searchFailure,
  changeSearchType,
  profileSelected,
  searchRefresh } from '../actions';

describe('Container [Search] - actions', () => {
  describe('changeSearchString', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: CHANGE_SEARCH,
        searchString: 'blabla',
      };

      expect(changeSearchString('blabla')).toEqual(expectedResult);
    });
  });
  describe('searchRefresh', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: REFRESH_SEARCH,
      };

      expect(searchRefresh()).toEqual(expectedResult);
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
    it('should return the correct type when full', () => {
      const expectedResult = {
        type: SEARCH_COMPLETE,
        results: getSearchParsedSuccess,
      };

      expect(searchComplete(getSearchParsedSuccess)).toEqual(expectedResult);
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
  describe('changeSearchType', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: SEARCH_TYPE_CHANGED,
        searchType: 'all',
      };

      expect(changeSearchType('all')).toEqual(expectedResult);
    });
  });
  describe('profileSelected', () => {
    it('should return the correct type when empty', () => {
      const expectedResult = {
        type: PROFILE_SELECTED,
        profileInfo,
      };

      expect(profileSelected(profileInfo)).toEqual(expectedResult);
    });
  });
});
