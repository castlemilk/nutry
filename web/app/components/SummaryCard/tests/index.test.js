
import expect from 'expect';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import React from 'react';

import { SUMMARY_IDS } from 'containers/FoodProfile/constants';
import NutrientRowView from 'containers/NutrientRowView';
import Wrapper from '../Wrapper';
import SummaryCard from '../index';


describe('<SummaryCard />', () => {
  it('should render a div', () => {
    const renderedComponent = shallow(
      <SummaryCard nutrientIds={fromJS(SUMMARY_IDS)} />
    );
    expect(renderedComponent.find(Wrapper).length).toEqual(1);
    expect(renderedComponent.find(NutrientRowView).length).toEqual(SUMMARY_IDS.length);
  });
});
