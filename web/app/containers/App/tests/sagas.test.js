import { testSaga } from 'redux-saga-test-plan';
// import { expectSaga } from 'redux-saga-test-plan';
// import { takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import {
  LOGIN_CLICKED,
  LOGIN_SUCCESS,
} from '../constants';

// import { makeSelectLoggedIn } from '../selectors';
import loginData, { loginUser } from '../sagas';


describe('Container [App] - sagas', () => {
  describe('loginUser', () => {
    it('works with unit tests', () => {
      testSaga(loginUser)
      // advance saga with `next()` for delay effect
      .next()
      // assert that the saga yieled a call effect
      .call(delay, 500)
      .next()
      // asset that the saga yielded a put
      .put({ type: LOGIN_SUCCESS, token: 'yummy-chocolate' })
      // assert that the saga has yielded the put into actions
      .next()
      .isDone();
    });
  });
  describe('loginData', () => {
    it('works with unit tests', () => {
      testSaga(loginData)
      // advance saga with `next()` for delay effect
      .next()
      // assert that the saga yieled a call effect
      // .dispatch()
      .takeLatestEffect(LOGIN_CLICKED, loginUser)
      .next()
      .isDone();
    });
  });
});
