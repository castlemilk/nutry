/**
 *
 * FoodProfile
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Col } from 'antd';
import { ONCE_TILL_UNMOUNT } from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import NutrientDisplay from 'components/NutrientDisplay';
import FoodProfileTitle from 'components/FoodProfileTitle';
import FoodProfileToolBar from 'components/FoodProfileToolBar';
import NutrientProfilePieChart from 'components/NutrientProfilePieChart';
import NutrientProfileRankingChartView from 'containers/NutrientProfileRankingChartView';
import {
  loadProfile,
  tabChanged,
  portionChanged,
  ageGroupChanged } from './actions';
import {
  makeSelectProfileLoading,
  makeSelectTabSelected,
  makeSelectAllNutrients,
  makeSelectNutrientsBySummaryIds,
  makeSelectNutrientsBySections,
  makeSelectNutrientSelected,
  makeSelectAgeGroup,
  makeSelectPortion,
  makeSelectPortions,
 } from './selectors';
import reducer from './reducer';
import saga from './saga';
import FoodProfileWrapper from './FoodProfileWrapper';

export class FoodProfile extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    const { SN, source } = this.props.profileHeader;
    this.props.onLoadProfile(SN, source);
    // TODO: Add a prefix on results mouse-down to kick of the fetch extra early
  }

  render() {
    const profileBackgroundStyle = {
      width: '100%',
      height: '100%',
      backgroundColor: '#DBD8D8',
    };
    const { loading,
      profileHeader,
      tabSelected,
      portions,
      nutrients,
      portionSelected,
      nutrientSelected,
      ageGroupSelected } = this.props;
    const { onTabChange,
      onPortionChanged,
      onAgeGroupChanged,
     } = this.props;
    const profileTitleProps = {
      loading,
      profileHeader,
    };
    const nutrientDisplayProps = {
      loading,
      portionSelected,
      onTabChange,
    };


    const analyticsProps = {
      loading,
      nutrients,
      nutrientFilter: tabSelected,
      ageGroupSelected,
      portionSelected,
      nutrientSelected,

    };
    const foodProfileToolbarProps = {
      loading,
      portions,
      portionSelected,
      ageGroupSelected,
      onAgeGroupChanged,
      onPortionChanged,
    };

    return (
      <FoodProfileWrapper>
        <div className="profile-background" style={profileBackgroundStyle}>
          <Helmet>
            <title>FoodProfile</title>
            <meta name="description" content="Description of FoodProfile" />
          </Helmet>
          <Row gutter={{ xs: 0, sm: 0, md: 0, lg: 24, xl: 48 }}>
            <Col xs={2} sm={2} md={2} lg={1}>
            </Col>
            <Col xs={20} sm={20} md={20} lg={22} >
              <FoodProfileTitle {...profileTitleProps} />
            </Col>
            <Col xs={2} sm={2} md={2} lg={1}>
            </Col>
          </Row>
          <Row>
            <Col xs={2} sm={2} md={2} lg={1}>
            </Col>
            <Col xs={20} sm={20} md={20} lg={22} >
              <FoodProfileToolBar {...foodProfileToolbarProps} />
            </Col>
            <Col xs={2} sm={2} md={2} lg={1}>
            </Col>
          </Row>
          <Row gutter={{ xs: 48, sm: 48, md: 48, lg: 48, xl: 48 }}>
            <Col xs={3} sm={3} md={2} lg={2}>
            </Col>
            <Col xs={18} sm={18} md={10} lg={10} >
              <NutrientDisplay {...nutrientDisplayProps} />
            </Col>
            <Col xs={18} sm={18} md={10} lg={10}>
              <NutrientProfilePieChart {...analyticsProps} />
              <NutrientProfileRankingChartView id={profileHeader.SN} />
            </Col>
            <Col xs={3} sm={3} md={2} lg={2}>
            </Col>
          </Row>
        </div>
      </FoodProfileWrapper>
    );
  }
}

FoodProfile.propTypes = {
  loading: PropTypes.bool,
  profileHeader: PropTypes.object.isRequired,
  nutrients: PropTypes.object,
  nutrientSelected: PropTypes.string,
  onLoadProfile: PropTypes.func,
  onTabChange: PropTypes.func,
  tabSelected: PropTypes.string,
  portions: PropTypes.array,
  portionSelected: PropTypes.object,
  onAgeGroupChanged: PropTypes.func,
  onPortionChanged: PropTypes.func,
  ageGroupSelected: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectProfileLoading(),
  tabSelected: makeSelectTabSelected(),
  portions: makeSelectPortions(),
  nutrients: makeSelectAllNutrients(),
  nutrientSelected: makeSelectNutrientSelected(),
  nutrientsBySummaryIds: makeSelectNutrientsBySummaryIds(),
  nutrientsBySections: makeSelectNutrientsBySections(),
  nutrientFocused: makeSelectNutrientSelected(),
  portionSelected: makeSelectPortion(),
  ageGroupSelected: makeSelectAgeGroup(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLoadProfile: (serialNumber, source) => dispatch(loadProfile(serialNumber, source)),
    onTabChange: (tab) => dispatch(tabChanged(tab)),
    onPortionChanged: (portion) => dispatch(portionChanged(portion)),
    onAgeGroupChanged: (ageGroup) => dispatch(ageGroupChanged(ageGroup)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'foodProfile', reducer });
const withSaga = injectSaga({ key: 'foodProfile', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(FoodProfile);
