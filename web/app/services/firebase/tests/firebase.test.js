// import axios from 'axios';
import moxios from 'moxios';
import sinon from 'sinon';
import { getFoodProfile, getMultiFoodProfile } from '../firebase';
import { getFoodProfileMockSuccess, getMultiFoodProfileMockSuccess } from '../../../mocks/getFoodProfileMock';

describe('firebase', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('getFoodProfile', (done) => {
    const payload = getFoodProfileMockSuccess;
    const onFulfilled = sinon.spy();
    getFoodProfile('02049').then(onFulfilled);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      // Override with a mocked response via a specified payload.
      request.respondWith(payload).then(() => {
        expect(onFulfilled.getCall(0).args[0].SN).toBe('02049');
        expect(onFulfilled.getCall(0).args[0].name).toBe(getFoodProfileMockSuccess.response.name);
        done();
      });
    });
  });
  it('getMultiFoodProfile', () => {
    // const payload = getMultiFoodProfileMockSuccess;
    // const onFulfilled = sinon.spy();
    moxios.stubRequest(/.*profiles\/00000.json.*/, getMultiFoodProfileMockSuccess[0])
    moxios.stubRequest(/.*profiles\/00001.json.*/, getMultiFoodProfileMockSuccess[1])
    getMultiFoodProfile(['00000', '00001']
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      // Override with a mocked response via a specified payload.
      request.respondWith(payload).then((response) => {
        console.log(onFulfilled);
        console.log(response);
        expect(onFulfilled.getCall(0).args[0].SN).toBe('02049');
        expect(onFulfilled.getCall(0).args[0].name).toBe(getFoodProfileMockSuccess.response.name);
        done();
      });
    });
  });
});
