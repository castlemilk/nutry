/**
*
* Footer
*
*/

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Row, Col } from 'antd';
import { FaFacebookOfficial, FaTwitterSquare, FaInstagram, FaLinkedinSquare } from 'react-icons/lib/fa';


import { FormattedMessage } from 'react-intl';
import messages from './messages';
import FooterWrapper from './FooterWrapper';

function Footer() {
  // const { Footer } = Layout;
  return (
    <FooterWrapper>
      <footer className="footer">
        <div className="footer-wrap" >
          <Row className="links">
            <Col md={8} sm={24} xs={24}>
              <div className="footer-center">
                <h2>Nutry</h2>
                <div>
                  <FormattedMessage {...messages.overview} />
                </div>
                <div>
                  <FormattedMessage {...messages.mobile} />
                </div>
                <div>
                  <FormattedMessage {...messages.web} />
                </div>
                <div>
                  <FormattedMessage {...messages.enterprise} />
                </div>
              </div>
            </Col>
            <Col md={8} sm={24} xs={24}>
              <div className="footer-center">
                <h2>Community</h2>
                <div>
                  <FormattedMessage {...messages.discussion} />
                </div>
              </div>
            </Col>
            <Col md={8} sm={24} xs={24}>
              <div className="footer-center">
                <h2>Other</h2>
                <div>
                  <FormattedMessage {...messages.about} />
                </div>
                <div>
                  <FormattedMessage {...messages.contact} />
                </div>
              </div>
            </Col>
          </Row>
          <Row className="media-row">
            <Col className="side-col" md={9} sm={9} xs={9}>
              <div className="line-left"></div>
            </Col>
            <Col className="media-center-column" md={6} sm={6} xs={6}>
              <div className="social-media-box">
                <FaInstagram style={{ fontSize: 40, color: '#7F3FBF' }} />
                <FaLinkedinSquare style={{ fontSize: 40, color: '#7F3FBF' }} />
                <FaTwitterSquare style={{ fontSize: 40, color: '#7F3FBF' }} />
                <FaFacebookOfficial style={{ fontSize: 40, color: '#7F3FBF' }} />
              </div>
            </Col>
            <Col className="side-col" md={9} sm={9} xs={9}>
              <div className="line-right"></div>
            </Col>
          </Row>
        </div>
      </footer>
    </FooterWrapper>
  );
}

Footer.propTypes = {

};

export default Footer;
