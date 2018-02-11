import { delay } from 'redux-saga';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { search } from 'services/elasticsearch/elasticsearch';
import { searchComplete } from 'containers/App/actions';
import { CHANGE_SEARCH, REFRESH_SEARCH } from './constants';

import { searchFailure } from './actions';

import { makeSelectSearchString, makeSelectSearchType } from './selectors';


// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/saga.js
}

export function* getResults() {
  // Fetch results from elasticsearch from the given search searchString
  const searchType = yield select(makeSelectSearchType());
  const searchString = yield select(makeSelectSearchString());

  try {
    console.log('running search');
    yield delay(400);
    if (searchType === 'nutrients' || searchType === 'all') {
      const results = yield call(search, searchString);
      // yield put(searchComplete(results));
      yield put(searchComplete(results));
    } else if (searchType === 'profiler') {
      yield put(searchComplete(Object()));
      // const elements = yield select(makeSelectAllElements())
      // const results = yield call(profiler, searchString, elements);
      // yield put(searchComplete(results));
    } else {
      yield put(searchComplete(Object()));
    }
  } catch (err) {
    console.log(err);
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
