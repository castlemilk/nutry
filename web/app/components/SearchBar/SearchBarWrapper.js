import styled from 'styled-components';

const SearchBarWrapper = styled.div`
margin-right:10px;
margin-left:10px;
margin-bottom:10px;

.search-box-wrapper {
  background-color: #fff;
  position: relative;
  border-radius: 2px;
  z-index: 10;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
  transition: box-shadow 200ms cubic-bezier(0.4, 0.0, 0.2, 1);
}
.search-box-wrapper:hover {
  background-color: #fff;
  border-radius: 2px;
  position: relative;
  z-index: 10;
  box-shadow: 0 3px 8px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08);
  transition: box-shadow 200ms cubic-bezier(0.4, 0.0, 0.2, 1);
}
.search-box-wrapper:focus {
  background-color: #fff;
  border-radius: 2px;
  position: relative;
  z-index: 10;
  box-shadow: 0 3px 8px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08);
  transition: box-shadow 200ms cubic-bezier(0.4, 0.0, 0.2, 1);
}

background-color: white;
.search-input {
  outline:none;
  padding-top: 5px;
  padding-bottom:5px;
  margin-top:5px;
  margin-bottom:5px;
  padding-left:10px;
  width: 100%;
  z-index: 10;
  position: relative;

}

`;

export default SearchBarWrapper;
