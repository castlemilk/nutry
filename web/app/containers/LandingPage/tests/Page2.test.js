import React from 'react';
import { shallow } from 'enzyme';
// import { IntlProvider } from 'react-intl';
import NutryArchitecture from 'components/NutryArchitecture';

import Page2 from '../Page2';
import Page2Wrapper from '../Page2Wrapper';

describe('<Page2 />', () => {
  it('should render wrapper', () => {
    const renderedComponent = shallow(
      <Page2 />
    );
    expect(renderedComponent.find(Page2Wrapper).length).toEqual(1);
  });
  it('should render wrapper', () => {
    const renderedComponent = shallow(
      <Page2 />
    );
    const architecture = renderedComponent.find(NutryArchitecture);
    const architectureImg = architecture.dive().find('img').last();
    architectureImg.simulate('mouseEnter');
    architectureImg.simulate('focus');
    architectureImg.simulate('click');
    expect(renderedComponent.state('architectureHovering')).toEqual('architectureAPI');
  });
});
