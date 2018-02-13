import { getFoodProfile } from './firebase';


describe('request', () => {
  // Before each test, stub the fetch function
  beforeEach(() => {
    window.fetch = jest.fn();
  });
  describe('stubbing successful response', () => {
    // Before each test, pretend we got a successful response
    beforeEach(() => {
      const res = new Response('{"hello":"world"}', {
        status: 200,
        headers: {
          'Content-type': 'application/json',
        },
      });
      window.fetch.mockReturnValue(Promise.resolve(res));
    });
    it('should format the response correctly', (done) => {
      request('/thisurliscorrect')
           .catch(done)
           .then((json) => {
             expect(json.hello).toBe('world');
             done();
           });
    });
  });
});
