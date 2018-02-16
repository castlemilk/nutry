import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import ExpandableListView from '../index';
import Wrapper from '../Wrapper';


describe('<ExpandableListView />', () => {
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
      <ExpandableListView {...props} />
    );
    expect(renderedComponent.find(Wrapper).length).toEqual(1);
  });
});
