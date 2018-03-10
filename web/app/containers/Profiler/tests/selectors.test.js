import { fromJS } from 'immutable';
import { elements } from 'fixtures/profiler';
import { getProfilerParsedSuccess } from 'mocks/getElasticsearchQueryMock';
import {
  makeSelectSearchResults,
  makeSelectSearchLoading,
  makeSelectAllElements,
  makeSelectElement,
} from '../selectors';


describe('Container [Profiler] - selectors', () => {
  describe('makeSelectAllElements', () => {
    it('should select available elements', () => {
      const mockedState = fromJS({
        profiler: {
          elements,
        },
      });
      expect(makeSelectAllElements()(mockedState)).toEqual([
        { id: 'uuid1',
          nutrient: { className: 'elements-water', label: 'Water', value: 'WATER' },
          scale: 50 },
      ]);
    });
    it('should select empty list when no elements available', () => {
      const mockedState = fromJS({
        profiler: {
          elements: [],
        },
      });
      expect(makeSelectAllElements()(mockedState)).toEqual([]);
    });
    it('should select the search results', () => {
      const mockedState = fromJS({
        profiler: {
          results: getProfilerParsedSuccess,
        },
      });
      expect(makeSelectSearchResults()(mockedState))
        .toEqual(mockedState.getIn(['profiler', 'results']));
    });
    it('should select a specific element', () => {
      const mockedState = fromJS({
        profiler: {
          loading: true,
          elements,
        },
      });
      expect(makeSelectElement('uuid1')(mockedState))
        .toEqual(mockedState.getIn(['profiler', 'elements', 'uuid1']));
    });
    it('should select the search loading state', () => {
      const mockedState = fromJS({
        search: {
          loading: true,
        },
      });
      expect(makeSelectSearchLoading()(mockedState))
        .toEqual(mockedState.getIn(['search', 'loading']));
    });
  });
});
