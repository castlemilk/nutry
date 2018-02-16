// import axios from 'axios';
// import rewire from 'rewire';
import moxios from 'moxios';
import sinon from 'sinon';
import { parseResults, checkStatus, search, profiler, getDocument } from '../elasticsearch';

import {
  getSearchPlainSuccess,
  getSearchParsedSuccess,
  getProfilerQueryRequest,
  getProfilerPlainSuccess,
  getProfilerParsedSuccess,
  getDocumentPlainSuccess,
  getDocumentParsedSuccess,
} from '../../../mocks/getElastisearchQueryMock';

describe('elasticsearch', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('searchQuery', (done) => {
    const onFulfilled = sinon.spy();
    search('chocolate').then(onFulfilled);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      // Override with a mocked response via a specified payload.
      request.respondWith({
        status: 200,
        response: getSearchPlainSuccess,
      }).then(() => {
        const requestParsed = JSON.parse(request.config.data);
        expect(requestParsed.query.bool.should[0].match_phrase_prefix.name.query).toBe('chocolate');
        expect(onFulfilled.getCall(0).args[0]).toMatchObject(getSearchParsedSuccess);
        done();
      });
    });
  });
  it('profilerQuery', (done) => {
    const onFulfilled = sinon.spy();
    profiler(getProfilerQueryRequest.searchString,
        getProfilerQueryRequest.elements).then(onFulfilled);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      // Override with a mocked response via a specified payload.
      request.respondWith({
        status: 200,
        response: getProfilerPlainSuccess,
      }).then(() => {
        const requestParsed = JSON.parse(request.config.data);
        expect(requestParsed.query.function_score.functions[0].gauss.CHOCDF.origin).toBe(50);
        expect(requestParsed.query.function_score.functions[1].gauss.PROCNT.origin).toBe(50);
        expect(onFulfilled.getCall(0).args[0]).toMatchObject(getProfilerParsedSuccess);
        done();
      });
    });
  });
  it('getDocument', (done) => {
    const onFulfilled = sinon.spy();
    getDocument('02049').then(onFulfilled);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      // Override with a mocked response via a specified payload.
      request.respondWith({
        status: 200,
        response: getDocumentPlainSuccess,
      }).then(() => {
        const requestParsed = JSON.parse(request.config.data);
        expect(requestParsed.query.match.SN).toBe('02049');
        expect(onFulfilled.getCall(0).args[0]).toMatchObject(getDocumentParsedSuccess);
        done();
      });
    });
  });
  it('parseResults', (done) => {
    const responseSuccess = { status: 200, data: { a: 'a', b: 'b', hits: { hits: [], max_score: 10, total: 0 } } };
    const parseSuccess = { hits: 0, max_score: 10, items: [] };
    const responseFailure = { status: 404 };
    expect(parseResults(responseSuccess)).toMatchObject(parseSuccess);
    expect(parseResults(responseFailure)).toBe(null);
    done();
  });
  it('checkStatus', (done) => {
    const responseSuccess = { status: 200, data: { a: 'a', b: 'b', c: 'c' } };
    const responseFailure = { status: 404 };
    expect(checkStatus(responseSuccess)).toMatchObject(responseSuccess);
    expect(() => { checkStatus(responseFailure); }).toThrow();
    done();
  });
});
