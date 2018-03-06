import React from 'react';
import { shallow } from 'enzyme';
// import { IntlProvider } from 'react-intl';

import Header from '../Header';
import HeaderWrapper from '../HeaderWrapper';

describe('<LandingPage />', () => {
  it('should render wrapper', () => {
    const renderedComponent = shallow(
      <Header />
    );
    expect(renderedComponent.find(HeaderWrapper).length).toEqual(1);
  });
});
