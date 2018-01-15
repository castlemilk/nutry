/**
 *
 * FoodProfile
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectFoodProfile from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class FoodProfile extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>FoodProfile</title>
          <meta name="description" content="Description of FoodProfile" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

FoodProfile.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  foodProfile: makeSelectFoodProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
