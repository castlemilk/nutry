/**
*
* NutrientProfilePieChart
*
*/

import React from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import NutrientProfilePieChartWrapper from './NutrientProfilePieChartWrapper';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a94442', '#c566ac'];
const data = [{ name: 'GroupGroupGroupGroupGroup A', value: 400 }, { name: 'Group B', value: 300 },
              { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 }];


const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
                  fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={payload.fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={payload.fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={-18} textAnchor={textAnchor} fill={fill}>{payload.name}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${payload.value} ${payload.units}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`( ${((payload.value / payload.rdi) * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};
class NutrientProfilePieChart extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  onPieEnter(data, index) {
    console.log('onPieEnter');
    this.setState({
      activeIndex: index,
    });
  }
  render() {
    const { pieData } = this.props;
    console.log(pieData);
    const pieDataColored = pieData.map((entry, index) => {
      pieData[index].fill = COLORS[index % COLORS.length];
      return entry;
    });
    return (
      <NutrientProfilePieChartWrapper>
        <PieChart width={600} height={400}>
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={pieData}
            dataKey="value"
            cx={300}
            cy={200}
            baseValue={100}
            innerRadius={60}
            outerRadius={80}
            onMouseEnter={(d, i) => this.onPieEnter(d, i)}
          />
        </PieChart>
      </NutrientProfilePieChartWrapper>
    );
  }
}

NutrientProfilePieChart.propTypes = {
  pieData: PropTypes.array.isRequired,
};

export default NutrientProfilePieChart;
