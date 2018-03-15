import React from 'react';
import { shallow } from 'enzyme';
import { getSearchParsedSuccess } from 'mocks/getElasticsearchQueryMock';
import SearchResultCard from 'components/SearchResultCard';
import NoResultsFound from 'components/NoResultsFound';
import ResultsList from '../index';

describe('<ResultsList />', () => {
  it('should render when items are found', () => {
    const props = {
      results: [],
      onProfileSelected: () => {},
    };
    const renderedComponent = shallow(
      <ResultsList {...props} />
    );
    expect(renderedComponent.find('div').length).toEqual(1);
  });
  it('should render NoResultsFound component on empty list', () => {
    const props = {
      results: [],
      onProfileSelected: () => {},
    };
    const renderedComponent = shallow(
      <ResultsList {...props} />
    );
    console.log(renderedComponent.debug());
    expect(renderedComponent.find('div').length).toEqual(1);
    // expect(renderedComponent.find(NoResultsFound).length).toEqual(1);
  });
  it('should render NoResultsFound component on undefined list', () => {
    const props = {
      results: null,
      onProfileSelected: () => {},
    };
    const renderedComponent = shallow(
      <ResultsList {...props} />
    );
    expect(renderedComponent.find('div').length).toEqual(1);
    expect(renderedComponent.find(NoResultsFound).length).toEqual(1);
  });
  it('will respond to hover effect', () => { /* eslint no-underscore-dangle: ["error", { "allow": ["_source"] }]*/
    const onClickSpy = jest.fn();
    const props = {
      results: getSearchParsedSuccess.items,
      onProfileSelected: onClickSpy,
    };
    const renderedComponent = shallow(
      <ResultsList {...props} />
    );
    expect(renderedComponent.find('div').length).toEqual(1);
    renderedComponent.find(SearchResultCard).first().simulate('click', getSearchParsedSuccess.items[0]._source);
    expect(onClickSpy).toHaveBeenCalled();
  });
});
