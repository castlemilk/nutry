import React from 'react';
import { fromJS } from 'immutable';
import { mount } from 'enzyme';
import configureStore from 'configureStore';
import createHistory from 'history/createBrowserHistory';
import { INITIAL_STATE } from 'containers/FoodProfile/constants';
import NutrientProfilePieChart from 'components/NutrientProfilePieChart';
import NutrientProfilePieChartView from '../index';

describe('<NutrientProfilePieChartView />', () => {
  it('should render wrapper', () => {
    const initialState = fromJS({
      foodProfile: INITIAL_STATE,
    });
    // TODO: work out how to correctly test a connected component in this scenario
    const history = createHistory();
    const store = configureStore(initialState, history);
    const renderedComponent = mount(
      <NutrientProfilePieChartView store={store} />
    );
    expect(renderedComponent.find(NutrientProfilePieChart).length).toEqual(1);
  });
});
