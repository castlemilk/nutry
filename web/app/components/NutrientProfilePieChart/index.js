/**
*
* NutrientProfilePieChart
*
*/

import React from 'react';
import { PieChart, Pie } from 'recharts';
import { Spin, Icon } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import LoadingContent from 'components/LoadingContent';
import { getFilteredData } from 'lib/nutrientAnalytics';
import { nutrientToIndex, getIndexLargestValue } from 'lib/utils';

import { FILTERS } from './constants';
import messages from './messages';
import { renderActiveShape } from './utils';
import NutrientProfilePieChartWrapper from './NutrientProfilePieChartWrapper';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a94442', '#c566ac'];


class NutrientProfilePieChart extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const { nutrients,
    nutrientFilter,
    ageGroupSelected,
    portionSelected, loading } = this.props;
    const data = loading ? null : getFilteredData(nutrients, FILTERS[nutrientFilter], ageGroupSelected, portionSelected);
    console.log('constructor');
    this.state = {
      activeIndex: !loading ? getIndexLargestValue(data) : 0,
    };
  }
  // componentWillMount() {
  //   if (!this.props.loading) {
  //     const { nutrients,
  //     nutrientFilter,
  //     ageGroupSelected,
  //     portionSelected } = this.props;
  //     const data = getFilteredData(nutrients, FILTERS[nutrientFilter], ageGroupSelected, portionSelected);
  //     const largestIndex = getIndexLargestValue(data);
  //     if (this.state.activeIndex !== largestIndex) {
  //       this.setState({
  //         activeIndex: largestIndex,
  //       });
  //     }
  //   }
  // }
  componentWillReceiveProps(nextProps) {
  // You don't have to do this check first, but it can help prevent an unneeded render
    const { nutrients,
    nutrientFilter,
    ageGroupSelected,
    nutrientSelected,
    portionSelected } = nextProps;
    const data = getFilteredData(nutrients, FILTERS[nutrientFilter], ageGroupSelected, portionSelected);
    const selectedIndex = nutrientToIndex(nutrientSelected, data);
    return selectedIndex !== null ? this.setState({ activeIndex: selectedIndex }) : this.setState({ activeIndex: getIndexLargestValue(data) });
  }

  onPieEnter(data, index) {
    this.setState({
      activeIndex: index,
    });
  }

  render() {
    const { loading,
      nutrients,
      nutrientFilter,
      ageGroupSelected,
      portionSelected } = this.props;
    // const pieData = !loading ? getFilteredData(nutrients, FILTERS[nutrientFilter], ageGroupSelected, portionSelected) : null;
    const pieDataColored = getFilteredData(
      nutrients, FILTERS[nutrientFilter],
      ageGroupSelected, portionSelected).map((value, index) => {
        const section = value;
        section.fill = COLORS[index % COLORS.length];
        return section;
      });
    const loadingPie = <Spin style={{ marginTop: '100px' }} indicator={<Icon type="loading" style={{ fontSize: 40 }} spin />} />;
    return loading ? (
      <NutrientProfilePieChartWrapper>
        <div className="pie-chart-title" >
          <LoadingContent width={300} height={30} speed={1.5} />
        </div>
        <div className="pie-chart-wrapper" >
          {loadingPie}
        </div>
      </NutrientProfilePieChartWrapper>
    ) : (
      <NutrientProfilePieChartWrapper>
        <div className="pie-chart-title" >
          <FormattedMessage {...messages.chartTitle} />
        </div>
        <div className="pie-chart-wrapper" >
          <PieChart width={600} height={300}>
            <Pie
              activeIndex={this.state.activeIndex}
              activeShape={renderActiveShape}
              data={pieDataColored}
              dataKey="value"
              cx={290}
              cy={150}
              baseValue={100}
              innerRadius={60}
              outerRadius={80}
              onMouseEnter={(d, i) => this.onPieEnter(d, i)}
            />
          </PieChart>)
        </div>
      </NutrientProfilePieChartWrapper>
    );
  }
}

NutrientProfilePieChart.propTypes = {
  nutrientSelected: PropTypes.string,
  portionSelected: PropTypes.object.isRequired,
  ageGroupSelected: PropTypes.object.isRequired,
  nutrients: PropTypes.object.isRequired,
  nutrientFilter: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default NutrientProfilePieChart;
