import React from 'react';
import { shallow } from 'enzyme';
import { Slider } from 'antd';
import Select from 'react-select';

import { NUTRIENT } from 'fixtures/foodprofile';
import ProfilerElement from '../index';
import ProfilerElementWrapper from '../ProfilerElementWrapper';
import { NUTRIENTS } from '../constants';

describe('<ProfilerElement />', () => {
  it('should render', () => {
    const props = {
      id: 'uuid',
      scale: 50,
      nutrient: NUTRIENT,
      onNutrientChange: () => {},
      onScaleChange: () => {},
      onElementRemove: () => {},
    };
    const renderedComponent = shallow(
      <ProfilerElement {...props} />
    );
    expect(renderedComponent.find(ProfilerElementWrapper).length).toEqual(1);
  });
  it('can slide change value', () => {
    const onSliderChangekSpy = jest.fn();
    const props = {
      id: 'uuid',
      scale: 50,
      nutrient: NUTRIENT,
      onNutrientChange: () => {},
      onScaleChange: onSliderChangekSpy,
      onElementRemove: () => {},
    };
    const renderedComponent = shallow(
      <ProfilerElement {...props} />
    );

    expect(renderedComponent.find(ProfilerElementWrapper).length).toEqual(1);
    renderedComponent.find(Slider).simulate('change');
    expect(onSliderChangekSpy).toHaveBeenCalled();
  });
  it('can set nutrient', () => {
    const onNutrientChange = jest.fn();
    const props = {
      id: 'uuid',
      scale: 50,
      nutrient: NUTRIENT,
      onNutrientChange,
      onScaleChange: () => {},
      onElementRemove: () => {},
    };
    const renderedComponent = shallow(
      <ProfilerElement {...props} />
    );

    expect(renderedComponent.find(ProfilerElementWrapper).length).toEqual(1);
    const selectNutrient = renderedComponent.find(Select).first();
    selectNutrient.simulate('change', { target: { value: NUTRIENTS[1].value } });
    expect(onNutrientChange).toHaveBeenCalled();
  });
  it('can be deleted', () => {
    const onDeleteClickSpy = jest.fn();
    const props = {
      id: 'uuid',
      scale: 50,
      nutrient: NUTRIENT,
      onNutrientChange: () => {},
      onScaleChange: () => {},
      onElementRemove: onDeleteClickSpy,
    };
    const renderedComponent = shallow(
      <ProfilerElement {...props} />
    );

    expect(renderedComponent.find(ProfilerElementWrapper).length).toEqual(1);
    renderedComponent.find('ProfilerDeleteElement').simulate('click');
    expect(onDeleteClickSpy).toHaveBeenCalled();
  });
});
