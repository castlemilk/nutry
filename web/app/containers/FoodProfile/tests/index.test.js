import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import FoodProfile from '../index';

describe('<FoodProfile />', () => {
  it('should render container', () => {
    const renderedComponent = shallow(
      <FoodProfile />
    ).dive();
    expect(renderedComponent.find(FoodProfileWrapper).length).toEqual(1);
  });
});
