/**
 *
 * Profiler
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import ExpandableListView from 'components/ExpandableListView';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectProfiler from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';


export class Profiler extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const sampleData = [{
      headerName: 'elements',
      isOpened: true,
      isReactComponent: false,
      height: 300,
      items: [{
        title: 'items1',
      }, {
        title: 'items2',
      }, {
        title: 'items3',
      }, {
        title: 'items4',
      }, {
        title: 'items5',
      }, {
        title: 'items6',
      }],
    }];
    console.log(sampleData);
    return (
      <div>
        <ExpandableListView
          data={sampleData}
          headerAttName="headerName"
          itemsAttName="items"
        />
      </div>
    );
  }
}

Profiler.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  profiler: makeSelectProfiler(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profiler', reducer });
const withSaga = injectSaga({ key: 'profiler', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Profiler);
