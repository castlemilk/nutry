import React from 'react';
import { shallow } from 'enzyme';
// import sinon from 'sinon';
import { Spin } from 'antd';
import { Bar, BarChart, Tooltip, Label } from 'recharts';

import LoadingContent from 'components/LoadingContent';
import { rankingResults, portionSelected } from 'fixtures/foodprofile';
import NutrientProfileRankingChart from '../index';
import NutrientProfileRankingChartWrapper from '../NutrientProfileRankingChartWrapper';

describe('<NutrientProfileRankingChart />', () => {
  it('displays loading content', () => {
    const props = {
      onLoadRankings: () => {},
      rankingResults: Object(),
      nutrientSelected: null,
      portionSelected: Object(),
      loading: true,
      id: '02042',
      onLoadNewProfile: () => {},
    };
    const renderedComponent = shallow(
      <NutrientProfileRankingChart {...props} />
    );
    expect(renderedComponent.find(NutrientProfileRankingChartWrapper).length).toEqual(1);
    expect(renderedComponent.find(LoadingContent).length).toEqual(1);
    expect(renderedComponent.find(Spin).length).toEqual(1);
  });
  it('displays default view with no default selection', () => {
    const props = {
      onLoadRankings: () => {},
      rankingResults,
      nutrientSelected: 'CHOCDF',
      portionSelected,
      loading: false,
      id: '02042',
      onLoadNewProfile: () => {},
    };
    const renderedComponent = shallow(
      <NutrientProfileRankingChart {...props} />
    );
    expect(renderedComponent.find(NutrientProfileRankingChartWrapper).length).toEqual(1);
    expect(renderedComponent.find(BarChart).length).toEqual(1);
    expect(renderedComponent.find(Label).get(0).props.value).toEqual('Carbohydrate, by difference [g]');
    expect(renderedComponent.find(Tooltip).length).toEqual(1);
    expect(renderedComponent.find(Bar).length).toEqual(1);
  });
  it('handles bar clicked', () => {
    const onBarClickedSpy = jest.fn();
    const props = {
      onLoadRankings: () => {},
      rankingResults,
      nutrientSelected: 'CHOCDF',
      portionSelected,
      loading: false,
      id: '02042',
      onLoadNewProfile: onBarClickedSpy,
    };
    const renderedComponent = shallow(
      <NutrientProfileRankingChart {...props} />
    );
    expect(renderedComponent.find(NutrientProfileRankingChartWrapper).length).toEqual(1);
    renderedComponent.find(Bar).simulate('click', props, 1);
    expect(onBarClickedSpy).toHaveBeenCalled();
  });
  // it('displays nutrient selected when nutrientSelected deosnt exist', () => {
  //   const spy = sinon.spy(NutrientProfileRankingChart.prototype, 'componentWillReceiveProps');
  //   const props = {
  //     onLoadRankings: () => {},
  //     rankingResults,
  //     nutrientSelected: 'CHOCDF',
  //     portionSelected: Object(),
  //     loading: true,
  //     id: null,
  //     onLoadNewProfile: () => {},
  //   };
  //   const renderedComponent = shallow(
  //     <NutrientProfileRankingChart {...props} />
  //   );
  //   expect(renderedComponent.find(NutrientProfileRankingChartWrapper).length).toEqual(1);
  //   expect(renderedComponent.state('activeIndex')).toEqual(1);
  //   expect(spy.calledOnce).toEqual(false);
  //   renderedComponent.setProps({ nutrientSelected: 'CHOCDF' });
  //   expect(spy.calledOnce).toEqual(true);
  //   renderedComponent.setProps({ nutrientSelected: 'CHOCDF' });
  //   expect(spy.calledOnce).toEqual(false);
  //   renderedComponent.setProps({ nutrientSelected: 'CHOCOLATELOL' });
  //   expect(renderedComponent.state('activeIndex')).toEqual(1);
  //   // expect(renderedComponent.state('activeIndex')).toEqual(0);
  // });
});
