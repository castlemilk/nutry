/**
*
* NutrientProfilePieChart
*
*/

import React from 'react';
import { PieChart, Pie, Sector } from 'recharts';
import { Spin, Icon } from 'antd';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import LoadingContent from 'components/LoadingContent';
import messages from './messages';
import NutrientProfilePieChartWrapper from './NutrientProfilePieChartWrapper';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a94442', '#c566ac'];


const renderActiveShape = (props) => { /* eslint react/prop-types: 0 */
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
                  fill, payload } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + ((outerRadius + 10) * cos);
  const sy = cy + ((outerRadius + 10) * sin);
  const mx = cx + ((outerRadius + 30) * cos);
  const my = cy + ((outerRadius + 30) * sin);
  const ex = mx + ((cos >= 0 ? 1 : -1) * 22);
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
      <text x={ex + ((cos >= 0 ? 1 : -1) * 12)} y={ey} dy={-18} textAnchor={textAnchor} fill={fill}>{payload.name}</text>
      <text x={ex + ((cos >= 0 ? 1 : -1) * 12)} y={ey} textAnchor={textAnchor} fill="#333">{`${payload.value} ${payload.units}`}</text>
      <text x={ex + ((cos >= 0 ? 1 : -1) * 12)} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`( ${((payload.value / payload.rdi) * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};
/**
 * Return the index with the largest value. This index will then be used
 * to set as the default section selected in the recharts graphic on render.
 * @param  {Array} data list of nutrients
 * @return {Number} index with highest value.
 */
function getIndexLargestValue(data) {
  return data.reduce((a, b, index) => b.value > a[0] ? [b.value, index] : a, [-1, -1])[1];
}
class NutrientProfilePieChart extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: this.props.pieData && !this.props.loading ? getIndexLargestValue(this.props.pieData) : 0,
    };
  }

  onPieEnter(data, index) {
    this.setState({
      activeIndex: index,
    });
  }
  // onFinishedLoading() {
  //   this.setState({
  //     activeIndex: getIndexLargestValue(this.props.pieData),
  //   });
  // }
  render() {
    const { pieData, loading } = this.props;
    // if (!loading && pieData) {
    //   this.onFinishedLoading();
    // }
    const pieDataColored = loading ? null : pieData.map((value, index) => {
      const section = value;
      section.fill = COLORS[index % COLORS.length];
      return value;
    });
    const loadingPie = <Spin style={{ marginTop: '100px' }} indicator={<Icon type="loading" style={{ fontSize: 40 }} spin />} />;
    return (
      <NutrientProfilePieChartWrapper>
        <div className="pie-chart-title" >
          { loading ? <LoadingContent width={300} height={30} speed={1.5} /> : <FormattedMessage {...messages.chartTitle} /> }
        </div>
        <div className="pie-chart-wrapper" >
          { loading ? loadingPie : (
            <PieChart width={600} height={300}>
              <Pie
                activeIndex={getIndexLargestValue(this.props.pieData)}
                activeShape={renderActiveShape}
                data={pieDataColored}
                dataKey="value"
                cx={270}
                cy={150}
                baseValue={100}
                innerRadius={60}
                outerRadius={80}
                onMouseEnter={(d, i) => this.onPieEnter(d, i)}
              />
            </PieChart>)}
        </div>
      </NutrientProfilePieChartWrapper>
    );
  }
}

NutrientProfilePieChart.propTypes = {
  pieData: PropTypes.array,
  loading: PropTypes.bool,
};

export default NutrientProfilePieChart;