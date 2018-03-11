import { delay } from 'redux-saga';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { search } from 'services/elasticsearch/elasticsearch';
import { searchComplete } from 'containers/App/actions';
import { CHANGE_SEARCH, REFRESH_SEARCH } from './constants';

import { searchFailure } from './actions';

import { makeSelectSearchString, makeSelectSearchType } from './selectors';

export function* getResults() {
  // Fetch results from elasticsearch from the given search searchString
  yield call(delay, 400);
  const searchType = yield select(makeSelectSearchType());
  try {
    if (searchType === 'profiler') {
      yield put(searchComplete(Object()));
    } else {
      const searchString = yield select(makeSelectSearchString());
      const results = yield call(search, searchString);
      yield put(searchComplete(results));
    }
  } catch (err) {
    yield put(searchFailure(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* searchData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest([CHANGE_SEARCH, REFRESH_SEARCH], getResults);
}
