import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import ListItemsManager from '../ListItemsManager';
import BodyGroup from '../BodyGroup';


describe('<ListItemManager />', () => {
  it('should render a div for reactComponent children', () => {
    const listItemManagerProps = {
      isReactComponent: true,
      items: [{ key: 'item1' }, { key: 'item2' }],
    };
    const renderedComponent = shallow(
      <ListItemsManager {...listItemManagerProps} />
    );
    expect(renderedComponent.find(BodyGroup).length).toEqual(1);
  });
  it('should render a div for reactComponent children', () => {
    const listItemManagerProps = {
      isReactComponent: false,
      items: [{ title: 'item1' }, { title: 'item2' }],
    };
    const renderedComponent = shallow(
      <ListItemsManager {...listItemManagerProps} />
    );
    expect(renderedComponent.find(BodyGroup).length).toEqual(1);
  });
  it('renders n number of children', () => {
    const listItemManagerProps = {
      isReactComponent: true,
      items: [{ key: 'item1' }, { key: 'item2' }],
    };
    const renderedComponent = shallow(
      <ListItemsManager {...listItemManagerProps} />
    );
    expect(renderedComponent.find(BodyGroup).length).toEqual(1);
    expect(
      renderedComponent.find(BodyGroup).children().length
    ).toEqual(listItemManagerProps.items.length);
  });
});
