import React from 'react';
import { shallow } from 'enzyme';
import LoadingContent from 'components/LoadingContent';
import FoodProfileTitle from '../index';
import FoodProfileTitleWrapper from '../FoodProfileTitleWrapper';

describe('<FoodProfileTitle />', () => {
  it('shows loading animation', () => {
    const titleProps = {
      profileHeader: {},
      loading: true,
    };
    const renderedComponent = shallow(
      <FoodProfileTitle {...titleProps} />
    );
    expect(renderedComponent.find(FoodProfileTitleWrapper).length).toEqual(1);
    expect(renderedComponent.find(LoadingContent).length).toEqual(3);
  });
  it('shows title display', () => {
    const titleProps = {
      profileHeader: {
        name: 'item1',
        group: 'group1',
        usage: [],
      },
      loading: false,
    };
    const renderedComponent = shallow(
      <FoodProfileTitle {...titleProps} />
    );
    expect(renderedComponent.find(FoodProfileTitleWrapper).length).toEqual(1);
    expect(renderedComponent.find('h1').length).toEqual(1);
    expect(renderedComponent.find('h2').length).toEqual(1);
    expect(renderedComponent.find('h3').length).toEqual(2);
  });
});
