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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import NutrientDisplay from 'components/NutrientDisplay';
import ProfileTitle from 'components/ProfileTitle';
import Spices from 'images/spices.svg';
import { loadProfile } from './actions';
import { makeSelectProfile, makeSelectProfileLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import FoodProfileWrapper from './FoodProfileWrapper';

export class FoodProfile extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { SN, source } = this.props.profileHeader;
    console.log('foodProfile:profileHeader:');
    console.log(this.props.profileHeader);
    this.props.onLoadProfile(SN, source);
  }

  render() {
    const profileBackgroundStyle = {
      width: '100%',
      height: '100%',
      backgroundImage: `url(${Spices})`,
    };
    const { loading, profileHeader, profileBody } = this.props;
    const loadingSpinner = <Icon type="loading" style={{ fontSize: 40 }} spin />;
    const loadingView = (<div className="loading-spinner">
      <Spin indicator={loadingSpinner} />
    </div>);
    const profileTitleProps = {
      profileHeader,
    };
    const nutrientDisplayProps = {
      loading,
      profileBody,
    };

    return (
      <FoodProfileWrapper>
        <div className="profile-background" style={profileBackgroundStyle}>
          <Helmet>
            <title>FoodProfile</title>
            <meta name="description" content="Description of FoodProfile" />
          </Helmet>
          <Row>
            <Col xs={3} sm={3} md={3} lg={2}>
            </Col>
            <Col xs={18} sm={18} md={18} lg={10} >
              { loading ? loadingView : <ProfileTitle {...profileTitleProps} />}
            </Col>
            <Col xs={3} sm={3} md={3} lg={10}>
            </Col>
          </Row>
          <Row>
            <Col xs={3} sm={3} md={3} lg={2}>
            </Col>
            <Col xs={18} sm={18} md={18} lg={10} >
              <NutrientDisplay {...nutrientDisplayProps} />
            </Col>
            <Col xs={3} sm={3} md={3} lg={10}>
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
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectProfileLoading(),
  profileBody: makeSelectProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLoadProfile: (serialNumber, source) => dispatch(loadProfile(serialNumber, source)),
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
