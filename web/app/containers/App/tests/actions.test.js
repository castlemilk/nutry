import {
  SEARCH_COMPLETE,
} from 'containers/Search/constants';
import {
  LOGIN_CLICKED,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../constants';


import {
  login,
  loginSuccess,
  loginFailure,
  searchComplete } from '../actions';

describe('Container [App] - actions', () => {
  describe('login', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOGIN_CLICKED,
      };

      expect(login()).toEqual(expectedResult);
    });
  });

  describe('loginSuccess', () => {
    it('should return the correct type and the passed login information', () => {
      const token = 'd95f8aed95f8aed95f8aed95f8aed95f8ae';
      const expectedResult = {
        type: LOGIN_SUCCESS,
        token,
      };
      expect(loginSuccess(token)).toEqual(expectedResult);
    });
  });
  describe('loginFailure', () => {
    it('should return the correct type and the passed login information', () => {
      const err = 'error';
      const expectedResult = {
        type: LOGIN_FAILURE,
        err,
      };
      expect(loginFailure(err)).toEqual(expectedResult);
    });
  });
  describe('searchComplete', () => {
    it('should return the correct type and the passed login information', () => {
      const searchResults = [];
      const expectedResult = {
        type: SEARCH_COMPLETE,
        searchResults,
      };
      expect(searchComplete(searchResults)).toEqual(expectedResult);
    });
  });
});
