/**
*
* NutrientDisplay
*
*/

import React from 'react';

import { Row, Col } from 'antd';
// import { cyan500, blue900 } from 'material-ui/styles/colors';
import { Tabs, Tab } from 'material-ui/Tabs';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import PropTypes from 'prop-types';
import SummaryCardView from 'containers/SummaryCardView';
import DetailedCardView from 'containers/DetailedCardView';
import TableHeader from 'components/TableHeader';
import LoadingContent from 'components/LoadingContent';
// import messages from './messages';
import NutrientDisplayWrapper from './NutrientDisplayWrapper';


class NutrientDisplay extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      portion: null,
      portion_index: 0,
    };
    this.portions = null;
  }
  handleChangeTabs = (value) => {
    this.setState({
      index: value,
    });
    const keys = {
      0: 'summary',
      1: 'detailed',
    };
    this.props.onTabChange(keys[value]);
  };
  handlePortionChange = (event, index, value) => {
    this.setState({
      portion: this.portions[value].g,
      portion_index: index,
    });
  }
  handleChangeIndex = (index) => {
    this.setState({
      index,
    });
  };
  render() {
    const { index } = this.state;
    const { loading } = this.props;
    const muiTheme = getMuiTheme({
      tabs: {
        backgroundColor: '#3774a9',
      },
    });
    const inkBarStyle = {
      backgroundColor: 'gray',
    };
    const tabs = [
      (<div>
        <div className="summary-table-header-wrapper">
          <TableHeader />
        </div>
        <div className="summary-card-wrapper">
          <SummaryCardView />
        </div>
      </div>),
    (<div>
      <div className="detailed-table-header-wrapper">
        <TableHeader />
      </div>
      <div className="detailed-card-wrapper">
        <DetailedCardView />
      </div>
    </div>),
    ];
    const loadingView = (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Tabs inkBarStyle={inkBarStyle} value={index} onChange={this.handleChangeTabs}>
            <Tab icon={<LoadingContent width={100} height={30} speed={1.5} />} value={0} />
            <Tab icon={<LoadingContent width={100} height={30} speed={1.5} />} value={1} />
          </Tabs>
          <div>
            <Row gutter={0}>
              <Col span={14} >
                <LoadingContent width={200} height={30} speed={1.5} />
              </Col>
              <Col span={4}>
                <LoadingContent width={50} height={30} speed={1.5} />
              </Col>
              <Col span={4}>
                <LoadingContent width={100} height={30} speed={1.5} />
              </Col>
            </Row>
            <Row gutter={0}>
              <Col span={14} >
                <LoadingContent width={200} height={30} speed={1.5} />
              </Col>
              <Col span={4}>
                <LoadingContent width={50} height={30} speed={1.5} />
              </Col>
              <Col span={4}>
                <LoadingContent width={100} height={30} speed={1.5} />
              </Col>
            </Row>
            <Row gutter={0}>
              <Col span={14} >
                <LoadingContent width={200} height={30} speed={1.5} />
              </Col>
              <Col span={4}>
                <LoadingContent width={50} height={30} speed={1.5} />
              </Col>
              <Col span={4}>
                <LoadingContent width={100} height={30} speed={1.5} />
              </Col>
            </Row>
            <Row gutter={0}>
              <Col span={14} >
                <LoadingContent width={200} height={30} speed={1.5} />
              </Col>
              <Col span={4}>
                <LoadingContent width={50} height={30} speed={1.5} />
              </Col>
              <Col span={4}>
                <LoadingContent width={100} height={30} speed={1.5} />
              </Col>
            </Row>
            <Row gutter={0}>
              <Col span={14} >
                <LoadingContent width={200} height={30} speed={1.5} />
              </Col>
              <Col span={4}>
                <LoadingContent width={50} height={30} speed={1.5} />
              </Col>
              <Col span={4}>
                <LoadingContent width={100} height={30} speed={1.5} />
              </Col>
            </Row>
            <Row gutter={0}>
              <Col span={14} >
                <LoadingContent width={200} height={30} speed={1.5} />
              </Col>
              <Col span={4}>
                <LoadingContent width={50} height={30} speed={1.5} />
              </Col>
              <Col span={4}>
                <LoadingContent width={100} height={30} speed={1.5} />
              </Col>
            </Row>
            <Row gutter={0}>
              <Col span={14} >
                <LoadingContent width={200} height={30} speed={1.5} />
              </Col>
              <Col span={4}>
                <LoadingContent width={50} height={30} speed={1.5} />
              </Col>
              <Col span={4}>
                <LoadingContent width={100} height={30} speed={1.5} />
              </Col>
            </Row>
            <Row gutter={0}>
              <Col span={14} >
                <LoadingContent width={200} height={30} speed={1.5} />
              </Col>
              <Col span={4}>
                <LoadingContent width={50} height={30} speed={1.5} />
              </Col>
              <Col span={4}>
                <LoadingContent width={100} height={30} speed={1.5} />
              </Col>
            </Row>
            <Row gutter={0}>
              <Col span={14} >
                <LoadingContent width={200} height={30} speed={1.5} />
              </Col>
              <Col span={4}>
                <LoadingContent width={50} height={30} speed={1.5} />
              </Col>
              <Col span={4}>
                <LoadingContent width={100} height={30} speed={1.5} />
              </Col>
            </Row>
            <Row gutter={0}>
              <Col span={14} >
                <LoadingContent width={200} height={30} speed={1.5} />
              </Col>
              <Col span={4}>
                <LoadingContent width={50} height={30} speed={1.5} />
              </Col>
              <Col span={4}>
                <LoadingContent width={100} height={30} speed={1.5} />
              </Col>
            </Row>
            <Row gutter={0}>
              <Col span={14} >
                <LoadingContent width={200} height={30} speed={1.5} />
              </Col>
              <Col span={4}>
                <LoadingContent width={50} height={30} speed={1.5} />
              </Col>
              <Col span={4}>
                <LoadingContent width={100} height={30} speed={1.5} />
              </Col>
            </Row>
            <Row gutter={0}>
              <Col span={14} >
                <LoadingContent width={200} height={30} speed={1.5} />
              </Col>
              <Col span={4}>
                <LoadingContent width={50} height={30} speed={1.5} />
              </Col>
              <Col span={4}>
                <LoadingContent width={100} height={30} speed={1.5} />
              </Col>
            </Row>
            <Row gutter={0}>
              <Col span={14} >
                <LoadingContent width={200} height={30} speed={1.5} />
              </Col>
              <Col span={4}>
                <LoadingContent width={50} height={30} speed={1.5} />
              </Col>
              <Col span={4}>
                <LoadingContent width={100} height={30} speed={1.5} />
              </Col>
            </Row>

          </div>
          <div>
            <Row gutter={0}>
              <Col span={14} >
                <LoadingContent width={200} height={30} speed={1.5} />
              </Col>
              <Col span={4}>
                <LoadingContent width={50} height={30} speed={1.5} />
              </Col>
              <Col span={4}>
                <LoadingContent width={100} height={30} speed={1.5} />
              </Col>
            </Row>
          </div>
        </div>
      </MuiThemeProvider>
    );
    const nutrientView = (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Tabs inkBarStyle={inkBarStyle} value={index} onChange={this.handleChangeTabs}>
            <Tab label="Summary" value={0} >
              {tabs[0]}
            </Tab>
            <Tab label="Detailed" value={1} >
              {tabs[1]}
            </Tab>
          </Tabs>
        </div>
      </MuiThemeProvider>);
    const displayView = loading ? loadingView : nutrientView;
    return (
      <NutrientDisplayWrapper>
        {displayView}
      </NutrientDisplayWrapper>
    );
  }
}

NutrientDisplay.propTypes = {
  onTabChange: PropTypes.func,
  loading: PropTypes.bool,
};

export default NutrientDisplay;
