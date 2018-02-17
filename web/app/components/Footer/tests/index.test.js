import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../index';
import FooterWrapper from '../FooterWrapper';

describe('<Footer />', () => {
  it('display', () => {
    const renderedComponent = shallow(
      <Footer />
    );
    expect(renderedComponent.find(FooterWrapper).length).toEqual(1);
  });
});
