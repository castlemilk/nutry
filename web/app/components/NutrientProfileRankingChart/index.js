/**
*
* NutrientProfilePieChart
*
*/

import React from 'react';
import { Sector, Bar, BarChart, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Spin, Icon } from 'antd';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import LoadingContent from 'components/LoadingContent';
import { getFilteredData } from 'lib/nutrientAnalytics';
import messages from './messages';
import NutrientProfileRankingWrapper from './NutrientProfileRankingChartWrapper';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a94442', '#c566ac'];
const data = [{ name: 'Page A', uv: 590, pv: 800, amt: 1400 },
              { name: 'Page B', uv: 868, pv: 967, amt: 1506 },
              { name: 'Page C', uv: 1397, pv: 1098, amt: 989 },
              { name: 'Page D', uv: 1480, pv: 1200, amt: 1228 },
              { name: 'Page E', uv: 1520, pv: 1108, amt: 1100 },
              { name: 'Page F', uv: 1400, pv: 680, amt: 1700 }];

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
        {payload.value !== '~' ? `( ${((payload.value / payload.rdi) * 100).toFixed(2)}%)` : ' (NA) '}
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
  return data.reduce((a, b, index) => (b.value > a[0] && typeof b.value === 'number') ? [b.value, index] : a, [-1, -1])[1];
}
/**
 * Determine the index corresponding to the specified nutrient. This will be
 * used to update the pie chart selected section to the hovered/select nutrient
 * @param  {Object} nutrient [description]
 * @param  {Array} pieData  [description]
 * @return {Number}          [description]
 */
function nutrientToIndex(prefix, data) {
  const index = data.findIndex((x) => x.prefix === prefix);
  if (index === -1) {
    return null;
  }
  if (data[index].value === '~') {
    return null;
  }
  return index;
}
class NutrientProfileRankingChart extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: !this.props.loading ? getIndexLargestValue(data) : 0,
    };
  }

  componentWillMount() {
    if (!this.props.loading) {
      this.onFinishedLoading();
    }
  }
  componentDidMount() {
    this.props.onLoadRankings();
  }


  // onPieEnter(data, index) {
  //   this.setState({
  //     activeIndex: index,
  //   });
  // }
  onFinishedLoading() {
  }

  render() {
    const { loading } = this.props;
    const loadingPie = <Spin style={{ marginTop: '160px' }} indicator={<Icon type="loading" style={{ fontSize: 40 }} spin />} />;
    return (
      <NutrientProfileRankingWrapper>
        <div className="pie-chart-title" >
          { loading ? <LoadingContent width={300} height={30} speed={1.5} /> : <FormattedMessage {...messages.chartTitle} /> }
        </div>
        <div className="ranking-chart-wrapper" >
          { loading ? loadingPie : (
            <ComposedChart layout="vertical" width={700} height={300} data={data} margin={{ top: 20, right: 80, bottom: 20, left: 20 }}>
              <XAxis />
              <YAxis dataKey="name" type="category" label="Pages" />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
            </ComposedChart>)
        }
        </div>
      </NutrientProfileRankingWrapper>
    );
  }
}

NutrientProfileRankingChart.propTypes = {
  onLoadRankings: PropTypes.func.isRequired,
  rankingResults: PropTypes.object,
  nutrientSelected: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default NutrientProfileRankingChart;
