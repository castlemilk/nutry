import styled from 'styled-components';

const FooterWrapper = styled.div`
  @media only screen and (min-width: 380px) and (max-width: 576px) {
    .footer {
      width: 100%;
      text-align: center;
    }

    .footer-wrap {
      width: 100%;
      padding: 40px;
    }

    .side-col .line-left {
      position: relative;
      visibility: visible;
      border-bottom: 1px solid black;
      padding-top: 15px;
      width: 100%;
    }

    .side-col .line-right {
      position: relative;
      visibility: visible;
      border-bottom: 1px solid black;
      padding-top: 15px;
      width: 100%;
    }

    .links {
      padding-top: 86px;
      padding-bottom: 10px;
      max-width: 1200px;
      width: 100%;
    }

    .media-row {
      position: relative;
      margin: auto;
      width: 100%;
    }
  }

  @media only screen and (min-width: 576px) and (max-width: 960px) {
    .footer {
      width: 100%;
      text-align: center;
    }

    .footer-wrap {
      width: 100%;
      padding: 40px;
    }

    /* styles for browsers larger than 960px; */
    .side-col .line-left {
      position: relative;
      visibility: visible;
      border-bottom: 1px solid black;
      padding-top: 15px;
      width: 100%;
    }

    .side-col .line-right {
      position: relative;
      visibility: visible;
      border-bottom: 1px solid black;
      padding-top: 15px;
      width: 100%;
    }

    .links {
      padding-top: 86px;
      padding-bottom: 10px;
      margin: auto;
      max-width: 1200px;
      width: 100%;
    }

    .media-row {
      position: relative;
      margin: auto;
      width: 100%;
    }
  }

  @media only screen and (min-width: 230px) and (max-width: 390px) {
    .footer {
      width: 100%;
      text-align: center;
    }

    .footer-wrap {
      width: 100%;
      padding: 40px;
    }

    .links {
      padding-top: 86px;
      padding-left: 40px;
      padding-bottom: 40px;
      margin: auto;
      max-width: 1200px;
      width: 100%;
    }

    .media-row {
      position: relative;
      margin: auto;
      width: 100%;
    }
  }

  @media only screen and (min-width: 960px) and (max-width: 1090px) {
    .footer {
      width: 100%;
      text-align: center;
    }

    .footer-wrap {
      width: 100%;
      padding: 40px;
    }

    /* for sumo sized (mac) screens */

    /* styles for browsers larger than 960px; */
    .side-col .line-left {
      visibility: visible;
      border-bottom: 1px solid black;
      padding-top: 15px;
    }

    .side-col .line-right {
      visibility: visible;
      border-bottom: 1px solid black;
      padding-top: 15px;
    }

    .links {
      padding-top: 86px;
      padding-bottom: 40px;
      margin: auto;
      max-width: 1200px;
      width: 100%;
    }

    .media-row {
      padding-bottom: 40px;
      margin: auto;
      max-width: 1200px;
      width: 100%;
    }
  }

  @media only screen and (min-width: 1090px) and (max-width: 1999px) {
    .footer {
      width: 100%;
      text-align: center;
    }

    .footer-wrap {
      width: 100%;
      padding: 40px;
    }

    /* styles for browsers larger than 960px; */
    .side-col .line-left {
      position: relative;
      visibility: visible;
      border-bottom: 1px solid black;
      padding-top: 15px;
      margin-left: 10px;
      margin-right: 30px;
    }

    .side-col .line-right {
      position: relative;
      visibility: visible;
      border-bottom: 1px solid black;
      padding-top: 15px;
      margin-right: 10px;
      margin-left: 30px;
    }

    .links {
      padding-top: 86px;
      padding-bottom: 40px;
      margin: auto;
      max-width: 1200px;
      width: 100%;
    }

    .media-row {
      position: relative;
      margin: auto;
      width: 100%;
    }
  }

  @media only screen and (min-width: 1600px) {
    .footer {
      width: 100%;
      text-align: center;
    }

    .footer-wrap {
      width: 100%;
      padding: 40px;
    }

    /* for sumo sized (mac) screens */

    /* styles for browsers larger than 960px; */
    .side-col .line-left {
      visibility: visible;
      border-bottom: 1px solid black;
      padding-top: 15px;
      margin-left: 10px;
      margin-right: 30px;
    }

    .side-col .line-right {
      visibility: visible;
      border-bottom: 1px solid black;
      padding-top: 15px;
      margin-right: 10px;
      margin-left: 30px;
    }

    .links {
      padding-top: 86px;
      padding-bottom: 40px;
      margin: auto;
      max-width: 1200px;
      width: 100%;
    }

    .media-row {
      padding-bottom: 40px;
      margin: auto;
      max-width: 1200px;
      width: 100%;
    }
  }

  @media only screen and (max-device-width: 480px) {
    .footer {
      width: 100%;
      text-align: center;
    }

    .footer-wrap {
      width: 100%;
      padding: 40px;
    }

    /* styles for mobile browsers smaller than 480px; (iPhone) */
    .side-col .line-left {
      position: relative;
      visibility: visible;
      border-bottom: 1px solid black;
      padding-top: 15px;
    }

    .side-col .line-right {
      position: relative;
      visibility: visible;
      border-bottom: 1px solid black;
      padding-top: 15px;
    }

    .links {
      padding-top: 86px;
      padding-bottom: 40px;
      margin: auto;
      max-width: 1200px;
      width: 100%;
    }

    .media-row {
      position: relative;
      margin: auto;
      width: 100%;
    }
  }
`;

export default FooterWrapper;
