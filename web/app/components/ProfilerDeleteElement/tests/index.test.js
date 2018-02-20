import React from 'react';
import { shallow } from 'enzyme';
import ProfilerDeleteElement from '../index';
import ProfilerDeleteElementWrapper from '../ProfilerDeleteElementWrapper';

describe('<ProfilerAddElement />', () => {
  it('should render', () => {
    const props = {
      onHover: () => {},
    };
    const renderedComponent = shallow(
      <ProfilerDeleteElement {...props} />
    );
    expect(renderedComponent.find(ProfilerDeleteElementWrapper).length).toEqual(1);
  });
  it('click effect works', () => {
    const onClickSpy = jest.fn();
    const props = {
      onClick: onClickSpy,
    };
    const renderedComponent = shallow(
      <ProfilerDeleteElement {...props} />
    );
    expect(renderedComponent.find(ProfilerDeleteElementWrapper).length).toEqual(1);
    renderedComponent.find('button').simulate('click');
    expect(onClickSpy).toHaveBeenCalled();
  });
});
