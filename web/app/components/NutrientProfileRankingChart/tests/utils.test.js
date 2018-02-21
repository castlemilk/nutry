import { Map } from 'immutable';
import { CustomShape, CustomTooltip, processData, xLabel } from '../utils';

describe('utils', () => {
  describe('CustomShape()', () => {
    it('renders correct custom shape', () => {
      const props = {
        fillActive: '#50c59f',
        foodID: '13337',
        width: 220.2362304194038,
        height: 45,
        name: 'braised beef thymus',
        id: '13338',
        value: 52.83,
        unit: 'g',
        fill: '#9a57eb',
        x: 140,
        y: 312.3333333333333,
        payload: { name: 'braised beef thymus', id: '13338', value: 52.83, unit: 'g', fill: '#9a57eb' },
        background: { x: 140, y: 312.3333333333333, width: 330, height: 45 },
        index: 4,
      };
      const customShape = CustomShape(props);
      expect(customShape).toMatchSnapshot();
    });
    it('renders correct custom shape different radius', () => {
      const props = {
        fillActive: '#50c59f',
        foodID: '13337',
        width: 220.2362304194038,
        height: 45,
        name: 'braised beef thymus',
        id: '13338',
        value: 52.83,
        unit: 'g',
        fill: '#9a57eb',
        x: 140,
        y: 312.3333333333333,
        payload: { name: 'braised beef thymus', id: '13338', value: 52.83, unit: 'g', fill: '#9a57eb' },
        background: { x: 140, y: 312.3333333333333, width: 330, height: 45 },
        index: 4,
        radius: 10,
      };
      const customShape = CustomShape(props);
      expect(customShape).toMatchSnapshot();
    });
    it('renders correct custom shape radius array', () => {
      const props = {
        fillActive: '#50c59f',
        foodID: '13337',
        width: 220.2362304194038,
        height: 45,
        name: 'braised beef thymus',
        id: '13338',
        value: 52.83,
        unit: 'g',
        fill: '#9a57eb',
        x: 140,
        y: 312.3333333333333,
        payload: { name: 'braised beef thymus', id: '13338', value: 52.83, unit: 'g', fill: '#9a57eb' },
        background: { x: 140, y: 312.3333333333333, width: 330, height: 45 },
        index: 4,
        radius: [1, 2, 3, 4],
      };
      const customShape = CustomShape(props);
      expect(customShape).toMatchSnapshot();
    });
    it('renders correct custom shape radius array that is negative', () => {
      const props = {
        fillActive: '#50c59f',
        foodID: '13337',
        width: 220.2362304194038,
        height: 45,
        name: 'braised beef thymus',
        id: '13338',
        value: 52.83,
        unit: 'g',
        fill: '#9a57eb',
        x: 140,
        y: 312.3333333333333,
        payload: { name: 'braised beef thymus', id: '13338', value: 52.83, unit: 'g', fill: '#9a57eb' },
        background: { x: 140, y: 312.3333333333333, width: 330, height: 45 },
        index: 4,
        radius: [-1, -1, -1, -1],
      };
      const customShape = CustomShape(props);
      expect(customShape).toMatchSnapshot();
    });
    it('renders correct custom shape radius array is large', () => {
      const props = {
        fillActive: '#50c59f',
        foodID: '13337',
        width: 220.2362304194038,
        height: 45,
        name: 'braised beef thymus',
        id: '13338',
        value: 52.83,
        unit: 'g',
        fill: '#9a57eb',
        x: 140,
        y: 312.3333333333333,
        payload: { name: 'braised beef thymus', id: '13338', value: 52.83, unit: 'g', fill: '#9a57eb' },
        background: { x: 140, y: 312.3333333333333, width: 330, height: 45 },
        index: 4,
        radius: [50, 50, 50, 50],
      };
      const customShape = CustomShape(props);
      expect(customShape).toMatchSnapshot();
    });
    it('renders correct custom shape negative height', () => {
      const props = {
        fillActive: '#50c59f',
        foodID: '13337',
        width: 220.2362304194038,
        height: -1,
        name: 'braised beef thymus',
        id: '13338',
        value: 52.83,
        unit: 'g',
        fill: '#9a57eb',
        x: 140,
        y: 312.3333333333333,
        payload: { name: 'braised beef thymus', id: '13338', value: 52.83, unit: 'g', fill: '#9a57eb' },
        background: { x: 140, y: 312.3333333333333, width: 330, height: 45 },
        index: 4,
        radius: [-1, -1, -1, -1],
      };
      const customShape = CustomShape(props);
      expect(customShape).toMatchSnapshot();
    });
    it('renders correct custom shape negative height', () => {
      const props = {
        fillActive: '#50c59f',
        foodID: '13337',
        width: 220.2362304194038,
        height: -1,
        name: 'braised beef thymus',
        id: '13338',
        value: 52.83,
        unit: 'g',
        fill: '#9a57eb',
        x: 140,
        y: 312.3333333333333,
        payload: { name: 'braised beef thymus', id: '13338', value: 52.83, unit: 'g', fill: '#9a57eb' },
        background: { x: 140, y: 312.3333333333333, width: 330, height: 45 },
        index: 4,
        radius: [-1, -1, -1, -1],
      };
      const customShape = CustomShape(props);
      expect(customShape).toMatchSnapshot();
    });
    it('renders correct custom shape when barId == foodID (i.e active)', () => {
      const props = {
        fillActive: '#50c59f',
        foodID: '13337',
        width: 220.2362304194038,
        height: 45,
        name: 'braised beef thymus',
        id: '13337',
        value: 52.83,
        unit: 'g',
        fill: '#9a57eb',
        x: 140,
        y: 312.3333333333333,
        payload: { name: 'braised beef thymus', id: '13337', value: 52.83, unit: 'g', fill: '#9a57eb' },
        background: { x: 140, y: 312.3333333333333, width: 330, height: 45 },
        index: 4,
      };
      const customShape = CustomShape(props);
      expect(customShape.props.fill).toEqual('#50c59f');
      expect(customShape).toMatchSnapshot();
    });
  });
  describe('CustomTooltip()', () => {
    it('renders correct tooltip', () => {
      const props = {
        active: true,
        nutrientSelected: 'Protien',
        portionSelected: { unit: 'per 100g', value: 100, className: 'per100g', label: 'per 100g', amt: 1 },
        foodID: '13337',
        payload: [
          {
            color: null,
            dataKey: 'value',
            name: 'value',
            payload: {
              fill: '#663a9d',
              id: '17219',
              name: 'braised veal thymus',
              unit: 'g',
              value: 22.67,
            },
          },
        ],
      };
      const customTooltip = CustomTooltip(props);
      expect(customTooltip).toMatchSnapshot();
    });
    it('renders when no info in payload', () => {
      const props = {
        active: true,
        nutrientSelected: 'Protien',
        portionSelected: { unit: 'per 100g', value: 100, className: 'per100g', label: 'per 100g', amt: 1 },
        foodID: '13337',
        payload: [
          {
            color: null,
            dataKey: 'value',
            name: 'value',
            payload: {
              fill: null,
              id: null,
              name: null,
              unit: null,
              value: null,
            },
          },
        ],
      };
      const customTooltip = CustomTooltip(props);
      expect(customTooltip).toMatchSnapshot();
    });
    it('renders correct tooltip when foodId == id', () => {
      const props = {
        active: true,
        nutrientSelected: 'Protien',
        portionSelected: { unit: 'per 100g', value: 100, className: 'per100g', label: 'per 100g', amt: 1 },
        foodID: '13337',
        id: '13337',
        payload: [
          {
            color: null,
            dataKey: 'value',
            name: 'value',
            payload: {
              fill: '#663a9d',
              id: '13337',
              name: 'braised veal thymus',
              unit: 'g',
              value: 22.67,
            },
          },
        ],
      };
      const customTooltip = CustomTooltip(props);
      expect(customTooltip).toMatchSnapshot();
    });
    it('renders correct when no payload', () => {
      const props = {
        active: true,
        nutrientSelected: 'Protien',
        portionSelected: { unit: 'per 100g', value: 100, className: 'per100g', label: 'per 100g', amt: 1 },
        foodID: '13337',
        id: '13337',
        payload: null,
      };
      const customTooltip = CustomTooltip(props);
      expect(customTooltip).toMatchSnapshot();
    });
    it('renders correct when no active=false', () => {
      const props = {
        active: false,
        nutrientSelected: 'Protien',
        portionSelected: { unit: 'per 100g', value: 100, className: 'per100g', label: 'per 100g', amt: 1 },
        foodID: '13337',
        id: '13337',
        payload: null,
      };
      const customTooltip = CustomTooltip(props);
      expect(customTooltip).toEqual(null);
    });
  });
  describe('xLabel()', () => {
    it('xLabel is correct', () => {
      const nutrient = { prefix: 'WATER', value: 52.83, unit: 'g' };
      const xLabelString = xLabel(nutrient.prefix);
      expect(xLabelString).toEqual('Water [g]');
    // console.log(activeShape.props.children[6]);
    });
  });
  describe('processData()', () => {
    it('handles rawdata undefined', () => {
      const data = null;
      const nutrientSelected = null;
      const portionSelected = null;
      expect(processData(data, nutrientSelected, portionSelected)).toEqual([]);
    // console.log(activeShape.props.children[6]);
    });
    it('handles no raw data', () => {
      const data = [];
      const nutrientSelected = null;
      const portionSelected = null;
      expect(processData(data, nutrientSelected, portionSelected)).toEqual([]);
    // console.log(activeShape.props.children[6]);
    });
    it('handles no raw data', () => {
      const data = Map({
        ALA: [],
        ARG: [],
        CA: [
          Map({ name: 'raw beef thymus', id: '13337', value: 7, unit: 'mg' }),
          Map({ name: 'braised beef thymus', id: '13338', value: 10, unit: 'mg' }),
          Map({ name: 'Raw veal thymus', id: '17218', value: 3, unit: 'mg' }),
          Map({ name: 'braised veal thymus', id: '17219', value: 4, unit: 'mg' }),
          Map({ name: 'Fresh thyme', id: '02049', value: 405, unit: 'mg' }),
          Map({ name: 'Dried thyme', id: '02042', value: 1890, unit: 'mg' }),
        ],
      });
      const nutrientSelected = 'CHOCOLATE';
      const portionSelected = null;
      expect(processData(data, nutrientSelected, portionSelected)).toEqual([]);
    });
    it('handles processing data when found', () => {
      const data = Map({
        ALA: [],
        ARG: [],
        CA: [
          Map({ name: 'raw beef thymus', id: '13337', value: 7, unit: 'mg' }),
          Map({ name: 'braised beef thymus', id: '13338', value: 10, unit: 'mg' }),
          Map({ name: 'Raw veal thymus', id: '17218', value: 3, unit: 'mg' }),
          Map({ name: 'braised veal thymus', id: '17219', value: 4, unit: 'mg' }),
          Map({ name: 'Fresh thyme', id: '02049', value: 405, unit: 'mg' }),
          Map({ name: 'Dried thyme', id: '02042', value: 1890, unit: 'mg' }),
        ],
      });
      const nutrientSelected = 'CA';
      const portionSelected = {
        amt: 1,
        className: 'per100g',
        g: 100,
        label: 'per 100g',
        unit: 'per 100g',
        value: 100,
      };
      expect(processData(data, nutrientSelected, portionSelected).length).toEqual(6);
    });
    it('handles processing data nutrient has non number value', () => {
      const data = Map({
        ALA: [],
        ARG: [],
        CA: [
          Map({ name: 'raw beef thymus', id: '13337', value: 'NA', unit: 'mg' }),
          Map({ name: 'braised beef thymus', id: '13338', value: 'NA', unit: 'mg' }),
          Map({ name: 'Raw veal thymus', id: '17218', value: 'NA', unit: 'mg' }),
          Map({ name: 'braised veal thymus', id: '17219', value: 4, unit: 'mg' }),
          Map({ name: 'Fresh thyme', id: '02049', value: 405, unit: 'mg' }),
          Map({ name: 'Dried thyme', id: '02042', value: 1890, unit: 'mg' }),
        ],
      });
      const nutrientSelected = 'CA';
      const portionSelected = {
        amt: 1,
        className: 'per100g',
        g: 100,
        label: 'per 100g',
        unit: 'per 100g',
        value: 100,
      };
      expect(processData(data, nutrientSelected, portionSelected).length).toEqual(6);
    });
  });
});
