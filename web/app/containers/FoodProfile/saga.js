import { delay } from 'redux-saga';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { getFoodProfile } from 'services/firebase/firebase';
import { GET_PROFILE } from './constants';
import { loadProfileSuccess, loadProfileFailure } from './actions';
import { makeSelectSerialNumber, makeSelectSource } from './selectors';

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/saga.js
}

export function* getProfile() { /* eslint no-underscore-dangle: ["error", { "allow": ["_source"] }]*/
  delay(100);
  const serialNumber = yield select(makeSelectSerialNumber());
  const source = yield select(makeSelectSource());
  try {
    const profile = yield call(getFoodProfile, source, serialNumber);
    yield put(loadProfileSuccess(profile));
  } catch (err) {
    console.log(err);
    yield put(loadProfileFailure(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* fetchProfile() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_PROFILE, getProfile);
}
