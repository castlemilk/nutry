import React from 'react';
import { shallow } from 'enzyme';

import FoodProfileTitle from '../index';
import FoodProfileTitleWrapper from '../FoodProfileTitleWrapper';

describe('<FoodProfileTitle />', () => {
  it('loading', () => {
    const titleProps = {
      profileHeader: {},
      loading: true,
    };
    const renderedComponent = shallow(
      <FoodProfileTitle {...titleProps} />
    );
    expect(renderedComponent.find(FoodProfileTitleWrapper).length).toEqual(1);
  });
  it('display', () => {
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
  });
});
