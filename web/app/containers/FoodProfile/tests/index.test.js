import React from 'react';
import { shallow } from 'enzyme';
// import { INITIAL_STATE } from '../constants';
import { profileInfo } from 'fixtures/foodprofile';
import { FoodProfile } from '../index';
import FoodProfileWrapper from '../FoodProfileWrapper';

describe('<FoodProfile />', () => {
  it('should render container', () => {
    const props = {
      loading: true,
      profileHeader: profileInfo,
      onLoadProfile: () => {},
      onLoadNewProfile: () => {},
      onTabChange: () => {},
      onPortionChanged: () => {},
      onAgeGroupChanged: () => {},
    };
    const renderedComponent = shallow(
      <FoodProfile {...props} />,
    );
    expect(renderedComponent.find(FoodProfileWrapper).length).toEqual(1);
  });
});
