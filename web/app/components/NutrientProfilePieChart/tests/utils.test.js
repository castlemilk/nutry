import { renderActiveShape } from '../utils';

describe('utils', () => {
  it('renders active shape with high midAngle', () => {
    const props = {
      cornerRadius: undefined,
      cx: 295,
      cy: 155,
      endAngle: 185.81728361136155,
      fill: '#00C49F',
      innerRadius: 60,
      maxRadius: 328.70959827787203,
      midAngle: 183.69979524334542,
      middleRadius: 70,
      name: 'Sugar Total',
      outerRadius: 80,
      paddingAngle: 0,
      payload: {
        prefix: 'SUGAR',
        name: 'Sugar Total',
        payload: {
          units: 'g',
          value: 1,
          rdi: 31.764705882352942 },
        stroke: '#fff',
        fill: '#00C49F' },
      percent: 0.013466687667349188,
      prefix: 'SUGAR',
      rdi: 31.764705882352942,
      startAngle: 180.97725992552105,
      stroke: '#fff',
      tooltipPayload: [],
      tooltipPosition: { x: 225.14589057815618, y: 159.51701194165665 },
      units: 'g',
      value: 1,
    };
    const activeShape = renderActiveShape(props);
    expect(activeShape.props.children.length).toEqual(7);
  });
  it('renders active shape with low midAngle', () => {
    const props = {
      cornerRadius: undefined,
      cx: 295,
      cy: 155,
      endAngle: 185.81728361136155,
      fill: '#00C49F',
      innerRadius: 60,
      maxRadius: 328.70959827787203,
      midAngle: 40,
      middleRadius: 70,
      name: 'Sugar Total',
      outerRadius: 80,
      paddingAngle: 0,
      payload: {
        prefix: 'SUGAR',
        name: 'Sugar Total',
        rdi: 31.764705882352942,
        units: 'g',
        value: 1,
        stroke: '#fff',
        fill: '#00C49F' },
      percent: 0.013466687667349188,
      prefix: 'SUGAR',
      rdi: 31.764705882352942,
      startAngle: 180.97725992552105,
      stroke: '#fff',
      tooltipPayload: [],
      tooltipPosition: { x: 225.14589057815618, y: 159.51701194165665 },
      units: 'g',
      value: 1,
    };
    const activeShape = renderActiveShape(props);
    expect(activeShape.props.children.length).toEqual(7);
    // console.log(activeShape.props.children[6]);
  });
  it('renders active shape with empty value', () => {
    const props = {
      cornerRadius: undefined,
      cx: 295,
      cy: 155,
      endAngle: 185.81728361136155,
      fill: '#00C49F',
      innerRadius: 60,
      maxRadius: 328.70959827787203,
      midAngle: 40,
      middleRadius: 70,
      name: 'Sugar Total',
      outerRadius: 80,
      paddingAngle: 0,
      payload: {
        prefix: 'SUGAR',
        name: 'Sugar Total',
        rdi: 31.764705882352942,
        units: 'g',
        value: '~',
        stroke: '#fff',
        fill: '#00C49F' },
      percent: 0.013466687667349188,
      prefix: 'SUGAR',
      startAngle: 180.97725992552105,
      stroke: '#fff',
      tooltipPayload: [],
      tooltipPosition: { x: 225.14589057815618, y: 159.51701194165665 },
      units: 'g',
      value: '~',
    };
    const activeShape = renderActiveShape(props);
    expect(activeShape.props.children.length).toEqual(7);
    // console.log(activeShape.props.children[6]);
  });
});
