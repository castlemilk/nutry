import React from 'react';
import { shallow } from 'enzyme';

import { profileInfo } from 'fixtures/foodprofile';
import SearchResultCard from '../index';
import Wrapper from '../Wrapper';

describe('<SearchResultCard />', () => {
  it('should render', () => {
    const props = {
      profileInfo,
      onClick: () => {},
    };
    const renderedComponent = shallow(
      <SearchResultCard {...props} />
    );
    expect(renderedComponent.find(Wrapper).length).toEqual(1);
    expect(renderedComponent.find('.usage').length).toEqual(1);
  });
  it('should render when usage undefined', () => {
    const props = {
      profileInfo,
      onClick: () => {},
    };
    props.profileInfo.usage = null;
    const renderedComponent = shallow(
      <SearchResultCard {...props} />
    );
    expect(renderedComponent.find(Wrapper).length).toEqual(1);
    expect(renderedComponent.find('.usage').length).toEqual(0);
  });
});
