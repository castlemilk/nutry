import React from 'react';
// import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import NutryLogo from 'images/icon-120x120.png';
import NutryTitle from 'images/title-120x120.png';

import HeaderWrapper from './HeaderWrapper';

export default class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <HeaderWrapper >
        <Row>
          <Col xxl={4} xl={5} lg={5} md={6} sm={24} xs={24} >
            <a className="logo-link" >
              <img className="logo" alt="logo" src={NutryLogo} />
              <img className="title" alt="Nutry" src={NutryTitle} />
            </a>
          </Col>
        </Row>
      </HeaderWrapper>
    );
  }


}
