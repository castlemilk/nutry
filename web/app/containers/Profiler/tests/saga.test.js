// import { expectSaga } from 'redux-saga-test-plan';
import { takeLatest, put } from 'redux-saga/effects';
import { searchComplete } from 'containers/App/actions';
import { elements } from 'fixtures/profiler';
import { getProfilerParsedSuccess } from 'mocks/getElasticsearchQueryMock';
import { CHANGE_SEARCH } from 'containers/Search/constants';
import { CHANGE_PROFILER_SEARCH } from '../constants';
import { searchFailure } from '../actions';

import searcProfilerData, { getResults } from '../saga';


describe('Container [Profiler] - sagas', () => { /* eslint-disable redux-saga/yield-effects */
  describe('getResults Saga', () => {
    let getResultsGenerator;
    beforeEach(() => {
      getResultsGenerator = getResults();
      // debounce delay
      const callDelayDescriptor = getResultsGenerator.next().value;
      expect(callDelayDescriptor).toMatchSnapshot();
      // select searchString value
      const selectSearchStringDescriptor = getResultsGenerator.next('chocolate').value;
      expect(selectSearchStringDescriptor).toMatchSnapshot();
      // select element list
      const selectElementDescriptor = getResultsGenerator.next(elements).value;
      expect(selectElementDescriptor).toMatchSnapshot();
      // select results of search
      // call axios getFoodProfile
      const callDescriptor = getResultsGenerator.next(getProfilerParsedSuccess).value;
      expect(callDescriptor).toMatchSnapshot();
    });
    it('should dispatch searchComplete action result fetched successfully', () => {
      const response = getProfilerParsedSuccess;
      const putDescriptor = getResultsGenerator.next(response).value;
      expect(putDescriptor).toEqual(put(searchComplete(response)));
    });
    it('should dispatch searchFailure after failure to fetch', () => {
      const response = new Error('Fetch Failure');
      const descriptor = getResultsGenerator.throw(response).value;
      expect(descriptor).toMatchSnapshot();
      expect(descriptor).toEqual(put(searchFailure(response)));
    });
  });
  describe('searcProfilerData Saga', () => {
    const searcProfilerSaga = searcProfilerData();
    it('works with unit tests', () => {
      const takeLatestDescriptor = searcProfilerSaga.next().value;
      expect(takeLatestDescriptor).toEqual(takeLatest([CHANGE_SEARCH, CHANGE_PROFILER_SEARCH], getResults));
    });
  });
});
