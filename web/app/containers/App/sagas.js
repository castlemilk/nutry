import { delay } from 'redux-saga';
import { put, takeLatest } from 'redux-saga/effects';
import { loginSuccess, loginFailure } from './actions';

import { LOGIN_CLICKED } from './constants';

// // Individual exports for testing
// export default function* defaultSaga() {
//   // See example in containers/HomePage/saga.js
// }


export function* loginUser() {
  // TODO: hit a backend when ready
  try {
    yield delay(500);
    const token = 'yummy-chocolate';
    yield put(loginSuccess(token));
  } catch (err) {
    yield put(loginFailure(err));
  }
}


/**
 * Root saga manages watcher lifecycle
 */
export default function* loginData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOGIN_CLICKED, loginUser);
}
