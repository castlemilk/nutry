import { delay } from 'redux-saga';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { search } from 'services/elasticsearch/elasticsearch';
import { CHANGE_SEARCH } from './constants';
import { searchComplete, searchFailure } from './actions';

import { makeSelectSearchString } from './selectors';


// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/saga.js
}

export function* getResults() {
  // Fetch results from elasticsearch from the given search searchString
  const searchString = yield select(makeSelectSearchString());
  try {
    yield delay(500);
    const results = yield call(search, searchString);
    yield put(searchComplete(results));
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
  yield takeLatest(CHANGE_SEARCH, getResults);
}
