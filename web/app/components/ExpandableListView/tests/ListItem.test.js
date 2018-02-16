import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import ListItem from '../ListItem';
import ListViewItem from '../ListViewItem';


describe('<ListItem />', () => {
  it('should render a div', () => {
    const listItemProps = {
      isReactComponent: true,
      children: <span />,
    };
    const renderedComponent = shallow(
      <ListItem {...listItemProps} />
    );
    expect(renderedComponent.find(ListViewItem).length).toEqual(1);
  });
  it('renders its children as components', () => {
    const child = (<span />);
    const listItemProps = {
      isReactComponent: true,
      children: child,
    };
    const renderedComponent = shallow(
      <ListItem {...listItemProps} />
    );
    expect(
      renderedComponent.contains(child)
    ).toEqual(true);
  });
  it('renders its children as strings', () => {
    const child = { title: 'child' };
    const listItemProps = {
      isReactComponent: false,
      children: child,
    };
    const renderedComponent = shallow(
      <ListItem {...listItemProps} />
    );
    expect(
      renderedComponent.contains(child.title)
    ).toEqual(true);
  });
});
