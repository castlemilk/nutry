/**
 *
 * LandingPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import { enquireScreen } from 'enquire-js';
import { Helmet } from 'react-helmet';
import Footer from 'components/Footer';

import Header from './Header';
import Banner from './Banner';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import LandingPageWrapper from './LandingPageWrapper';
export class LandingPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
    };
  }
  // componentDidMount() {
  //   enquireScreen((b) => {
  //     console.log('calling enquireScreen:', b);
  //     this.setState({
  //       isMobile: !!b,
  //     });
  //   });
  // }
  render() {
    const { isMobile } = this.state;
    const childProps = { ...this.props, isMobile };
    return (
      <LandingPageWrapper>
        <Helmet>
          <title>Overview</title>
          <meta name="description" content="Nutry - Overview" />
        </Helmet>
        <Header {...childProps} />
        <Banner {...childProps} />
        <Page1 {...childProps} />
        <Page2 {...childProps} />
        <Page3 {...childProps} />
        <Footer />
      </LandingPageWrapper>
    );
  }
}

// LandingPage.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

export default LandingPage;
