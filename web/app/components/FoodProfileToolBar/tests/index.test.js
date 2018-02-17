import React from 'react';
import Select from 'react-select';
import { shallow } from 'enzyme';
import LoadingContent from 'components/LoadingContent';

import { AGES } from '../constants';
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
    expect(renderedComponent.find(LoadingContent).length).toEqual(4);
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
    expect(renderedComponent.find('.age-group-description').length).toEqual(1);
    expect(renderedComponent.find('#foodprofile-toolbar-select-agegroup').length).toEqual(1);
    expect(renderedComponent.find('.portion-description').length).toEqual(1);
    expect(renderedComponent.find('#foodprofile-toolbar-select-portion').length).toEqual(1);
  });
  it('responds to ageGroup change', () => {
    const onChangeAgeGroupSpy = jest.fn();
    const toolBarProps = {
      ageGroupSelected: Object(),
      portions: [],
      portionSelected: Object(),
      onAgeGroupChanged: onChangeAgeGroupSpy,
      onPortionChanged: () => {},
      loading: false,
    };
    const renderedComponent = shallow(
      <FoodProfileToolBar {...toolBarProps} />
    );
    const selectAgeGroup = renderedComponent.find(Select).first();
    selectAgeGroup.simulate('change', { target: { value: AGES[0].value } });
    expect(onChangeAgeGroupSpy).toHaveBeenCalled();
  });
  it('responds to portion change', () => {
    const onChangePortionSpy = jest.fn();
    const toolBarProps = {
      ageGroupSelected: Object(),
      portions: [],
      portionSelected: Object(),
      onAgeGroupChanged: () => {},
      onPortionChanged: onChangePortionSpy,
      loading: false,
    };
    const renderedComponent = shallow(
      <FoodProfileToolBar {...toolBarProps} />
    );
    const selectPortion = renderedComponent.find(Select).last();
    selectPortion.simulate('change', { target: { value: '100g' } });
    expect(onChangePortionSpy).toHaveBeenCalled();
  });
});
