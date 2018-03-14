import { fromJS } from 'immutable';
import { makeSelectWikiView } from '../selectors';

describe('selectWikiViewDomain', () => {
  it('should select the default wikidomain', () => {
    const mockedState = fromJS({
      wikiView: {
      },
    });
    expect(makeSelectWikiView()(mockedState))
      .toEqual({});
  });
});
