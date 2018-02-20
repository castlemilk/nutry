import React from 'react';
import { shallow } from 'enzyme';
import NutryArchitecture from '../index';
import NutryArchitectureWrapper from '../NutryArchitectureWrapper';

describe('<NutryArchitecture />', () => {
  it('should render', () => {
    const props = {
      onHover: () => {},
    };
    const renderedComponent = shallow(
      <NutryArchitecture {...props} />
    );
    expect(renderedComponent.find(NutryArchitectureWrapper).length).toEqual(1);
  });
  it('should enable hover effect', () => {
    const onHoverSpy = jest.fn();
    const props = {
      onHover: onHoverSpy,
    };
    const renderedComponent = shallow(
      <NutryArchitecture {...props} />
    );
    expect(renderedComponent.find(NutryArchitectureWrapper).length).toEqual(1);
    renderedComponent.find('img').first().simulate('mouseOver');
    expect(onHoverSpy).toHaveBeenCalled();
    renderedComponent.find('img').first().simulate('focus');
    expect(onHoverSpy.mock.calls.length).toEqual(2);
  });
});
