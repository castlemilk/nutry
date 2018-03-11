import { fromJS } from 'immutable';
import { profileInfo } from 'fixtures/foodprofile';
import { getsearchParsedSuccess } from 'mocks/getElasticsearchQueryMock';
import {
  makeSelectSearchString,
  makeSelectSearchResults,
  makeSelectSearchLoading,
  makeSelectSearchType,
  makeSelectProfileSelected,
} from '../selectors';


describe('Container [Search] - selectors', () => {
  describe('selectors', () => {
    it('should select search string', () => {
      const mockedState = fromJS({
        search: {
          searchString: 'chocolate',
        },
      });
      expect(makeSelectSearchString()(mockedState)).toEqual('chocolate');
    });
    it('should select empty list when no search results are available', () => {
      const mockedState = fromJS({
        search: {
          results: [],
        },
      });
      expect(makeSelectSearchResults()(mockedState))
        .toEqual(mockedState.getIn(['search', 'results']));
    });
    it('should select the search results', () => {
      const mockedState = fromJS({
        search: {
          results: getsearchParsedSuccess,
        },
      });
      expect(makeSelectSearchResults()(mockedState))
        .toEqual(mockedState.getIn(['search', 'results']));
    });
    it('should select a search loading state', () => {
      const mockedState = fromJS({
        search: {
          loading: true,
        },
      });
      expect(makeSelectSearchLoading()(mockedState))
        .toEqual(true);
    });
    it('should select the search type', () => {
      const mockedState = fromJS({
        search: {
          searchType: 'all',
        },
      });
      expect(makeSelectSearchType()(mockedState))
        .toEqual(mockedState.getIn(['search', 'searchType']));
    });
    it('should select the profileinfo', () => {
      const mockedState = fromJS({
        search: {
          profileSelected: profileInfo,
        },
      });
      expect(makeSelectProfileSelected()(mockedState))
        .toEqual(mockedState.getIn(['search', 'profileSelected']));
    });
  });
});
