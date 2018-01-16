/**
*
* NutrientDisplay
*
*/

import React from 'react';

import { Spin, Icon } from 'antd';
// import { cyan500, blue900 } from 'material-ui/styles/colors';
import { Tabs, Tab } from 'material-ui/Tabs';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import SummaryCard from 'components/SummaryCard';
import DetailedCard from 'components/DetailedCard';
import TableHeader from 'components/TableHeader';
import { getSummaryNutrients, getDetailedNutrients } from 'lib/nutrientMap';
// import { FormattedMessage } from 'react-intl';
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
    console.log('FoodProfile:tabchanged', value);
    this.setState({
      index: value,
    });
  };
  handlePortionChange = (event, index, value) => {
    console.log('FoodProfile:portionselected:handleChange:value', value);
    console.log('FoodProfile:portionselected:handleChange:value_g', this.portions[value].g);
    console.log('FoodProfile:portionselected:handleChange:index', index);
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
    const { profileBody, portion } = this.props;
    const muiTheme = getMuiTheme({
      tabs: {
        backgroundColor: '#3774a9',
      },
    });
    const inkBarStyle = {
      backgroundColor: 'gray',
    };
    console.log('nutrientDisplay:profileBody:');
    console.log(profileBody);
    const loadingSpinner = <Icon type="loading" style={{ fontSize: 40 }} spin />;
    const loadingView = (<div className="loading-spinner">
      <Spin indicator={loadingSpinner} />
    </div>);
    const nutrients = profileBody ? profileBody.nutrients : null;
    const summaryTable = nutrients ? getSummaryNutrients(nutrients, portion) : null;
    const detailedTable = nutrients ? getDetailedNutrients(nutrients, portion) : null;
    // const TabPane = Tabs.TabPane;
    const tabs = (profileBody ?
      (<MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Tabs inkBarStyle={inkBarStyle} value={index} onChange={this.handleChangeTabs}>
            <Tab label="Summary" value={0} />
            <Tab label="Detailed" value={1} />
          </Tabs>
          <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
            <div>
              <div className="summary-table-header-wrapper">
                <TableHeader />
              </div>
              <div className="summary-card-wrapper">
                { summaryTable ? <SummaryCard nutrientTable={summaryTable} /> : null }
              </div>
            </div>
            <div>
              <div className="detailed-table-header-wrapper">
                <TableHeader />
              </div>
              <div className="detailed-card-wrapper">
                { detailedTable ? <DetailedCard nutrientTable={detailedTable} /> : null }
              </div>
            </div>
          </SwipeableViews>
        </div>
      </MuiThemeProvider>) : loadingView
      );
    // const tabs = (profileBody ?
    //   (<Tabs
    //     type="card"
    //     className="nutrient-tabs"
    //     defaultActiveKLey="1"
    //     onChange={(e) => this.handleTabChange(e)}
    //   >
    //     <TabPane tab={<span>Summary</span>} key="summary">
    //       <div className="summary-table-header-wrapper">
    //         <TableHeader />
    //       </div>
    //       <div className="summary-card-wrapper">
    //         { summaryTable ? <SummaryCard nutrientTable={summaryTable} /> : null }
    //       </div>
    //     </TabPane>
    //     <TabPane tab={<span>Detailed</span>} key="detailed">
    //       <div className="detailed-table-header-wrapper">
    //         <TableHeader />
    //       </div>
    //       <div className="detailed-card-wrapper">
    //         { detailedTable ? <DetailedCard nutrientTable={detailedTable} /> : null }
    //       </div>
    //     </TabPane>
    //   </Tabs>) : loadingView
    // );
    const displayView = profileBody ? tabs : loadingView;
    return (
      <NutrientDisplayWrapper>
        {displayView}
      </NutrientDisplayWrapper>
    );
  }
}

NutrientDisplay.propTypes = {
  profileBody: PropTypes.object.isRequired,
  portion: PropTypes.string,
};

export default NutrientDisplay;
