/**
*
* NutrientProfilePieChart
*
*/

import React from 'react';
import { Bar, BarChart, XAxis, YAxis, Label, Tooltip } from 'recharts';
import { Spin, Icon } from 'antd';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import LoadingContent from 'components/LoadingContent';
import { generateColor, scaledValue } from 'lib/utils';
// import { getFilteredData } from 'lib/nutrientAnalytics';
import { prefixToName, prefixToUnit } from 'lib/nutrientMap';
// import AxisLabel from './AxisLabel';
import messages from './messages';
import NutrientProfileRankingWrapper from './NutrientProfileRankingChartWrapper';
const CustomTooltip = (props) => {
  const { active, nutrientSelected, portionSelected } = props;
  if (active) {
    const { payload, foodID } = props;
    const { name, value, unit, id } = payload[0].payload;
    // TODO: add description mapping
    return (
      <div className="custom-tooltip">
        <p className="label">{foodID === id ? `${name} [Current FoodProfile]` : `${name}`}</p>
        <p className="intro">{`Contains ${value} ${unit} of ${nutrientSelected} per ${portionSelected.unit}`}</p>
        <p className="desc">Description: Coming soon!</p>
      </div>
    );
  }
  return null;
};
CustomTooltip.propTypes = {
  payload: PropTypes.array,
};

function processData(rawData, nutrientSelected, portionSelected) {
  const barData = rawData.get(nutrientSelected);
  if (!barData) {
    return null;
  }
  const COLORS = generateColor('#A75FFF', '#5A338A', barData.length);
  return barData
  .filter((value) => value.get('value') !== '~')
      .sort((a, b) => b.get('value') - a.get('value'))
        .map((value, index) => value.set('fill', COLORS[index % COLORS.length]).set('value', typeof value.get('value') === 'number' ? scaledValue(value.get('value'), portionSelected.g) : 0).toJS());
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
const CustomShape = (props) => { /* eslint react/prop-types: 0 */
  const barId = props.payload.id;
  const { fillActive, fill, x, y, width, height, radius, foodID } = props;
  // console.log(props);
  return <path d={getPath(x, y, width, height, radius)} stroke="none" fill={barId === foodID ? fillActive : fill} />;
};
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
  handleBarClick(value) {
    // console.log(value);
    const { id } = value;
    // this.props.onProfileSelected(id)
    this.props.onLoadNewProfile(id);
    // this.props.onOtherSearchResultSelect(id)
  }
  // shouldComponentUpdate(nextProps) {
  //   return this.props.portionSelected !== nextProps.portionSelected;
  // }

  render() {
    // TODO: investigation doing pre-processing on item select asynchronously
    // potentially reducing latecy associated with processing data on render.
    const { loading,
      rankingResults,
      nutrientSelected,
      id,
      portionSelected } = this.props;
    // console.log(rankingResults);
    const loadingPie = <Spin style={{ marginTop: '160px' }} indicator={<Icon type="loading" style={{ fontSize: 40 }} spin />} />;
    const data = loading ? null : processData(rankingResults, nutrientSelected, portionSelected);
    return (
      <NutrientProfileRankingWrapper>
        <div className="pie-chart-title" >
          { loading ? <LoadingContent width={300} height={30} speed={1.5} /> : <FormattedMessage {...messages.chartTitle} /> }
        </div>
        <div className="ranking-chart-wrapper" >
          { loading ? loadingPie : (
            <BarChart layout="vertical" width={650} height={500} data={data} margin={{ top: 80, right: 180, bottom: 50, left: 80 }}>
              <XAxis
                type="number"
                tick={{ stroke: 'gray', strokeWidth: 1, paddingBottom: 30 }}
                tickMargin={10}
                padding={{ bottom: 30 }}
                domain={[0, 'dataMax']}
              >
                <Label position="center" dy={40} value={xLabel(nutrientSelected)} />
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
              <Tooltip content={<CustomTooltip portionSelected={portionSelected} nutrientSelected={prefixToName(nutrientSelected)} foodID={id} />} />
              <Bar onClick={(value) => this.handleBarClick(value)} shape={<CustomShape fillActive="#50c59f" foodID={id} />} foodID={id} dataKey="value" />
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
  portionSelected: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default NutrientProfileRankingChart;
