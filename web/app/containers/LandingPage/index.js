/**
 *
 * LandingPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { enquireScreen } from 'enquire-js';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLandingPage from './selectors';
import Header from './Header';
import Banner from './Banner';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
// let isMobile = false;
// enquireScreen((b) => {
//   isMobile = b;
// });
export class LandingPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
    };
  }
  componentDidMount() {
    enquireScreen((b) => {
      this.setState({
        isMobile: !!b,
      });
    });
  }
  render() {
    const { isMobile } = this.state;
    const childProps = { ...this.props, isMobile };
    return (
      <div>
        <Helmet>
          <title>Overview</title>
          <meta name="description" content="Nutry - Overview" />
        </Helmet>
        <Header {...childProps} />
        <Banner {...childProps} />
      </div>
    );
  }
}

// LandingPage.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  landingPage: makeSelectLandingPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'landingPage', reducer });
const withSaga = injectSaga({ key: 'landingPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LandingPage);
