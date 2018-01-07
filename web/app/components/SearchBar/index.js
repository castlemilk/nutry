/**
*
* SearchBar
*
*/

import * as React from 'react';
import PropTypes from 'prop-types';
import SearchBarWrapper from './SearchBarWrapper';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

SearchBar.propTypes = {
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  onClick: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyDown: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,

};

function SearchBar(props) {
  return (
    <SearchBarWrapper>
      <div className="search-box-wrapper">
        <input
          className="search-input"
          type="text"
          aria-autocomplete="both"
          maxLength={props.maxLength}
          placeholder={props.placeholder}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          value={props.value}
          onChange={props.onChange}
          onKeyUp={props.onKeyUp}
          onKeyDown={props.onKeyDown}
          onClick={props.onClick}
        />
      </div>
    </SearchBarWrapper>
  );
}


export default SearchBar;
