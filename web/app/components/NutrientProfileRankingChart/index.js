/**
*
* NutrientProfilePieChart
*
*/

import React from 'react';
import { Sector, Bar, BarChart, ComposedChart, XAxis, YAxis, Label, Text, ReferenceLine, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Spin, Icon } from 'antd';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import LoadingContent from 'components/LoadingContent';
import { generateColor } from 'lib/utils';
import { getFilteredData } from 'lib/nutrientAnalytics';
import { prefixToName, prefixToUnit } from 'lib/nutrientMap';
import AxisLabel from './AxisLabel';
import messages from './messages';
import NutrientProfileRankingWrapper from './NutrientProfileRankingChartWrapper';
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a94442', '#c566ac'];
const RANKING_COLORS_50 = [
  '#5A338A', '#5C348C', '#5D358F', '#5F3691', '#603794',
  '#623796', '#633898', '#65399B', '#673A9D', '#683B9F', '#6A3CA2',
  '#6B3DA4', '#6D3EA7', '#6E3FA9', '#7040AB', '#7240AE', '#7341B0', '#7542B3',
  '#7643B5', '#7844B7', '#7945BA', '#7B46BC', '#7D47BF', '#7E48C1', '#8049C3',
  '#8149C6', '#834AC8', '#844BCA', '#864CCD', '#884DCF', '#894ED2', '#8B4FD4',
  '#8C50D6', '#8E51D9', '#8F52DB', '#9152DE', '#9353E0', '#9454E2', '#9655E5',
  '#9756E7', '#9957EA', '#9A58EC', '#9C59EE', '#9E5AF1', '#9F5BF3', '#A15BF5',
  '#A25CF8', '#A45DFA', '#A55EFD',
  '#A75FFF'];
const RANKING_COLORS_20 = [
  '#5A338A',
  '#5E3590',
  '#623896',
  '#663A9C',
  '#6A3CA3',
  '#6E3FA9',
  '#7241AF',
  '#7643B5',
  '#7A46BB',
  '#7E48C1',
  '#834AC8',
  '#874CCE',
  '#8B4FD4',
  '#8F51DA',
  '#9353E0',
  '#9756E6',
  '#9B58ED',
  '#9F5AF3',
  '#A35DF9',
  '#A75FFF',
];
const CustomTooltip = (props) => {
  const { active, nutrientSelected } = props;
  if (active) {
    const { payload, label, foodID } = props;
    const { name, value, unit, id } = payload[0].payload;
    // console.log(props);
    // TODO: add description mapping
    return (
      <div className="custom-tooltip">
        <p className="label">{foodID === id ? `${name} [Current FoodProfile]` : `${name}`}</p>
        <p className="intro">{`Contains ${value} ${unit} of ${nutrientSelected}`}</p>
        <p className="desc">Description: Coming soon!</p>
      </div>
    );
  }
  return null;
};
CustomTooltip.propTypes = {
  type: PropTypes.string,
  payload: PropTypes.array,
  label: PropTypes.string,
};

function processData(rawData, nutrientSelected) {
  const barData = rawData[nutrientSelected];
  const COLORS = generateColor('#A75FFF', '#5A338A', barData.length);
  return barData.sort((a, b) => b.value - a.value).map((value, index) => {
    const bar = value;
    bar.fill = COLORS[index % COLORS.length];
    return bar;
  });
}
const getPath = (x, y, width, height, radius) => {
  const maxRadius = Math.min(Math.abs(width) / 2, Math.abs(height) / 2);
  const sign = height >= 0 ? 1 : -1;
  const clockWise = height >= 0 ? 1 : 0;
  let path;

  if (maxRadius > 0 && radius instanceof Array) {
    const newRadius = [];
    for (let i = 0, len = 4; i < len; i += 1) {
      newRadius[i] = radius[i] > maxRadius ? maxRadius : radius[i];
    }

    path = `M${x},${y + (sign * newRadius[0])}`;

    if (newRadius[0] > 0) {
      path += `A ${newRadius[0]},${newRadius[0]},0,0,${clockWise},${x + newRadius[0]},${y}`;
    }

    path += `L ${(x + width) - newRadius[1]},${y}`;

    if (newRadius[1] > 0) {
      path += `A ${newRadius[1]},${newRadius[1]},0,0,${clockWise},
       ${x + width},${y + (sign * newRadius[1])}`;
    }
    path += `L ${x + width},${(y + height) - (sign * newRadius[2])}`;

    if (newRadius[2] > 0) {
      path += `A ${newRadius[2]},${newRadius[2]},0,0,${clockWise},
       ${(x + width) - newRadius[2]},${y + height}`;
    }
    path += `L ${x + newRadius[3]},${y + height}`;

    if (newRadius[3] > 0) {
      path += `A ${newRadius[3]},${newRadius[3]},0,0,${clockWise},
       ${x},${(y + height) - (sign * newRadius[3])}`;
    }
    path += 'Z';
  } else if (maxRadius > 0 && radius === +radius && radius > 0) {
    const newRadius = Math.min(maxRadius, radius);

    path = `M ${x},${y + (sign * newRadius)}
           A ${newRadius},${newRadius},0,0,${clockWise},${x + newRadius},${y}
           L ${x + (width - newRadius)},${y}
           A ${newRadius},${newRadius},0,0,${clockWise},${x + width},${y + (sign * newRadius)}
           L ${x + width},${(y + height) - (sign * newRadius)}
           A ${newRadius},${newRadius},0,0,${clockWise},${x + (width - newRadius)},${y + height}
           L ${x + newRadius},${y + height}
           A ${newRadius},${newRadius},0,0,${clockWise},${x},${(y + height) - (sign * newRadius)} Z`;
  } else {
    path = `M ${x},${y} h ${width} v ${height} h ${-width} Z`;
  }
  return path;
};
// const getPath2 = (x, y, width, height) => `M${x},${y + height}
//           C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
//           C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
//           Z`;
const CustomShape = (props) => { /* eslint react/prop-types: 0 */
  const barId = props.payload.id;
  const { fillActive, fill, x, y, width, height, radius, foodID } = props;
  return <path d={getPath(x, y, width, height, radius)} stroke="none" fill={barId === foodID ? fillActive : fill} />;
};
// const renderXLabel = (props) => (<Text>
//   {prefixToName(props.nutrientSelected)} [{prefixToUnit(props.nutrientSelected)}]
// </Text>);
const xLabel = (nutrient) => `${prefixToName(nutrient)} [${prefixToUnit(nutrient)}]`;
class NutrientProfileRankingChart extends React.Component { // eslint-disable-line react/prefer-stateless-function
  // constructor(props) {
  //   super(props);
  //   // this.state = {
  //   //   activeIndex: !this.props.loading ? getIndexLargestValue(data) : 0,
  //   // };
  // }

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
    const { loading, rankingResults, nutrientSelected, id } = this.props;
    const loadingPie = <Spin style={{ marginTop: '160px' }} indicator={<Icon type="loading" style={{ fontSize: 40 }} spin />} />;
    // console.log(rankingResults, nutrientSelected);
    const data = loading ? null : processData(rankingResults, nutrientSelected);
    console.log(data);
    return (
      <NutrientProfileRankingWrapper>
        <div className="pie-chart-title" >
          { loading ? <LoadingContent width={300} height={30} speed={1.5} /> : <FormattedMessage {...messages.chartTitle} /> }
        </div>
        <div className="ranking-chart-wrapper" >
          { loading ? loadingPie : (
            <BarChart layout="vertical" width={790} height={500} data={data} margin={{ top: 80, right: 180, bottom: 50, left: 80 }}>
              <XAxis
                type="number"
                tick={{ stroke: 'gray', strokeWidth: 1, paddingBottom: 30 }}
                tickMargin={10}
                padding={{ bottom: 30 }}
                domain={[0, 'dataMax']}
              >
                <Label position="center" dy={40}value={xLabel(nutrientSelected)} />
              </XAxis>
              <YAxis
                dataKey="name"
                type="category"
                minTickGap={20}
                tickMargin={0}
              >
                <Label angle={-90} dx={-70} >
                  Other Results
                </Label>
              </YAxis>
              <Tooltip content={<CustomTooltip nutrientSelected={prefixToName(nutrientSelected)} foodID={id} />} />
              <Bar radius={10} shape={<CustomShape fillActive="#b74545" foodID={id} />} foodID={id} dataKey="value" />
            </BarChart>)
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
  id: PropTypes.string.isRequired,
};

export default NutrientProfileRankingChart;
