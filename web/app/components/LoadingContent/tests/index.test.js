import React from 'react';
import { shallow } from 'enzyme';
import { Progress } from 'antd';

import LoadingContent from '../index';

describe('<LoadingContent />', () => {
  it('display', () => {
    const props = {
      width: 200,
      height: 11,
      speed: 2,
    };
    const renderedComponent = shallow(
      <LoadingContent {...props} />
    );
    expect(renderedComponent.find('div').length).toEqual(1);
    expect(renderedComponent.find(Progress).length).toEqual(1);
    expect(
      renderedComponent.find(Progress).get(0).props().strokeWidth
      ).toEqual(props.height);
  });
});
