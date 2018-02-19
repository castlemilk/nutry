/**
*
* NutrientProfilePieChart
*
*/

import React from 'react';
import { Bar, BarChart, XAxis, YAxis, Label, Tooltip } from 'recharts';
import { Spin, Icon } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import LoadingContent from 'components/LoadingContent';
import { prefixToName } from 'lib/nutrientMap';
import { CustomTooltip, CustomShape, processData, xLabel } from './utils';
import messages from './messages';
import NutrientProfileRankingWrapper from './NutrientProfileRankingChartWrapper';

class NutrientProfileRankingChart extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    if (!this.props.loading) {
      this.onFinishedLoading();
    }
  }
  componentDidMount() {
    this.props.onLoadRankings();
  }

  onFinishedLoading() {
  }
  handleBarClick(value) {
    console.log('clicked');
    const { id } = value;
    this.props.onLoadNewProfile(id);
  }

  render() {
    // TODO: investigation doing pre-processing on item select asynchronously
    // potentially reducing latecy associated with processing data on render.
    const { loading,
      rankingResults,
      nutrientSelected,
      id,
      portionSelected } = this.props;
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
  onLoadNewProfile: PropTypes.func.isRequired,
};

export default NutrientProfileRankingChart;
