/**
 *
 * FoodProfile
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Col } from 'antd';
// import { ONCE_TILL_UNMOUNT } from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import NutrientDisplay from 'components/NutrientDisplay';
import FoodProfileTitle from 'components/FoodProfileTitle';
import FoodProfileToolBar from 'components/FoodProfileToolBar';
import NutrientProfilePieChartView from 'containers/NutrientProfilePieChartView';
import NutrientProfileRankingChartView from 'containers/NutrientProfileRankingChartView';
import {
  loadProfile,
  tabChanged,
  portionChanged,
  ageGroupChanged } from './actions';
import {
  makeSelectProfileHeader,
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
    // TODO: Add a prefix on results mouse-down to kick of the fetch extra early
  }
  // shouldComponentUpdate(nextProps) {
  //   console.log(nextProps)
  //   return this.props.match.params.profileId !== nextProps.match.params.profileId
  // }
  componentDidMount() {
    // console.log('componentDidMount');
    if (this.props.loading) {
      this.props.onLoadProfile(this.props.match.params.profileId);
    }
  }
  componentDidUpdate() {
    // console.log('componentDidUpdate');
    if (this.props.loading) {
      this.props.onLoadProfile(this.props.match.params.profileId);
    }
  }

  render() {
    const SN = this.props.match.params.profileId;
    const profileBackgroundStyle = {
      width: '100%',
      height: '100%',
      backgroundColor: '#DBD8D8',
    };
    const { loading,
      // tabSelected,
      portions,
      // nutrients,
      profileHeader,
      portionSelected,
      // nutrientSelected,
      ageGroupSelected } = this.props;
    const { onTabChange,
      onPortionChanged,
      onAgeGroupChanged,
      onLoadNewProfile,
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


    // const analyticsProps = {
    //   loading,
    //   nutrients,
    //   nutrientFilter: tabSelected,
    //   onLoadNewProfile,
    //   ageGroupSelected,
    //   portionSelected,
    //   nutrientSelected,
    //
    // };
    const foodProfileToolbarProps = {
      loading,
      portions,
      portionSelected,
      ageGroupSelected: ageGroupSelected.toJS(),
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
            <Col xs={2} sm={2} md={1} lg={1}>
            </Col>
            <Col xs={20} sm={20} md={12} lg={12} >
              <NutrientDisplay {...nutrientDisplayProps} />
            </Col>
            <Col xs={20} sm={20} md={10} lg={10}>
              <NutrientProfilePieChartView />
              <NutrientProfileRankingChartView onLoadNewProfile={onLoadNewProfile} id={SN} />
            </Col>
            <Col xs={2} sm={2} md={1} lg={1}>
            </Col>
          </Row>
        </div>
      </FoodProfileWrapper>
    );
  }
}

FoodProfile.propTypes = {
  loading: PropTypes.bool,
  // profileHeaderCache: PropTypes.object,
  profileHeader: PropTypes.object.isRequired,
  // nutrients: PropTypes.object,
  // nutrientSelected: PropTypes.string,
  onLoadProfile: PropTypes.func,
  onTabChange: PropTypes.func,
  // tabSelected: PropTypes.string,
  portions: PropTypes.array,
  portionSelected: PropTypes.object,
  onAgeGroupChanged: PropTypes.func,
  onPortionChanged: PropTypes.func,
  ageGroupSelected: PropTypes.object,
  // location: PropTypes.object,
  onLoadNewProfile: PropTypes.func,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectProfileLoading(),
  profileHeader: makeSelectProfileHeader(),
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
    onLoadProfile: (serialNumber) => dispatch(loadProfile(serialNumber)),
    onLoadNewProfile: (profileId) => dispatch(push(`/foodprofile/${profileId}`)),
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
  withRouter,
)(FoodProfile);
