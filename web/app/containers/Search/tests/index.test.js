import React from 'react';
import { List } from 'immutable';
import { Button, Spin, Avatar } from 'antd';
import { shallow } from 'enzyme';
import { profileInfo } from 'fixtures/foodprofile';
import { getSearchParsedSuccess } from 'mocks/getElasticsearchQueryMock';
import Profiler from 'containers/Profiler';
import NoResultsFound from 'components/NoResultsFound';
import ResultsList from 'components/ResultsList';
import SearchBar from 'components/SearchBar';
import SearchHeader from 'components/SearchHeader';
import { Search, mapDispatchToProps } from '../index';
import SearchWrapper from '../SearchWrapper';


describe('<Profiler />', () => {
  it('should render sign-in when logged in', () => {
    const props = {
      searchString: '',
      searchResults: List([]),
      loading: true,
      profileInfo: null,
      searchType: 'all',
      loggedIn: true,
      onChangeSearchString: () => {},
      onLogin: () => {},
      onSearchRefresh: () => {},
      onSearchTypeChange: () => {},
      onProfileSelected: () => {},
      onClearFoodProfile: () => {},
    };
    const renderedComponent = shallow(
      <Search {...props} />,
    );
    expect(renderedComponent.find(SearchWrapper).length).toEqual(1);
    expect(renderedComponent.find(SearchHeader).dive().find(Avatar).length).toEqual(1);
    expect(renderedComponent.find(SearchHeader).dive().find(Avatar).children().text()).toEqual('D');
  });
  it('should render sign-in when logged in', () => {
    const props = {
      searchString: '',
      searchResults: List([]),
      loading: true,
      profileInfo: null,
      searchType: 'all',
      loggedIn: false,
      onChangeSearchString: () => {},
      onLogin: () => {},
      onSearchRefresh: () => {},
      onSearchTypeChange: () => {},
      onProfileSelected: () => {},
      onClearFoodProfile: () => {},
    };
    const renderedComponent = shallow(
      <Search {...props} />,
    );
    expect(renderedComponent.find(SearchWrapper).length).toEqual(1);
    expect(renderedComponent.find(SearchHeader).dive().find(Button).length).toEqual(1);
  });
  it('should render container when loading', () => {
    const props = {
      searchString: '',
      searchResults: List([]),
      loading: true,
      profileInfo: null,
      searchType: 'all',
      loggedIn: false,
      onChangeSearchString: () => {},
      onLogin: () => {},
      onSearchRefresh: () => {},
      onSearchTypeChange: () => {},
      onProfileSelected: () => {},
      onClearFoodProfile: () => {},
    };
    const renderedComponent = shallow(
      <Search {...props} />,
    );
    expect(renderedComponent.find(SearchWrapper).length).toEqual(1);
    expect(renderedComponent.find(Spin).length).toBeGreaterThan(1);
  });
  it('should render container when finished loading', () => {
    const props = {
      searchString: 'blabla',
      searchResults: getSearchParsedSuccess,
      loading: false,
      profileInfo: null,
      searchType: 'all',
      loggedIn: false,
      onChangeSearchString: () => {},
      onLogin: () => {},
      onSearchRefresh: () => {},
      onSearchTypeChange: () => {},
      onProfileSelected: () => {},
      onClearFoodProfile: () => {},
    };
    const renderedComponent = shallow(
      <Search {...props} />,
    );
    expect(renderedComponent.find(SearchWrapper).length).toEqual(1);
    expect(renderedComponent.find(ResultsList).length).toBeGreaterThan(1);
  });
  it('should render container when finished loading and no results with search string', () => {
    const props = {
      searchString: 'blabla',
      searchResults: {},
      loading: false,
      profileInfo: null,
      searchType: 'all',
      loggedIn: false,
      onChangeSearchString: () => {},
      onLogin: () => {},
      onSearchRefresh: () => {},
      onSearchTypeChange: () => {},
      onProfileSelected: () => {},
      onClearFoodProfile: () => {},
    };
    const renderedComponent = shallow(
      <Search {...props} />,
    );
    expect(renderedComponent.find(SearchWrapper).length).toEqual(1);
    expect(renderedComponent.find(NoResultsFound).length).toBeGreaterThan(1);
  });
  it('should render container when finished loading and no results with no search string', () => {
    const props = {
      searchString: '',
      searchResults: {},
      loading: false,
      profileInfo: null,
      searchType: 'all',
      loggedIn: false,
      onChangeSearchString: () => {},
      onLogin: () => {},
      onSearchRefresh: () => {},
      onSearchTypeChange: () => {},
      onProfileSelected: () => {},
      onClearFoodProfile: () => {},
    };
    const renderedComponent = shallow(
      <Search {...props} />,
    );
    expect(renderedComponent.find(SearchWrapper).length).toEqual(1);
    expect(renderedComponent.find(ResultsList).length).toBeGreaterThan(1);
  });
  it('should handle tab changes', () => {
    const onChangeTabSpy = jest.fn();
    const props = {
      searchString: '',
      searchResults: {},
      loading: false,
      profileInfo: null,
      searchType: 'all',
      loggedIn: false,
      onChangeSearchString: () => {},
      onLogin: () => {},
      onSearchRefresh: () => {},
      onSearchTypeChange: onChangeTabSpy,
      onProfileSelected: () => {},
      onClearFoodProfile: () => {},
    };
    const renderedComponent = shallow(
      <Search {...props} />,
    );
    renderedComponent.find('Tabs').simulate('change', 1);
    expect(onChangeTabSpy).toHaveBeenCalled();
  });
  it('should handle searchString change', () => {
    const onSearchStringSpy = jest.fn();
    const props = {
      searchString: 'blabla',
      searchResults: {},
      loading: false,
      profileInfo: null,
      searchType: 'all',
      loggedIn: false,
      onChangeSearchString: onSearchStringSpy,
      onLogin: () => {},
      onSearchRefresh: () => {},
      onSearchTypeChange: () => {},
      onProfileSelected: () => {},
      onClearFoodProfile: () => {},
    };
    const renderedComponent = shallow(
      <Search {...props} />,
    );
    renderedComponent.find(SearchHeader).dive().find(SearchBar)
      .prop('onChange')({ target: { value: 'new-string' } });
    expect(onSearchStringSpy).toHaveBeenCalled();
  });
  it('should handle profileSelected from resultsList', () => {
    const onProfileSelectedSpy = jest.fn();
    const props = {
      searchString: 'blabla',
      searchResults: getSearchParsedSuccess,
      loading: false,
      profileInfo: null,
      searchType: 'all',
      loggedIn: false,
      onChangeSearchString: () => {},
      onLogin: () => {},
      onSearchRefresh: () => {},
      onSearchTypeChange: () => {},
      onProfileSelected: onProfileSelectedSpy,
      onClearFoodProfile: () => {},
    };
    const renderedComponent = shallow(
      <Search {...props} />,
    );
    expect(renderedComponent.find(SearchWrapper).length).toEqual(1);
    expect(renderedComponent.find(ResultsList).length).toBeGreaterThan(1);
    renderedComponent.find(ResultsList)
      .first().prop('onProfileSelected')(profileInfo);
    expect(onProfileSelectedSpy).toHaveBeenCalled();
  });
  it('should handle profileSelected from profiler view', () => {
    const onProfileSelectedSpy = jest.fn();
    const props = {
      searchString: 'blabla',
      searchResults: getSearchParsedSuccess,
      loading: false,
      profileInfo: null,
      searchType: 'all',
      loggedIn: false,
      onChangeSearchString: () => {},
      onLogin: () => {},
      onSearchRefresh: () => {},
      onSearchTypeChange: () => {},
      onProfileSelected: onProfileSelectedSpy,
      onClearFoodProfile: () => {},
    };
    const renderedComponent = shallow(
      <Search {...props} />,
    );
    expect(renderedComponent.find(SearchWrapper).length).toEqual(1);
    expect(renderedComponent.find(Profiler).length).toEqual(1);
    renderedComponent.find(Profiler)
      .prop('onProfileSelected')(profileInfo);
    expect(onProfileSelectedSpy).toHaveBeenCalled();
  });
  it('should handle rendering profile view', () => {
    const onProfileSelectedSpy = jest.fn();
    const props = {
      searchString: 'blabla',
      searchResults: getSearchParsedSuccess,
      loading: false,
      profileInfo: null,
      searchType: 'all',
      loggedIn: false,
      onChangeSearchString: () => {},
      onLogin: () => {},
      onSearchRefresh: () => {},
      onSearchTypeChange: () => {},
      onProfileSelected: onProfileSelectedSpy,
      onClearFoodProfile: () => {},
    };
    const renderedComponent = shallow(
      <Search {...props} />,
    );
    expect(renderedComponent.find(SearchWrapper).length).toEqual(1);
    expect(renderedComponent.find(Profiler).length).toEqual(1);
    renderedComponent.find(Profiler)
      .prop('onProfileSelected')(profileInfo);
    expect(onProfileSelectedSpy).toHaveBeenCalled();
  });
});
describe('Map Dispatch To Props', () => {
  it('should call changeSearchString action', () => {
    const onChangeSearchStringSpy = jest.fn();
    const { onChangeSearchString } = mapDispatchToProps(onChangeSearchStringSpy);
    onChangeSearchString({ target: { value: 'new-string' } });
    expect(onChangeSearchStringSpy).toHaveBeenCalled();
  });
  it('should call changeSearchType action', () => {
    const onChangeSearchTypeSpy = jest.fn();
    const { onSearchTypeChange } = mapDispatchToProps(onChangeSearchTypeSpy);
    onSearchTypeChange();
    expect(onChangeSearchTypeSpy).toHaveBeenCalled();
  });
  it('should call searchRefresh action', () => {
    const onSearchRefreshSpy = jest.fn();
    const { onSearchRefresh } = mapDispatchToProps(onSearchRefreshSpy);
    onSearchRefresh();
    expect(onSearchRefreshSpy).toHaveBeenCalled();
  });
  it('should call login action', () => {
    const onLoginSpy = jest.fn();
    const { onLogin } = mapDispatchToProps(onLoginSpy);
    onLogin();
    expect(onLoginSpy).toHaveBeenCalled();
  });
  it('should call profileSelected action', () => {
    const onProfileSelectedSpy = jest.fn();
    const { onProfileSelected } = mapDispatchToProps(onProfileSelectedSpy);
    onProfileSelected('uuid');
    expect(onProfileSelectedSpy).toHaveBeenCalled();
  });
  it('should call clearFoodProfile action', () => {
    const onClearFoodProfileSpy = jest.fn();
    const { onClearFoodProfile } = mapDispatchToProps(onClearFoodProfileSpy);
    onClearFoodProfile();
    expect(onClearFoodProfileSpy).toHaveBeenCalled();
  });
});
