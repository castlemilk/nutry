
import expect from 'expect';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import React from 'react';
import ExpandableListView from 'components/ExpandableListView';
import Wrapper from '../Wrapper';
import DetailedCard from '../index';


describe('<DetailedCard />', () => {
  it('should render a div', () => {
    const sections = Map({
      energy: {
        headerName: 'Energy',
        items: [
          {
            prefix: 'ENERC',
            type: 'parent',
            selected: false,
          }, {
            prefix: 'ENERC_KCAL',
            type: 'parent_no_name',
            selected: false,
          }],
      },
      fat: {
        headerName: 'Fat & Fatty Acids',
        items: [
          {
            prefix: 'FAT',
            type: 'parent',
            selected: false,
          }, {
            prefix: 'FASAT',
            type: 'child',
            selected: false,
          },
        ],
      },
    });
    const renderedComponent = shallow(
      <DetailedCard nutrientSections={sections} />
    );
    expect(renderedComponent.find(Wrapper).length).toEqual(1);
    expect(renderedComponent.find(ExpandableListView).length).toEqual(1);
  });
});
