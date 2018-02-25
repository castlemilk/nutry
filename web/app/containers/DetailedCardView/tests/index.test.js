import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import DetailedCardView from '../index';

describe('<DetailedCardView />', () => {
  it('should render container', () => {
    const renderedComponent = shallow(
      <DetailedCardView />
    );
    expect(renderedComponent.find(Route).length).toEqual(1);
  });
});
