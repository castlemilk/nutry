import styled from 'styled-components';

const SearchHeaderWrapper = styled.div`
  background-color: rgba(211, 211, 211, 0.3);
  position: relative;
  width: 100%;
  min-width: 1100px;
  .back-button {
    height: auto;
    width: 180px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 10px;
  }
  .ant-btn-primary {
    width: 100%;
    background-color: #7f3fbf;
    border-color: #7f3fbf;
  }
  .back-button .ant-btn-primary:hover {
    background-color: #7f3fdf;
    border-color: #7f3fdf;
    box-shadow: 0 4px 4px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
    transition: box-shadow 200ms cubic-bezier(0.4, 0.0, 0.2, 1);
  }
  .back-button .button {
    width: 100%;
  }
  .sign-in-wrapper {
    margin-left: 30px;
    padding-right: 20px;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
  }
  .ant-btn ant-btn-primary {
    backhround: rgba(211, 211, 211, 0.3);
  }
  .header {
    height:auto;
    padding:1%;
    width: 100%;
    padding-left: 30px;
    padding-right: 30px;
    display: flex;
  }
  .logo-wrapper {
    width: 100%;
    height: 100%;
    vertical-align: middle;
    text-align: center;
  }
  .logo-image {
    max-height: 52px;
    max-width: 80%;
    margin-left:2%;
    float:left;
    padding:0;
    margin:0;
    display: block;
  }
  .search-box {
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
  }
  .search-box .profile-title {
    max-height: 200px;
  }
`;

export default SearchHeaderWrapper;
