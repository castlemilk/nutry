import React from 'react';
import { shallow } from 'enzyme';
// import { IntlProvider } from 'react-intl';

import Banner from '../Banner';
import BannerWrapper from '../BannerWrapper';

describe('<LandingPage />', () => {
  it('should render wrapper', () => {
    const renderedComponent = shallow(
      <Banner />
    );
    expect(renderedComponent.find(BannerWrapper).length).toEqual(1);
  });
});
