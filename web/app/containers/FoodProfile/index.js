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
import { Row, Col, Icon, Spin } from 'antd';
import { getPieDataSummary, getPieDataDetailed } from 'lib/nutrientAnalytics';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import NutrientDisplay from 'components/NutrientDisplay';
import ProfileTitle from 'components/ProfileTitle';
import FoodProfileToolBar from 'components/FoodProfileToolBar';
import NutrientProfilePieChart from 'components/NutrientProfilePieChart';
import Spices from 'images/spices.svg';
import { loadProfile, tabChanged, portionChanged, ageGroupChanged } from './actions';
import { makeSelectProfile,
  makeSelectProfileLoading,
  makeSelectTabSelected,
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
      ageGroup } = this.props;
    const { onTabChange, onPortionChanged, onAgeGroupChanged } = this.props;
    const loadingSpinner = <Icon type="loading" style={{ fontSize: 40 }} spin />;
    const loadingView = (<div className="loading-spinner">
      <Spin indicator={loadingSpinner} />
    </div>);
    const profileTitleProps = {
      profileHeader,
    };
    const nutrientDisplayProps = {
      loading,
      portionSelected,
      profileBody,
      onTabChange,
    };
    console.log('profileBody:');
    console.log(profileBody);
    const pieData = tabSelected === 'summary' ?
      getPieDataSummary(portionSelected.g, profileBody.nutrients) :
      getPieDataDetailed(portionSelected.g, profileBody.nutrients);

    const analyticsProps = {
      pieData,
    };
    const foodProfileToolbarProps = {
      portions,
      portionSelected,
      ageGroup,
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
              { loading ? loadingView : <ProfileTitle {...profileTitleProps} />}
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
          <Row gutter={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }}>
            <Col xs={3} sm={3} md={3} lg={2}>
            </Col>
            <Col xs={18} sm={18} md={18} lg={10} >
              <NutrientDisplay {...nutrientDisplayProps} />
            </Col>
            <Col xs={18} sm={18} md={18} lg={10}>
              {pieData ? <NutrientProfilePieChart {...analyticsProps} /> : null }
              {pieData ? <NutrientProfilePieChart {...analyticsProps} /> : null }
            </Col>
            <Col xs={3} sm={3} md={3} lg={2}>
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
  portions: PropTypes.object,
  portionSelected: PropTypes.object,
  onAgeGroupChanged: PropTypes.func,
  onPortionChanged: PropTypes.func,
  ageGroup: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectProfileLoading(),
  profileBody: makeSelectProfile(),
  tabSelected: makeSelectTabSelected(),
  portions: makeSelectPortions(),
  portionSelected: makeSelectPortion(),
  ageGroup: makeSelectAgeGroup(),
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
