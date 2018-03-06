import React from 'react';
import { shallow } from 'enzyme';
// import { IntlProvider } from 'react-intl';

import Page3 from '../Page3';
import Page3Wrapper from '../Page3Wrapper';

describe('<Page3 />', () => {
  it('should render wrapper', () => {
    const renderedComponent = shallow(
      <Page3 />
    );
    expect(renderedComponent.find(Page3Wrapper).length).toEqual(1);
  });
});
