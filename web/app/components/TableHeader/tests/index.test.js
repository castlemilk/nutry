
import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

import Table from '../Table';
import Header from '../Header';
import RowName from '../RowName';
import RowUnits from '../RowUnits';
import RowValue from '../RowValue';
import TableHeader from '../index';


describe('<TableHeader />', () => {
  it('should render a div', () => {
    const renderedComponent = shallow(
      <TableHeader />
    );
    expect(renderedComponent.find(Table).length).toEqual(1);
    expect(renderedComponent.find(Header).length).toEqual(1);
    expect(renderedComponent.find(RowName).length).toEqual(1);
    expect(renderedComponent.find(RowUnits).length).toEqual(1);
    expect(renderedComponent.find(RowValue).length).toEqual(1);
  });
});
