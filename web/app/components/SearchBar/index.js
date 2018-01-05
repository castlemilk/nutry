/**
*
* SearchBar
*
*/

import * as React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import Wrapper from './Wrapper';
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
    <Wrapper>
      <Input
        className="search-input"
        type="text"
        role="combobox"
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
    </Wrapper>
  );
}


export default SearchBar;
