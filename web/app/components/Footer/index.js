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
          <Row className="links" type="flex" justify="center">
            <Col xs={24} sm={24} md={4} lg={4} xl={4} gutter={48}>
              <div className="footer-center">
                <h2>Products</h2>
                <div>
                  <FormattedMessage {...messages.search} />
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
            <Col xs={24} sm={24} md={4} lg={4} xl={4} gutter={48}>
              <div className="footer-center">
                <h2>Developers</h2>
                <div>
                  <FormattedMessage {...messages.discussion} />
                </div>
                <div>
                  <FormattedMessage {...messages.api_ref} />
                </div>
                <div>
                  <FormattedMessage {...messages.api_status} />
                </div>
                <div>
                  <FormattedMessage {...messages.documentation} />
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={4} lg={4} xl={4} gutter={48}>
              <div className="footer-center">
                <h2>Company</h2>
                <div>
                  <a href="/overview" >
                    <FormattedMessage {...messages.about} />
                  </a>
                </div>
                <div>
                  <FormattedMessage {...messages.blog} />
                </div>
                <div>
                  <FormattedMessage {...messages.press} />
                </div>
                <div>
                  <FormattedMessage {...messages.customers} />
                </div>
                <div>
                  <FormattedMessage {...messages.privacyAndTerms} />
                </div>
              </div>
            </Col>
          </Row>
          <Row className="media-row" type="flex" justify="center">
            <Col className="side-col" xl={10} lg={8} md={8} sm={8} xs={6}>
              <div className="line-left"></div>
            </Col>
            <Col className="media-center-column" xl={4} lg={8} md={8} sm={8} xs={12}>
              <div className="social-media-box">
                <FaInstagram style={{ fontSize: 40, color: '#7F3FBF' }} />
                <FaLinkedinSquare style={{ fontSize: 40, color: '#7F3FBF' }} />
                <FaTwitterSquare style={{ fontSize: 40, color: '#7F3FBF' }} />
                <FaFacebookOfficial style={{ fontSize: 40, color: '#7F3FBF' }} />
              </div>
            </Col>
            <Col className="side-col" xl={10} lg={8} md={8} sm={8} xs={6}>
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
