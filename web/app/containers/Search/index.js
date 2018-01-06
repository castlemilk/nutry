/**
 *
 * SearchB
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import SearchBar from 'components/SearchBar';
import { makeSelectSearch, makeSelectSearchString } from './selectors';
import { changeSearchString } from './actions';
import reducer from './reducer';
import saga from './saga';

export class Search extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  handleClick(event) {
    return event;
  }
  render() {
    const searchBarProps = {
      onClick: this.handleClick(),
      placeholder: 'Search for food',
      value: this.props.searchString,
      onChange: this.props.onChangeSearchString,
    };
    return (
      <div>
        <SearchBar {...searchBarProps} />
      </div>
    );
  }
}

Search.propTypes = {
  searchString: PropTypes.string.isRequired,
  onChangeSearchString: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  search: makeSelectSearch(),
  searchString: makeSelectSearchString(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeSearchString: (evt) => dispatch(changeSearchString(evt.target.value)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'search', reducer });
const withSaga = injectSaga({ key: 'search', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Search);
