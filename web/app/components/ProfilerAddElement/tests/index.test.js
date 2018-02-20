import React from 'react';
import { shallow } from 'enzyme';
import ProfilerAddElement from '../index';
import ProfilerAddElementWrapper from '../ProfilerAddElementWrapper';

describe('<ProfilerAddElement />', () => {
  it('should render', () => {
    const props = {
      onHover: () => {},
    };
    const renderedComponent = shallow(
      <ProfilerAddElement {...props} />
    );
    expect(renderedComponent.find(ProfilerAddElementWrapper).length).toEqual(1);
  });
  it('click effect works', () => {
    const onClickSpy = jest.fn();
    const props = {
      onClick: onClickSpy,
    };
    const renderedComponent = shallow(
      <ProfilerAddElement {...props} />
    );
    expect(renderedComponent.find(ProfilerAddElementWrapper).length).toEqual(1);
    renderedComponent.find('button').simulate('click');
    expect(onClickSpy).toHaveBeenCalled();
  });
});
