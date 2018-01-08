import styled from 'styled-components';

const SearchHeaderWrapper = styled.div`
  background-color: rgba(211, 211, 211, 0.3);
  position: relative;
  width: 100%;
  .header {
    height:auto;
    padding:1%;
    width: 100%;
    padding-left: 30px;
    padding-right: 30px;
    margin:0;
    display: flex;
  }
  .logo-image {
    margin-left:2%;
    float:left;
    padding:0;
    margin:0;
    display: block;
  }
  .search-box {
    float:left;
    width: 100%;
    display: block;
    padding-top: 15px;
    z-index: 103;
    position: relative;
  }
`;

export default SearchHeaderWrapper;