import React from 'react';
import { shallow } from 'enzyme';
// import sinon from 'sinon';

import NutryAnimationOne from '../index';
import NutryAnimationOneWrapper from '../NutryAnimationOneWrapper';

describe('<NutryAnimationOne />', () => {
  it('should render a div', () => {
    const renderedComponent = shallow(
      <NutryAnimationOne />
    );
    console.log(renderedComponent.debug());
    expect(renderedComponent.find(NutryAnimationOneWrapper).length).toEqual(1);
    expect(renderedComponent.find('Anime').length).toEqual(4);
    expect(renderedComponent.find('img').length).toEqual(14);
    expect(renderedComponent).toMatchSnapshot();
    // console.log(renderedComponent.find('Anime').get(3).props.delay);
  });
});
