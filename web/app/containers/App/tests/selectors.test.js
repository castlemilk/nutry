import { fromJS, List } from 'immutable';

import { rankingResultsProfiles } from 'fixtures/foodprofile';

import {
  makeSelectLocation,
  makeSelectLoggedIn,
  makeSelectSearchResults,
  makeSelectSearchLoading,
} from '../selectors';

describe('Container [App] - selectors', () => {
  describe('makeSelectLocation', () => {
    it('should select the location', () => {
      const route = fromJS({
        location: { pathname: '/foo' },
      });
      const mockedState = fromJS({
        route,
      });
      expect(makeSelectLocation()(mockedState)).toEqual(route.get('location').toJS());
    });
  });
  describe('makeSelectLoggedIn', () => {
    it('makeSelectLoggedIn', () => {
      const globalState = fromJS({
        loggedIn: false,
        searchResults: List([]),
        loading: true,
      });
      const mockedState = fromJS({
        global: globalState,
      });
      expect(makeSelectLoggedIn()(mockedState)).toEqual(globalState.get('loggedIn'));
    });
  });
  describe('makeSelectSearchResults', () => {
    it('fetches search results from global state', () => {
      const globalState = fromJS({
        loggedIn: false,
        searchResults: rankingResultsProfiles.items,
        loading: true,
      });
      const mockedState = fromJS({
        global: globalState,
      });
      expect(makeSelectSearchResults()(mockedState)).toEqual(globalState.get('searchResults'));
    });
  });
  describe('makeSelectSearchLoading', () => {
    it('makeSelectSearchLoading', () => {
      const globalState = fromJS({
        loggedIn: false,
        searchResults: List([]),
        loading: true,
      });
      const mockedState = fromJS({
        global: globalState,
      });
      expect(makeSelectSearchLoading()(mockedState)).toEqual(globalState.get('loading'));
    });
  });
});
