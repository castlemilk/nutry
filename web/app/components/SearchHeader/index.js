/**
*
* SearchHeader
*
*/

import React from 'react';
import PropTypes from 'prop-types';

// import styled from 'styled-components';
import LogoImg from 'images/nutry_header-96x96.png';
import SearchHeaderWrapper from './SearchHeaderWrapper';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function SearchHeader(props) {
  return (
    <SearchHeaderWrapper>
      <div className="header">
        <img className="logo-image" src={LogoImg} alt="Nutry" />
        <div className="search-box">
          {props.children}
        </div>
      </div>
    </SearchHeaderWrapper>

  );
}

SearchHeader.propTypes = {
  children: PropTypes.array,
};

export default SearchHeader;
