import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import ListHeader from '../ListHeader';
import ListViewHeader from '../ListViewHeader';


describe('<ListHeader />', () => {
  it('should render a div', () => {
    const onClickSpy = jest.fn();
    const listHeaderProps = {
      header: 'someHeader',
      headerIndex: 0,
      handleToggle: onClickSpy,
    };
    const renderedComponent = shallow(
      <ListHeader {...listHeaderProps} />
    );
    expect(renderedComponent.find(ListViewHeader).length).toEqual(1);
  });
  it('handles clicks', () => {
    const onClickSpy = jest.fn();
    const listHeaderProps = {
      header: 'someHeader',
      headerIndex: 0,
      handleToggle: onClickSpy,
    };
    const renderedComponent = shallow(
      <ListHeader {...listHeaderProps} />
    );
    expect(renderedComponent.state('isOpened')).toEqual(true);
    renderedComponent.find(ListViewHeader).simulate('click');
    expect(onClickSpy).toHaveBeenCalled();
    expect(renderedComponent.state('isOpened')).toEqual(false);
    renderedComponent.find(ListViewHeader).simulate('click');
    expect(renderedComponent.state('isOpened')).toEqual(true);
  });
});
