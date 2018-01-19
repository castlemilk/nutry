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
import { getPieDataSummary, getPieDataDetailed } from 'lib/nutrientAnalytics';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import NutrientDisplay from 'components/NutrientDisplay';
import FoodProfileTitle from 'components/FoodProfileTitle';
import FoodProfileToolBar from 'components/FoodProfileToolBar';
import NutrientProfilePieChart from 'components/NutrientProfilePieChart';
// import Spices from 'images/spices.svg';
import {
  loadProfile,
  tabChanged,
  portionChanged,
  ageGroupChanged,
  nutrientSelected } from './actions';
import { makeSelectProfile,
  makeSelectProfileLoading,
  makeSelectTabSelected,
  makeSelectNutrientSelected,
  makeSelectAgeGroup,
  makeSelectPortion,
  makeSelectPortions,
 } from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import FoodProfileWrapper from './FoodProfileWrapper';

export class FoodProfile extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    const { SN, source } = this.props.profileHeader;
    this.props.onLoadProfile(SN, source);
  }

  render() {
    const profileBackgroundStyle = {
      width: '100%',
      height: '100%',
      backgroundColor: '#DBD8D8',
      // backgroundImage: `url(${Spices})`,
    };
    const { loading,
      profileHeader,
      profileBody,
      tabSelected,
      portions,
      portionSelected,
      ageGroupSelected } = this.props;
    const { onTabChange,
      onPortionChanged,
      onAgeGroupChanged,
      onNutrientHover,
      onNutrientSelected,
     } = this.props;
    // const loadingSpinner = <Icon type="loading" style={{ fontSize: 40 }} spin />;
    // const loadingView = (<div className="loading-spinner">
    //   <Spin indicator={loadingSpinner} />
    // </div>);
    const profileTitleProps = {
      loading,
      profileHeader,
    };
    const nutrientDisplayProps = {
      loading,
      portionSelected,
      profileBody,
      onTabChange,
      onNutrientHover,
      onNutrientSelected,
    };
    const pieData = tabSelected === 'summary' ?
      getPieDataSummary(portionSelected.g, profileBody.nutrients) :
      getPieDataDetailed(portionSelected.g, profileBody.nutrients);

    const analyticsProps = {
      loading,
      pieData,
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
              <NutrientProfilePieChart {...analyticsProps} />
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
  // dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  profileHeader: PropTypes.object.isRequired,
  profileBody: PropTypes.object,
  onLoadProfile: PropTypes.func,
  onTabChange: PropTypes.func,
  tabSelected: PropTypes.string,
  portions: PropTypes.oneOfType([
    PropTypes.instanceOf(Array),
    PropTypes.array,
    PropTypes.object,
  ]),
  portionSelected: PropTypes.object,
  onNutrientHover: PropTypes.func,
  onNutrientSelected: PropTypes.func,
  selectedNutrient: PropTypes.oneOfType([
    PropTypes.instanceOf(Array),
    PropTypes.array,
    PropTypes.object,
  ]),
  onAgeGroupChanged: PropTypes.func,
  onPortionChanged: PropTypes.func,
  ageGroupSelected: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectProfileLoading(),
  profileBody: makeSelectProfile(),
  tabSelected: makeSelectTabSelected(),
  portions: makeSelectPortions(),
  nutrientSelected: makeSelectNutrientSelected(),
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
    onNutrientHover: (nutrient) => dispatch(nutrientSelected(nutrient)),
    onNutrientSelected: (nutrient) => dispatch(nutrientSelected(nutrient)),
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
