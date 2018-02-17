import React from 'react';
import { shallow } from 'enzyme';
import { Spin } from 'antd';
import { Map, fromJS } from 'immutable';
import { Pie } from 'recharts';
import LoadingContent from 'components/LoadingContent';
import NutrientProfilePieChart from '../index';
import NutrientProfilePieChartWrapper from '../NutrientProfilePieChartWrapper';

describe('<NutrientProfilePieChart />', () => {
  it('displays loading content', () => {
    const props = {
      nutrientSelected: '',
      portionSelected: Object(),
      ageGroupSelected: Object(),
      nutrients: Object(),
      nutrientFilter: '',
      loading: true,
    };
    const renderedComponent = shallow(
      <NutrientProfilePieChart {...props} />
    );
    expect(renderedComponent.find(NutrientProfilePieChartWrapper).length).toEqual(1);
    expect(renderedComponent.find(LoadingContent).length).toEqual(1);
    expect(renderedComponent.find(Spin).length).toEqual(1);
  });
  it('displays default view', () => {
    const props = {
      nutrientSelected: 'CHOCDF',
      portionSelected: Map({
        unit: 'per 100g',
        value: 100,
        className: 'per100g',
        label: 'per 100g',
        amt: 1,
        g: 100 }),
      ageGroupSelected: Map({
        value: 'AM19',
        label: 'Adult Male (19-30)',
        className: 'am-19' }),
      nutrients: fromJS({
        CHOCDF: { name: 'Carbohydrates', units: 'g', value: 3.2, selected: false },
        CA: { name: 'Calcium (Ca)', units: 'mg', value: 405, selected: false },
      }),
      nutrientFilter: 'summary',
      loading: false,
    };
    const renderedComponent = shallow(
      <NutrientProfilePieChart {...props} />
    );
    expect(renderedComponent.find(NutrientProfilePieChartWrapper).length).toEqual(1);
    renderedComponent.find(Pie).simulate('mouseEnter', props, 1);
    expect(renderedComponent.state('activeIndex')).toEqual(1);
    expect(renderedComponent.find(Pie).get(0).props.activeIndex).toEqual(1);
  });
  it('displays nutrient selected', () => {
    const props = {
      nutrientSelected: 'CHOCDF',
      portionSelected: Map({
        unit: 'per 100g',
        value: 100,
        className: 'per100g',
        label: 'per 100g',
        amt: 1,
        g: 100 }),
      ageGroupSelected: Map({
        value: 'AM19',
        label: 'Adult Male (19-30)',
        className: 'am-19' }),
      nutrients: fromJS({
        CHOCDF: { name: 'Carbohydrates', units: 'g', value: 3.2, selected: false },
        CA: { name: 'Calcium (Ca)', units: 'mg', value: 405, selected: false },
      }),
      nutrientFilter: 'summary',
      loading: false,
    };
    const renderedComponent = shallow(
      <NutrientProfilePieChart {...props} />
    );
    expect(renderedComponent.find(NutrientProfilePieChartWrapper).length).toEqual(1);
    renderedComponent.find(Pie).simulate('mouseEnter', props, 1);
    expect(renderedComponent.state('activeIndex')).toEqual(1);
    expect(renderedComponent.find(Pie).get(0).props.activeIndex).toEqual(1);
  });
});
