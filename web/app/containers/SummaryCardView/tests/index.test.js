import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import SUmmaryCardView from '../index';

describe('<SUmmaryCardView />', () => {
  it('should render container', () => {
    const renderedComponent = shallow(
      <SUmmaryCardView />
    );
    expect(renderedComponent.find(Route).length).toEqual(1);
  });
});
