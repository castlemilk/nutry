/**
 *
 * WikiView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

// import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectWikiView from './selectors';
import reducer from './reducer';
// import saga from './saga';
import messages from './messages';

export class WikiView extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>WikiView</title>
          <meta name="description" content="Description of WikiView" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

WikiView.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  wikiView: makeSelectWikiView(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'wikiView', reducer });
// const withSaga = injectSaga({ key: 'wikiView', saga });

export default compose(
  withReducer,
  // withSaga,
  withConnect,
)(WikiView);
