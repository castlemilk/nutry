import { delay } from 'redux-saga';
import { put, takeLatest, call } from 'redux-saga/effects';
import { loginSuccess, loginFailure } from './actions';
import { makeSelectUsername } from './selectors';

import { LOGIN_CLICKED } from './constants';


export function* loginUser() {
  // TODO: hit a Authentication backend here
  try {
    const username = yield makeSelectUsername();
    if (!username) {
      throw Error('Username not specified');
    }
    yield call(delay, 500);
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
