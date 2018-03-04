// import { expectSaga } from 'redux-saga-test-plan';
import { takeLatest, put } from 'redux-saga/effects';

import {
  LOGIN_CLICKED,
} from '../constants';
import { loginSuccess, loginFailure } from '../actions';
import loginData, { loginUser } from '../saga';


describe('Container [App] - sagas', () => { /* eslint-disable redux-saga/yield-effects */
  describe('loginUser Saga', () => {
    let loginUserGenerator;
    beforeEach(() => {
      loginUserGenerator = loginUser('demo');
      // select username
      const selectDescriptor = loginUserGenerator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
      // call delay effect
      const callDescriptor = loginUserGenerator.next().value;
      expect(callDescriptor).toMatchSnapshot();
    });
    it('should dispatch loginSuccess action if the token is recieved and stored successfully', () => {
      const response = 'yummy-chocolate';
      const putDescriptor = loginUserGenerator.next(response).value;
      expect(putDescriptor).toEqual(put(loginSuccess(response)));
    });
    it('should dispatch loginFailure action if an error is thrown', () => {
      const response = new Error('Invalid Credentials');
      const putDescriptor = loginUserGenerator.throw(response).value;
      expect(putDescriptor).toEqual(put(loginFailure(response)));
    });
  });
  describe('loginUser Saga', () => {
    let loginUserGenerator;
    beforeEach(() => {
      loginUserGenerator = loginUser();
      // select username
      const selectDescriptor = loginUserGenerator.next().value;
      expect(selectDescriptor).toMatchSnapshot();
      // call delay effect
      const callDescriptor = loginUserGenerator.next().value;
      expect(callDescriptor).toMatchSnapshot();
    });
    it('should dispatch loginFailure when no user is specified', () => {
      const response = new Error('Invalid Credentials');
      const putDescriptor = loginUserGenerator.throw(response).value;
      expect(putDescriptor).toEqual(put(loginFailure(response)));
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
