import { delay } from 'redux-saga';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { profiler } from 'services/elasticsearch/elasticsearch';
import { CHANGE_SEARCH } from 'containers/Search/constants';
import { makeSelectSearchString } from 'containers/Search/selectors';
import { searchComplete } from 'containers/App/actions';
import { CHANGE_PROFILER_SEARCH } from './constants';

import { searchFailure } from './actions';

import { makeSelectAllElements } from './selectors';

export function* getResults() {
  // Fetch results from elasticsearch from the given search searchString
  yield call(delay, 400);
  const searchString = yield select(makeSelectSearchString());
  try {
    const elements = yield select(makeSelectAllElements());
    const results = yield call(profiler, searchString, elements);
    yield put(searchComplete(results));
  } catch (err) {
    yield put(searchFailure(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* searcProfilerData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest([CHANGE_SEARCH, CHANGE_PROFILER_SEARCH], getResults);
  // yield takeLatest(CHANGE_PROFILER_SEARCH, getResults);
}
