import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import ProfilerExpandableList from '../index';
import ListViewHeader from '../ListViewHeader';
import ListHeader from '../ListHeader';
import Wrapper from '../Wrapper';


describe('<ProfilerExpandableList />', () => {
  it('should render a div', () => {
    const props = {
      headerAttName: 'headerName',
      itemsAttName: 'items',
      data: [{ headerName: 'Energy',
        isOpened: true,
        isReactComponent: true,
        height: 210,
        items: [[Object], [Object]] },
      { headerName: 'Fat & Fatty Acids',
        isOpened: true,
        isReactComponent: true,
        height: 210,
        items: [[Object], [Object]] }],
    };
    const renderedComponent = shallow(
      <ProfilerExpandableList {...props} />
    );
    expect(renderedComponent.find(Wrapper).length).toEqual(1);
  });
  it('should toggle open and closed', () => {
    const props = {
      headerAttName: 'headerName',
      itemsAttName: 'items',
      data: [{ headerName: 'Energy',
        isOpened: true,
        isReactComponent: true,
        height: 210,
        items: [[Object], [Object]] },
      { headerName: 'Fat & Fatty Acids',
        isOpened: true,
        isReactComponent: true,
        height: 210,
        items: [[Object], [Object]] }],
    };
    const renderedComponent = shallow(
      <ProfilerExpandableList {...props} />
    );
    const listHeader = renderedComponent.find('Motion').first().dive().find(ListHeader).dive().find(ListViewHeader);
    listHeader.simulate('click', 0);
    expect(renderedComponent.state('data')[0].isOpened).toEqual(false);
  });
});
