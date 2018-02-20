import React from 'react';
import { shallow } from 'enzyme';
// import sinon from 'sinon';
import { getXPosition, getYPosition } from 'lib/utils';
import NutryAnimationOne from '../index';
import NutryAnimationOneWrapper from '../NutryAnimationOneWrapper';

describe('<NutryAnimationOne />', () => {
  it('should render a div', () => {
    const radius = 20;
    const renderedComponent = shallow(
      <NutryAnimationOne />
    );
    expect(renderedComponent.find(NutryAnimationOneWrapper).length).toEqual(1);
    expect(renderedComponent.find('Anime').length).toEqual(4);
    expect(renderedComponent.find('img').length).toEqual(14);
    expect(renderedComponent).toMatchSnapshot();
    expect(renderedComponent.find('Anime').get(2).props.delay(null, 1)).toEqual(240);
    expect(renderedComponent.find('Anime').get(2).props.translateX(null, 1)).toEqual(`${getXPosition(radius, 1)}rem`);
    expect(renderedComponent.find('Anime').get(2).props.translateY(null, 1)).toEqual(`${getYPosition(radius, 1)}rem`);
    expect(renderedComponent.find('Anime').get(3).props.delay(null, 1)).toEqual(440);
    expect(renderedComponent.find('Anime').get(3).props.translateX(null, 1)).toEqual(`${getXPosition(radius, 1)}rem`);
    expect(renderedComponent.find('Anime').get(3).props.translateY(null, 1)).toEqual(`${getYPosition(radius, 1)}rem`);
  });
});
