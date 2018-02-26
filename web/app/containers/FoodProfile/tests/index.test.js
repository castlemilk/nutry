import React from 'react';
import { shallow } from 'enzyme';
// import { INITIAL_STATE } from '../constants';
import { profileInfo } from 'fixtures/foodprofile';
import NutrientDisplay from 'components/NutrientDisplay';
import FoodProfileToolBar from 'components/FoodProfileToolBar';
// import { AGES } from 'components/FoodProfileToolBar/constants';
import { FoodProfile } from '../index';
import FoodProfileWrapper from '../FoodProfileWrapper';

describe('<FoodProfile />', () => {
  it('should render container when loading', () => {
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
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render container using routing information', () => {
    const match = {
      path: '/foodprofile/:profileId',
      url: '/foodprofile/02049',
      isExact: true,
      params: { profileId: '02049' },
    };
    const props = {
      match,
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
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render container finished loading', () => {
    const props = {
      loading: false,
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
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should respond to tab change', () => {
    const onTabChangeSpy = jest.fn();
    const props = {
      loading: false,
      profileHeader: profileInfo,
      onLoadProfile: () => {},
      onLoadNewProfile: () => {},
      onTabChange: onTabChangeSpy,
      onPortionChanged: () => {},
      onAgeGroupChanged: () => {},
    };
    const renderedComponent = shallow(
      <FoodProfile {...props} />,
    );
    const nutrientPanel = renderedComponent.find(NutrientDisplay).dive();
    // console.log(nutrientPanel.debug());
    nutrientPanel.find('Tabs').simulate('change', 1);
    expect(onTabChangeSpy).toHaveBeenCalled();
  });
  it('should respond to portion change', () => {
    const onPortionChanedSpy = jest.fn();
    const props = {
      loading: false,
      profileHeader: profileInfo,
      onLoadProfile: () => {},
      onLoadNewProfile: () => {},
      onTabChange: () => {},
      onPortionChanged: onPortionChanedSpy,
      onAgeGroupChanged: () => {},
    };
    const renderedComponent = shallow(
      <FoodProfile {...props} />,
    );
    const toolbar = renderedComponent.find(FoodProfileToolBar).dive();
    // console.log(toolbar.debug());
    toolbar.find('Select').last().simulate('change', { target: { value: '100g' } });
    expect(onPortionChanedSpy).toHaveBeenCalled();
  });
});
