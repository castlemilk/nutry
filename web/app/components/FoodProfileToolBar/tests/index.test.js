import React from 'react';
import { shallow } from 'enzyme';

import FoodProfileToolBar from '../index';
import FoodProfileToolBarWrapper from '../FoodProfileToolBarWrapper';

describe('<FoodProfileToolBar />', () => {
  it('loading', () => {
    const toolBarProps = {
      ageGroupSelected: Object(),
      portions: [],
      portionSelected: Object(),
      onAgeGroupChanged: () => {},
      onPortionChanged: () => {},
      loading: true,
    };
    const renderedComponent = shallow(
      <FoodProfileToolBar {...toolBarProps} />
    );
    expect(renderedComponent.find(FoodProfileToolBarWrapper).length).toEqual(1);
  });
  it('display', () => {
    const toolBarProps = {
      ageGroupSelected: Object(),
      portions: [],
      portionSelected: Object(),
      onAgeGroupChanged: () => {},
      onPortionChanged: () => {},
      loading: false,
    };
    const renderedComponent = shallow(
      <FoodProfileToolBar {...toolBarProps} />
    );
    expect(renderedComponent.find(FoodProfileToolBarWrapper).length).toEqual(1);
  });
});
