import { testSaga, expectSaga } from 'redux-saga-test-plan';
// import { expectSaga } from 'redux-saga-test-plan';
import { select, takeLatest, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import {
  LOGIN_CLICKED,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../constants';
import appReducer from '../reducer';
import { makeSelectUsername } from '../selectors';
import { loginSuccess } from '../actions';
import loginData, { loginUser } from '../sagas';


describe('Container [App] - sagas', () => { /* eslint-disable redux-saga/yield-effects */
  describe('loginUser Saga', () => {
    let loginUserGenerator;
    beforeEach(() => {
      loginUserGenerator = loginUser();
      // select username
      const selectDescriptor = loginUserGenerator.next().value;
      console.log(selectDescriptor);
      expect(selectDescriptor).toMatchSnapshot();
      // call delay effect
      loginUserGenerator.next();
      const callDescriptor = loginUserGenerator.next().value;
      console.log(callDescriptor);
    });
    it('should dispatch loginSuccess action if the token is recieved and stored successfully', () => {
      const token = 'yummy-chocolate';
      const putDescriptor = loginUserGenerator.next().value;
      expect(putDescriptor).toEqual(put(loginSuccess(token)));
    });
  });
  describe('loginData Saga', () => {
    const loginDataSaga = loginData();
    it('works with unit tests', () => {
      const takeLatestDescriptor = loginDataSaga.next().value;
      expect(takeLatestDescriptor).toEqual(takeLatest(LOGIN_CLICKED, loginUser));
    });
  });
});
