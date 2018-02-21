import React from 'react';
import { shallow } from 'enzyme';
import SearchHeader from '../index';
import SearchHeaderWrapper from '../SearchHeaderWrapper';

describe('<SearchHeader />', () => {
  it('should render', () => {
    const props = {
      searchBarView: Object(),
    };
    const renderedComponent = shallow(
      <SearchHeader {...props} />
    );
    expect(renderedComponent.find(SearchHeaderWrapper).length).toEqual(1);
  });
});
