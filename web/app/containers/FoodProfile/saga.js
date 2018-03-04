import { delay } from 'redux-saga';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { getFoodProfile } from 'services/firebase/firebase';
import { GET_PROFILE } from './constants';
import { loadProfileSuccess, loadProfileFailure } from './actions';
import { makeSelectSerialNumber } from './selectors';

export function* getProfile() { /* eslint no-underscore-dangle: ["error", { "allow": ["_source"] }]*/
  const serialNumber = yield select(makeSelectSerialNumber());
  let error = false;
  for (let i = 1; i <= 3; i += 1) {
    try {
      const profile = yield call(getFoodProfile, serialNumber);
      yield put(loadProfileSuccess(profile));
      break;
    } catch (err) {
      error = err;
      yield call(delay, 1000); // retry after 2s
    }
  }
  if (error) {
    yield put(loadProfileFailure(error));
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
