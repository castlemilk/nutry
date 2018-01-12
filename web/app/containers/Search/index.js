/**
 *
 * SearchB
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Tabs, Icon, Spin, Button, Avatar } from 'antd';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import SearchBar from 'components/SearchBar';
import SearchHeader from 'components/SearchHeader';
import ResultsList from 'components/ResultsList';
import Footer from 'components/Footer';
import NoResultsFound from 'components/NoResultsFound';
import Profiler from 'containers/Profiler';
import { makeSelectLoggedIn } from 'containers/App/selectors';
import { login } from 'containers/App/actions';

import { makeSelectSearch, makeSelectSearchString, makeSelectSearchResults, makeSelectSearchLoading } from './selectors';
import { changeSearchString } from './actions';
import reducer from './reducer';
import saga from './saga';
import SearchWrapper from './SearchWrapper';


export class Search extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  handleClick(event) {
    return event;
  }
  render() {
    const loadingSpinner = <Icon type="loading" style={{ fontSize: 40 }} spin />;
    const items = this.props.searchResults.items ? this.props.searchResults.items : [];
    const noResultsFound = items.length === 0 && this.props.searchString.length > 0 && !this.props.loading;
    const nutrientResults = noResultsFound ? <NoResultsFound /> : <ResultsList results={items} />;
    const nutrientResultsView = this.props.loading ?
    (<div className="loading-spinner">
      <Spin indicator={loadingSpinner} />
    </div>) : nutrientResults;
    console.log(this.props.searchResults);
    console.log(this.props.searchString.length);
    const TabPane = Tabs.TabPane;
    const tabs = (
      <Tabs
        className="tab-bar"
        defaultActiveKLey="3"
      >
        <TabPane tab={<span><Icon type="home" />All</span>} key="1">
          {nutrientResultsView}
        </TabPane>
        <TabPane tab={<span><Icon type="file" />Nutrients</span>} key="2">
          {nutrientResultsView}
        </TabPane>
        <TabPane tab={<span><Icon type="bars" />Profiler</span>} key="3">
          <Profiler />
        </TabPane>
        <TabPane tab={<span><Icon type="api" />Recipes</span>} key="4">
        </TabPane>
        <TabPane tab={<span><Icon type="book" />Wiki</span>} key="5">
        </TabPane>
      </Tabs>
    );
    const searchBarProps = {
      onClick: this.handleClick(),
      placeholder: 'Search for food',
      value: this.props.searchString,
      onChange: this.props.onChangeSearchString,
    };
    const user = 'D';
    const avatarStyle = {
      backgroundColor: '#7F3FBF',
      position: 'absolute' };
    const helmet = (
      <Helmet>
        <title>Search</title>
        <meta name="description" content="Nutry - Search" />
      </Helmet>);
    return (
      <SearchWrapper>
        {helmet}
        <SearchHeader>
          <SearchBar {...searchBarProps} />
          <div className="sign-in-wrapper">
            { this.props.loggedIn ?
              <Avatar style={avatarStyle} size="default" >
                {user}
              </Avatar>
              : <Button type="primary" onClick={this.props.onLogin} >Sign In</Button> }
          </div>
        </SearchHeader>

        <div className="tabs" >
          {tabs}
        </div>
        <Footer />
      </SearchWrapper>
    );
  }
}

Search.propTypes = {
  searchString: PropTypes.string.isRequired,
  searchResults: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onChangeSearchString: PropTypes.func,
  loggedIn: PropTypes.bool,
  onLogin: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  search: makeSelectSearch(),
  loading: makeSelectSearchLoading(),
  searchString: makeSelectSearchString(),
  searchResults: makeSelectSearchResults(),
  loggedIn: makeSelectLoggedIn(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeSearchString: (evt) => dispatch(changeSearchString(evt.target.value)),
    onLogin: () => dispatch(login()),
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
