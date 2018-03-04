// import { expectSaga } from 'redux-saga-test-plan';
import { delay } from 'redux-saga';
import { call, takeLatest, put } from 'redux-saga/effects';
import { profileBody } from 'fixtures/foodprofile';

import {
  GET_PROFILE,
} from '../constants';
import { loadProfileSuccess, loadProfileFailure } from '../actions';
import fetchProfile, { getProfile } from '../saga';


describe('Container [FoodProfile] - sagas', () => { /* eslint-disable redux-saga/yield-effects */
  describe('getProfile Saga', () => {
    let getProfileGenerator;
    beforeEach(() => {
      getProfileGenerator = getProfile();
      // select serialNumber
      const selectDescriptor = getProfileGenerator.next('2222222').value;
      expect(selectDescriptor).toMatchSnapshot();
      // call axios getFoodProfile
      const callDescriptor = getProfileGenerator.next().value;
      expect(callDescriptor).toMatchSnapshot();
    });
    it('should dispatch loadProfileSuccess action if the token is recieved and stored successfully', () => {
      const response = profileBody;
      const putDescriptor = getProfileGenerator.next(response).value;
      expect(putDescriptor).toEqual(put(loadProfileSuccess(response)));
    });
    it('should dispatch loadProfileSuccess action if the token is recieved and stored successfully', () => {
      const response = profileBody;
      const putDescriptor = getProfileGenerator.next(response).value;
      expect(putDescriptor).toEqual(put(loadProfileSuccess(response)));
      expect(getProfileGenerator.next().done).toEqual(true);
    });
    it('should dispatch loadProfileSuccess after retry attempts made', () => {
      const response = new Error('Fetch Failure');
      const failAttempts = 1;
      // exceeds failure attempts
      for (let i = 0; i < failAttempts; i += 1) {
        const callDescriptor = getProfileGenerator.throw(response).value;
        expect(callDescriptor).toEqual(call(delay, 1000));
        getProfileGenerator.next();
      }
      // this attempt now succeeds
      getProfileGenerator.next();
      const callDescriptor2 = getProfileGenerator.next().value;
      expect(callDescriptor2).toMatchSnapshot();
      const putDescriptor = getProfileGenerator.next(profileBody).value;
      expect(putDescriptor).toEqual(put(loadProfileSuccess(profileBody)));
    });
    it('should dispatch loadProfileFailure action if too many errors are thrown', () => {
      const response = new Error('Fetch Failure');
      const failAttempts = 2;
      // exceeds failure attempts
      for (let i = 0; i < failAttempts; i += 1) {
        const callDescriptor = getProfileGenerator.throw(response).value;
        expect(callDescriptor).toEqual(call(delay, 1000));
        getProfileGenerator.next();
      }
      // last failure will exist re-try loop
      getProfileGenerator.throw(response);
      const putDescriptor = getProfileGenerator.next().value;
      expect(putDescriptor).toEqual(put(loadProfileFailure(response)));
    });
  });
  describe('fetchProfile Saga', () => {
    const fetchProfileSaga = fetchProfile();
    it('works with unit tests', () => {
      const takeLatestDescriptor = fetchProfileSaga.next().value;
      expect(takeLatestDescriptor).toEqual(takeLatest(GET_PROFILE, getProfile));
    });
  });
  // describe('fetchProfile Saga', () => {
  //   const fetchProfileSaga = fetchProfile();
  //   it('works with next redux events triggering', () => {
  //     const takeLatestDescriptor = fetchProfileSaga.next().value;
  //     expect(takeLatestDescriptor).toEqual(takeLatest(GET_PROFILE, getProfile));
  //     const takeDescriptor = fetchProfileSaga.next().value;
  //     expect(takeDescriptor).toEqual(take([LOCATION_CHANGE, GET_PROFILE_SUCCESS]));
  //   });
  // });
  // describe('fetchProfile Saga', () => {
  //   const fetchProfileSaga = fetchProfile();
  //   it('works with unit tests when hitting cancellation event', () => {
  //     const takeLatestDescriptor = fetchProfileSaga.next().value;
  //     expect(takeLatestDescriptor).toEqual(takeLatest(GET_PROFILE, getProfile));
  //     const takeDescriptor = fetchProfileSaga.next({ type: LOCATION_CHANGE, payload: { done: true } }).value;
  //     expect(takeDescriptor).toEqual(take([LOCATION_CHANGE, GET_PROFILE_SUCCESS]));
  //     const doneDescriptor = fetchProfileSaga.next({ type: LOCATION_CHANGE, payload: { done: true } }).value;
  //     expect(doneDescriptor).toEqual(cancel(...takeLatestDescriptor));
  //   });
  // });
  // describe('fetchProfile Saga', () => {
  //   const fetchProfileSaga = fetchProfile();
  //   it('works with unit tests when not done', () => {
  //     const takeLatestDescriptor = fetchProfileSaga.next().value;
  //     expect(takeLatestDescriptor).toEqual(takeLatest(GET_PROFILE, getProfile));
  //     const takeDescriptor = fetchProfileSaga.next().value;
  //     expect(takeDescriptor).toEqual(take([LOCATION_CHANGE, GET_PROFILE_SUCCESS]));
  //     const doneDescriptor = fetchProfileSaga.next().value;
  //     expect(doneDescriptor).toEqual(takeLatest(GET_PROFILE, getProfile));
  //   });
  // });
});
