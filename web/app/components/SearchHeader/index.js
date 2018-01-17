/**
*
* SearchHeader
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
// import styled from 'styled-components';
import LogoImg from 'images/nutry_header.svg';
import SearchHeaderWrapper from './SearchHeaderWrapper';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function SearchHeader(props) {
  return (
    <SearchHeaderWrapper>
      <Row>
        <div className="header">
          <Col xs={5} sm={4} md={3} lg={2} >
            <div className="logo-wrapper" >
              <img className="logo-image" src={LogoImg} alt="Nutry" />
            </div>
          </Col>
          <Col xs={12} sm={16} md={18} lg={20} >
            <div className="search-box">
              {props.searchBarView}
            </div>
          </Col>
          <Col xs={7} sm={4} md={3} lg={2} >
            {props.loginView}
          </Col>
        </div>
      </Row>
      <Row>
        <Col span={2}>
          {props.backButtonView}
        </Col>
      </Row>
    </SearchHeaderWrapper>

  );
}

SearchHeader.propTypes = {
  searchBarView: PropTypes.object,
  toolBarView: PropTypes.object,
  backButtonView: PropTypes.object,
  loginView: PropTypes.object,
};

export default SearchHeader;
