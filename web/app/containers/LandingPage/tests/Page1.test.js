import React from 'react';
import { shallow } from 'enzyme';
// import { IntlProvider } from 'react-intl';

import Page1 from '../Page1';
import Page1Wrapper from '../Page1Wrapper';

describe('<Page1 />', () => {
  it('should render wrapper', () => {
    const renderedComponent = shallow(
      <Page1 />
    );
    expect(renderedComponent.find(Page1Wrapper).length).toEqual(1);
  });
});
