import styled from 'styled-components';

const FooterWrapper = styled.div`
  .footer-center {
    margin-left: 30px;
    margin-right: 30px;
  }
  .links {
    padding-top: 86px;
    padding-right: 24px;
    padding-bottom: 40px;
    padding-left: 15%;
    margin: auto;
    max-width: 1200px;
    width:100%

  }
  .social-media-box {
    display: inline-block;
  }
  .media-center-column {
    width: auto;
    text-align: center;
  }
  .media-row {
    position: relative;
    margin-top: 2em;
    margin-bottom: 2em;
  }
  .side-col .line-right {
    position: relative;
    visibility: visible;
    border-bottom: 1px solid black;
    padding-top: 15px;
    margin-right: 60px;
    margin-left: 30px;
  }
  .side-col .line-left {
    position: relative;
    visibility: visible;
    border-bottom: 1px solid black;
    padding-top: 15px;
    margin-left: 60px;
    margin-right: 30px;
  }
 `;
//  .media-row:after {
//     margin-left: 10%;
//     margin-right: 10%;
//     content: " ";
//     z-index: 3;
//     position: absolute;
//     background: white;
//     width: 123px;
//     height: 5px;
//     left: 35%;
//     top: 50%;
//     visibility: visible;
//   }
// `;

export default FooterWrapper;
