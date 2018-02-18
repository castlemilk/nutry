import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Spin } from 'antd';
import { Map } from 'immutable';
import { Pie } from 'recharts';

import LoadingContent from 'components/LoadingContent';
import NutrientProfilePieChart from '../index';
import NutrientProfilePieChartWrapper from '../NutrientProfilePieChartWrapper';

describe('<NutrientProfilePieChart />', () => {
  it('displays loading content', () => {
    const props = {
      nutrientSelected: null,
      nutrients: [],
      loading: true,
    };
    const renderedComponent = shallow(
      <NutrientProfilePieChart {...props} />
    );
    expect(renderedComponent.find(NutrientProfilePieChartWrapper).length).toEqual(1);
    expect(renderedComponent.find(LoadingContent).length).toEqual(1);
    expect(renderedComponent.find(Spin).length).toEqual(1);
  });
  it('displays default view with no default selection', () => {
    const props = {
      nutrientSelected: null,
      nutrients: [
        { prefix: 'CHOCDF', name: 'Carbohydrates', units: 'g', value: 3.2, selected: false },
        { prefix: 'CA', name: 'Calcium (Ca)', units: 'mg', value: 405, selected: false },
      ],
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
      nutrients: [
          { prefix: 'CHOCDF', name: 'Carbohydrates', units: 'g', value: 3.2, selected: false },
          { prefix: 'CA', name: 'Calcium (Ca)', units: 'mg', value: 405, selected: false },
      ],
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
  it('displays nutrient selected when nutrientSelected deosnt exist', () => {
    const spy = sinon.spy(NutrientProfilePieChart.prototype, 'componentWillReceiveProps');
    const props = {
      nutrientSelected: 'CHOCOLATELOL',
      nutrients: [
          { prefix: 'CHOCDF', name: 'Carbohydrates', units: 'g', value: 3.2, selected: false },
          { prefix: 'CA', name: 'Calcium (Ca)', units: 'mg', value: 405, selected: false },
      ],
      loading: false,
    };
    const renderedComponent = shallow(
      <NutrientProfilePieChart {...props} />
    );
    expect(renderedComponent.find(NutrientProfilePieChartWrapper).length).toEqual(1);
    expect(renderedComponent.state('activeIndex')).toEqual(1);
    expect(spy.calledOnce).toEqual(false);
    renderedComponent.setProps({ nutrientSelected: 'CHOCDF' });
    expect(spy.calledOnce).toEqual(true);
    renderedComponent.setProps({ nutrientSelected: 'CHOCDF' });
    expect(spy.calledOnce).toEqual(false);
    renderedComponent.setProps({ nutrientSelected: 'CHOCOLATELOL' });
    expect(renderedComponent.state('activeIndex')).toEqual(1);
    // expect(renderedComponent.state('activeIndex')).toEqual(0);
  });
});
