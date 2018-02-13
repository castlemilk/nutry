import styled from 'styled-components';

const HeaderWrapper = styled.div`
  background: white;
  padding-top: 20px;

  .logo-link {
    overflow: hidden;
    padding-left: 40px;
    float: left;
    height: 120px;
    line-height: 64px;
    text-decoration: none;
    white-space: nowrap;
  }

  .logo {
    margin-right: 30px;
    margin-left: 30px;
  }
`;

export default HeaderWrapper;
