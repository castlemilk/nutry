import React from 'react';
import { shallow } from 'enzyme';

import CodeEditor from '../index';

describe('<CodeEditor />', () => {
  it('should render a div', () => {
    const renderedComponent = shallow(
      <CodeEditor />
    );
    expect(renderedComponent.find('div').length).toEqual(1);
  });
});
