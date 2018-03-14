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
import { nutrientToIndex, getIndexLargestValue } from 'lib/utils';
import messages from './messages';
import { renderActiveShape } from './utils';
import NutrientProfilePieChartWrapper from './NutrientProfilePieChartWrapper';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a94442', '#c566ac'];


class NutrientProfilePieChart extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const { nutrients, loading } = this.props;
    this.state = {
      activeIndex: !loading ? getIndexLargestValue(nutrients) : 0,
    };
  }
  componentWillReceiveProps(nextProps) {
    const { nutrients,
    nutrientSelected } = nextProps;
    if (this.props.nutrientSelected !== nextProps.nutrientSelected) {
      const selectedIndex = nutrientToIndex(nutrients, nutrientSelected);
      return this.setState({ activeIndex: selectedIndex !== null ? selectedIndex : getIndexLargestValue(nutrients) });
    }
    return false;
  }

  onPieEnter(data, index) {
    this.setState({
      activeIndex: index,
    });
  }

  render() {
    const { loading,
      nutrients } = this.props;
    const pieDataColored = !loading ? nutrients.map((value, index) => {
      const section = value;
      section.fill = COLORS[index % COLORS.length];
      return section;
    }) : [];
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
          </PieChart>
        </div>
      </NutrientProfilePieChartWrapper>
    );
  }
}

NutrientProfilePieChart.propTypes = {
  nutrientSelected: PropTypes.string,
  nutrients: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default NutrientProfilePieChart;
