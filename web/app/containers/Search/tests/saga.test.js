// import { expectSaga } from 'redux-saga-test-plan';
import { takeLatest, put } from 'redux-saga/effects';
import { getSearchParsedSuccess } from 'mocks/getElasticsearchQueryMock';
import { searchComplete } from 'containers/App/actions';
import { CHANGE_SEARCH, REFRESH_SEARCH } from '../constants';
import { searchFailure } from '../actions';
import searchData, { getResults } from '../saga';


describe('Container [Search] - sagas', () => { /* eslint-disable redux-saga/yield-effects */
  describe('getResults Saga', () => {
    let getResultsGenerator;
    beforeEach(() => {
      getResultsGenerator = getResults();
    });
    it('should dispatch searchComplete action result fetched successfully', () => {
      // select searchString value
      // debounce delay
      const callDelayDescriptor = getResultsGenerator.next().value;
      expect(callDelayDescriptor).toMatchSnapshot();
      getResultsGenerator.next();
      const selectsearchTypeDescriptor = getResultsGenerator.next('all').value;
      expect(selectsearchTypeDescriptor).toMatchSnapshot();
      const selectSearchStringDescriptor = getResultsGenerator.next('chocolate').value;
      expect(selectSearchStringDescriptor).toMatchSnapshot();
      const response = getSearchParsedSuccess;
      const putDescriptor = getResultsGenerator.next(response).value;
      expect(putDescriptor).toEqual(put(searchComplete(response)));
    });
    it('should dispatch searchComplete action with empty results for profiler mode', () => {
      // select searchString value
      // debounce delay
      const callDelayDescriptor = getResultsGenerator.next().value;
      expect(callDelayDescriptor).toMatchSnapshot();
      const selectsearchTypeDescriptor = getResultsGenerator.next('profiler').value;
      expect(selectsearchTypeDescriptor).toMatchSnapshot();
      const putDescriptor = getResultsGenerator.next('profiler').value;
      expect(putDescriptor).toEqual(put(searchComplete(Object())));
    });
    it('should dispatch searchFailure after failure to fetch', () => {
      // debounce delay
      const callDelayDescriptor = getResultsGenerator.next().value;
      expect(callDelayDescriptor).toMatchSnapshot();
      // select searchString value
      const selectsearchTypeDescriptor = getResultsGenerator.next('all').value;
      expect(selectsearchTypeDescriptor).toMatchSnapshot();
      // select element list
      const selectSearchStringDescriptor = getResultsGenerator.next('chocolate').value;
      expect(selectSearchStringDescriptor).toMatchSnapshot();
      const response = new Error('Fetch Failure');
      const descriptor = getResultsGenerator.throw(response).value;
      expect(descriptor).toMatchSnapshot();
      expect(descriptor).toEqual(put(searchFailure(response)));
    });
  });
  describe('searchData Saga', () => {
    const searchDataSaga = searchData();
    it('works with unit tests', () => {
      const takeLatestDescriptor = searchDataSaga.next().value;
      expect(takeLatestDescriptor).toEqual(takeLatest([CHANGE_SEARCH, REFRESH_SEARCH], getResults));
    });
  });
});
