// import { expectSaga } from 'redux-saga-test-plan';
import { delay } from 'redux-saga';
import { call, takeLatest, put } from 'redux-saga/effects';
import { rankingResults } from 'fixtures/foodprofile';

import {
  GET_NUTRIENT_RANKING,
} from '../constants';
import { loadRankingsSuccess, loadRankingsFailure } from '../actions';
import fetchRankings, { getRankings } from '../saga';


describe('Container [NutrientProfileRankingChartView] - sagas', () => { /* eslint-disable redux-saga/yield-effects */
  describe('getRankings Saga', () => {
    let getRankingsGenerator;
    beforeEach(() => {
      getRankingsGenerator = getRankings();
      // select serialNumber
      const selectDescriptor = getRankingsGenerator.next(rankingResults).value;
      expect(selectDescriptor).toMatchSnapshot();
      // call axios getFoodProfile
      const callDescriptor = getRankingsGenerator.next().value;
      expect(callDescriptor).toMatchSnapshot();
    });
    it('should dispatch loadRankingsSuccess action if the results are fetched correctly', () => {
      const response = rankingResults;
      const putDescriptor = getRankingsGenerator.next(response).value;
      expect(putDescriptor).toEqual(put(loadRankingsSuccess(response)));
    });
    it('should dispatch loadProfileSuccess action if the token is recieved and stored successfully', () => {
      const response = rankingResults;
      const putDescriptor = getRankingsGenerator.next(response).value;
      expect(putDescriptor).toEqual(put(loadRankingsSuccess(response)));
      expect(getRankingsGenerator.next().done).toEqual(true);
    });
    it('should dispatch loadProfileSuccess after retry attempts made', () => {
      const response = new Error('Fetch Failure');
      const failAttempts = 1;
      // exceeds failure attempts
      for (let i = 0; i < failAttempts; i += 1) {
        const callDescriptor = getRankingsGenerator.throw(response).value;
        expect(callDescriptor).toEqual(call(delay, 1000));
      }
      const callDescriptor2 = getRankingsGenerator.next().value;
      expect(callDescriptor2).toMatchSnapshot();
      const putDescriptor = getRankingsGenerator.next(rankingResults).value;
      expect(putDescriptor).toEqual(put(loadRankingsSuccess(rankingResults)));
    });
    it('should dispatch loadProfileFailure action if too many errors are thrown', () => {
      const response = new Error('Fetch Failure');
      const failAttempts = 2;
      // exceeds failure attempts
      for (let i = 0; i < failAttempts; i += 1) {
        const callDescriptor = getRankingsGenerator.throw(response).value;
        expect(callDescriptor).toEqual(call(delay, 1000));
        getRankingsGenerator.next();
      }
      // last failure will exist re-try loop
      getRankingsGenerator.throw(response);
      const putDescriptor = getRankingsGenerator.next().value;
      expect(putDescriptor).toEqual(put(loadRankingsFailure(response)));
    });
  });
  describe('fetchRankings Saga', () => {
    const fetchRankingsSaga = fetchRankings();
    it('works with unit tests', () => {
      const takeLatestDescriptor = fetchRankingsSaga.next().value;
      expect(takeLatestDescriptor).toEqual(takeLatest(GET_NUTRIENT_RANKING, getRankings));
    });
  });
});
