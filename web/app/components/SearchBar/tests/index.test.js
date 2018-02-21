import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from '../index';
import SearchBarWrapper from '../SearchBarWrapper';

describe('<SearchBar />', () => {
  it('should render', () => {
    const props = {
      onFocus: () => {},
      onBlur: () => {},
      value: 'searchString',
      onClick: () => {},
      onKeyUp: () => {},
      onKeyDown: () => {},
      onChange: () => {},
      placeholder: 'search',
      maxLength: 20,
    };
    const renderedComponent = shallow(
      <SearchBar {...props} />
    );
    expect(renderedComponent.find(SearchBarWrapper).length).toEqual(1);
  });
  it('should response to click', () => {
    const onClickSpy = jest.fn();
    const props = {
      onFocus: () => {},
      onBlur: () => {},
      value: 'searchString',
      onClick: onClickSpy,
      onKeyUp: () => {},
      onKeyDown: () => {},
      onChange: () => {},
      placeholder: 'search',
      maxLength: 20,
    };
    const renderedComponent = shallow(
      <SearchBar {...props} />
    );
    expect(renderedComponent.find(SearchBarWrapper).length).toEqual(1);
    renderedComponent.find('input').simulate('click');
    expect(onClickSpy).toHaveBeenCalled();
  });
  it('should respond to hover effect', () => { /* eslint no-underscore-dangle: ["error", { "allow": ["_source"] }]*/
    const onFocusSpy = jest.fn();
    const props = {
      onFocus: onFocusSpy,
      onBlur: () => {},
      value: 'searchString',
      onClick: () => {},
      onKeyUp: () => {},
      onKeyDown: () => {},
      onChange: () => {},
      placeholder: 'search',
      maxLength: 20,
    };
    const renderedComponent = shallow(
      <SearchBar {...props} />
    );
    expect(renderedComponent.find(SearchBarWrapper).length).toEqual(1);
    renderedComponent.find('input').simulate('focus');
    expect(onFocusSpy).toHaveBeenCalled();
  });
});
