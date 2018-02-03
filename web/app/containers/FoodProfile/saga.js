import { delay } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { takeLatest, call, put, select, cancel, take } from 'redux-saga/effects';
import { getFoodProfile } from 'services/firebase/firebase';
import { GET_PROFILE, GET_PROFILE_SUCCESS } from './constants';
import { loadProfileSuccess, loadProfileFailure } from './actions';
import { makeSelectSerialNumber, makeSelectSource } from './selectors';

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/saga.js
}

export function* getProfile() { /* eslint no-underscore-dangle: ["error", { "allow": ["_source"] }]*/
  console.log('loadingProfile')
  const serialNumber = yield select(makeSelectSerialNumber());
  const source = yield select(makeSelectSource());
  let error = null;
  for (let i = 1; i <= 3; i += 1) {
    try {

      const profile = yield call(getFoodProfile, serialNumber);
      yield put(loadProfileSuccess(profile));
      return;
    } catch (err) {
      error = err;
      console.log(err);
      if (i < 5) {
        yield call(delay, 1000); // retry after 2s
      }
    }
  }
  yield put(loadProfileFailure(error));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* fetchProfile() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  while (true) {
      const watcher = yield takeLatest(GET_PROFILE, getProfile);
      const done = yield take([ LOCATION_CHANGE, GET_PROFILE_SUCCESS]);
      if (done) {
        yield cancel(watcher)
      }
  }
}
