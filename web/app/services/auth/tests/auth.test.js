import { authentication } from '../auth';

describe('<WikiView />', () => {
  it('should authenticate', async () => {
    const credentials = {
      username: 'username',
      password: 'password',
    };
    const result = await authentication(credentials);
    expect(result).toEqual('yummy-chocolate');
  });
  it('should raise error on invalid credentials', async () => {
    const credentials = {
      username: 'username',
    };
    return authentication(credentials).catch((e) =>
      expect(e).toEqual(Error('credentials missing')));
  });
});
