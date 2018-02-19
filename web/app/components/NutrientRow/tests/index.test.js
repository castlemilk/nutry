import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { nutrient, nutrientNoValue, portionSelected } from 'fixtures/foodprofile';

import NutrientRow from '../index';
import {
  HEADER,
  PARENT_NONAME_ROW,
  PARENT_ROW,
  CHILD_ROW,
  CHILD2_ROW,
} from '../constants';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('<NutrientRow />', () => {
  describe('row values', () => {
    it('has no defined value', () => {
      const props = {
        id: 'uuid',
        type: CHILD_ROW,
        prefix: 'CHOCDF',
        nutrient: nutrientNoValue,
        portion: portionSelected,
        isSelected: false,
        onHover: () => {},
        onClick: () => {},
        onInfoClick: () => {},
      };
      const renderedComponent = shallow(
        <NutrientRow {...props} />
      );
      expect(renderedComponent.find('NutrientRow__Row').length).toEqual(1);
      expect(renderedComponent.find('NutrientRow__RowName').length).toEqual(1);
      expect(renderedComponent.find('NutrientRow__RowValue').length).toEqual(1);
      expect(renderedComponent.find('NutrientRow__RowValue').find('span').get(0).props.children).toEqual('~');
    });
    it('has defined value', () => {
      const props = {
        id: 'uuid',
        type: CHILD_ROW,
        prefix: 'CHOCDF',
        nutrient,
        portion: portionSelected,
        isSelected: false,
        onHover: () => {},
        onClick: () => {},
        onInfoClick: () => {},
      };
      const renderedComponent = shallow(
        <NutrientRow {...props} />
      );
      expect(renderedComponent.find('NutrientRow__Row').length).toEqual(1);
      expect(renderedComponent.find('NutrientRow__RowName').length).toEqual(1);
      expect(renderedComponent.find('NutrientRow__RowValue').length).toEqual(1);
      expect(renderedComponent.find('NutrientRow__RowValue').get(0).props.children).toBeGreaterThan(0);
    });
  });
  describe('render types', () => {
    it('header', () => {
      const props = {
        id: 'uuid',
        type: HEADER,
        prefix: 'CHOCDF',
        nutrient,
        portion: portionSelected,
        isSelected: false,
        onHover: () => {},
        onClick: () => {},
        onInfoClick: () => {},
      };
      const renderedComponent = shallow(
        <NutrientRow {...props} />
    );
      expect(renderedComponent.find('NutrientRow__Row').length).toEqual(1);
      expect(renderedComponent.find('NutrientRow__RowName').length).toEqual(1);
    });
    it('parent_no_name', () => {
      const props = {
        id: 'uuid',
        type: PARENT_NONAME_ROW,
        prefix: 'CHOCDF',
        nutrient,
        portion: portionSelected,
        isSelected: false,
        onHover: () => {},
        onClick: () => {},
        onInfoClick: () => {},
      };
      const renderedComponent = shallow(
        <NutrientRow {...props} />
    );
      expect(renderedComponent.find('NutrientRow__Row').length).toEqual(1);
      expect(renderedComponent.find('NutrientRow__RowName').length).toEqual(1);
      expect(renderedComponent.find('NutrientRow__RowUnits').length).toEqual(1);
      expect(renderedComponent.find('NutrientRow__RowValue').length).toEqual(1);
      expect(renderedComponent.find('span').length).toEqual(1);
      expect(renderedComponent.find('span').get(0).props.children).toEqual(' ');
    });
    it('parent_row', () => {
      const props = {
        id: 'uuid',
        type: PARENT_ROW,
        prefix: 'CHOCDF',
        nutrient,
        portion: portionSelected,
        isSelected: false,
        onHover: () => {},
        onClick: () => {},
        onInfoClick: () => {},
      };
      const renderedComponent = shallow(
        <NutrientRow {...props} />
    );
      expect(renderedComponent.find('NutrientRow__Row').length).toEqual(1);
      expect(renderedComponent.find('NutrientRow__RowName').length).toEqual(1);
      expect(renderedComponent.find('NutrientRow__RowUnits').length).toEqual(1);
      expect(renderedComponent.find('NutrientRow__RowValue').length).toEqual(1);
    });
    it('child_row', () => {
      const props = {
        id: 'uuid',
        type: CHILD_ROW,
        prefix: 'CHOCDF',
        nutrient,
        portion: portionSelected,
        isSelected: false,
        onHover: () => {},
        onClick: () => {},
        onInfoClick: () => {},
      };
      const renderedComponent = shallow(
        <NutrientRow {...props} />
    );
      expect(renderedComponent.find('NutrientRow__Row').length).toEqual(1);
      expect(renderedComponent.find('NutrientRow__RowName').length).toEqual(1);
      expect(renderedComponent.find('NutrientRow__RowUnits').length).toEqual(1);
      expect(renderedComponent.find('NutrientRow__RowValue').length).toEqual(1);
    });
    it('child2_row', () => {
      const props = {
        id: 'uuid',
        type: CHILD2_ROW,
        prefix: 'CHOCDF',
        nutrient,
        portion: portionSelected,
        isSelected: false,
        onHover: () => {},
        onClick: () => {},
        onInfoClick: () => {},
      };
      const renderedComponent = shallow(
        <NutrientRow {...props} />
    );
      expect(renderedComponent.find('NutrientRow__Row').length).toEqual(1);
      expect(renderedComponent.find('NutrientRow__RowName').length).toEqual(1);
      expect(renderedComponent.find('NutrientRow__RowUnits').length).toEqual(1);
      expect(renderedComponent.find('NutrientRow__RowValue').length).toEqual(1);
    });
  });
  describe('selecting effects', () => {
    const spy = sinon.spy(NutrientRow.prototype, 'handleMouseOut');
    afterEach(() => {
      spy.resetHistory();
    });
    it('onHover', async () => {
      const onHoverSpy = jest.fn();
      const props = {
        id: 'uuid',
        type: CHILD_ROW,
        prefix: 'CHOCDF',
        nutrient,
        portion: portionSelected,
        isSelected: false,
        onHover: onHoverSpy,
        onClick: () => {},
        onInfoClick: () => {},
      };
      const renderedComponent = shallow(
        <NutrientRow {...props} />
    );
      const row = renderedComponent.find('NutrientRow__Row');
      row.simulate('mouseEnter', 'CHOCDF', 'uuid');
      await sleep(200);
      expect(renderedComponent.state('selectedPrefix')).toBe('CHOCDF');
      expect(onHoverSpy).toHaveBeenCalled();
    });
    it('onMouseLeave quickly', async () => {
      const onHoverSpy = jest.fn();
      // const spy = sinon.spy(NutrientRow.prototype, 'handleMouseOut');
      const props = {
        id: 'uuid',
        type: CHILD_ROW,
        prefix: 'CHOCDF',
        nutrient,
        portion: portionSelected,
        isSelected: false,
        onHover: onHoverSpy,
        onClick: () => {},
        onInfoClick: () => {},
      };
      const renderedComponent = shallow(
        <NutrientRow {...props} />
    );
      const row = renderedComponent.find('NutrientRow__Row');
      row.simulate('mouseEnter', 'CHOCDF', 'uuid');
      await sleep(20);
      row.simulate('mouseLeave', 'CHOCDF', 'uuid');
      expect(spy.calledOnce).toEqual(true);
      expect(renderedComponent.state('selectedPrefix')).toBe('CHOCDF');
      expect(onHoverSpy).not.toHaveBeenCalled();
    });
    it('onMouseLeave slowly', async () => {
      const onHoverSpy = jest.fn();

      const props = {
        id: 'uuid',
        type: CHILD_ROW,
        prefix: 'CHOCDF',
        nutrient,
        portion: portionSelected,
        isSelected: false,
        onHover: onHoverSpy,
        onClick: () => {},
        onInfoClick: () => {},
      };
      const renderedComponent = shallow(
        <NutrientRow {...props} />
    );
      const row = renderedComponent.find('NutrientRow__Row');
      row.simulate('mouseEnter', 'CHOCDF', 'uuid');
      await sleep(200);
      row.simulate('mouseLeave', 'CHOCDF', 'uuid');
      expect(spy.calledOnce).toEqual(true);
      expect(renderedComponent.state('selectedPrefix')).toBe('CHOCDF');
      expect(onHoverSpy).toHaveBeenCalled();
    });
    it('onClick', () => {
      const onClickSpy = jest.fn();

      const props = {
        id: 'uuid',
        type: CHILD_ROW,
        prefix: 'CHOCDF',
        nutrient,
        portion: portionSelected,
        isSelected: false,
        onHover: () => {},
        onClick: onClickSpy,
        onInfoClick: () => {},
      };
      const renderedComponent = shallow(
        <NutrientRow {...props} />
    );
      renderedComponent.find('NutrientRow__Row').simulate('click', 'CHOCDF', 'uuid');
      expect(onClickSpy).toHaveBeenCalled();
    });
    it('onInfoClick', () => {
      const onInfoClickSpy = jest.fn();

      const props = {
        id: 'uuid',
        type: CHILD_ROW,
        prefix: 'CHOCDF',
        nutrient,
        portion: portionSelected,
        isSelected: true,
        onHover: () => {},
        onClick: () => {},
        onInfoClick: onInfoClickSpy,
      };
      const renderedComponent = shallow(
        <NutrientRow {...props} />
    );
      expect(renderedComponent.find('FaInfoCircle').length).toEqual(1);
      renderedComponent.find('FaInfoCircle').simulate('click');
      expect(onInfoClickSpy).toHaveBeenCalled();
    });
  });
});
