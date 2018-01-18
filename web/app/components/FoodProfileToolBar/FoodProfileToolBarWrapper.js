import styled from 'styled-components';

const FoodProfileToolBarWrapper = styled.div`
  margin-top: 30px;
  width: 100%;
  background: white;
  height: auto;
  padding: 1%;
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  text-align: center;
  border-style: solid;
  border-width: 1px;
  border-color: black;
  -webkit-box-shadow:  6px 6px 12px -6px rgba(0,0,0,0.44);
  -moz-box-shadow:  6px 6px 12px -6px rgba(0,0,0,0.44);
  box-shadow: 10px 10px 16px -10px rgba(0, 0, 0,0.44);
  .age-group-wrapper {
    width: 200px;
    clear: both;
  }
  .age-group-description {
    height: auto;
    margin-right: 20px;
    font-size: 20px;
    font-weight: 900;
  }
  .portion-description {
    height: auto;
    margin-right: 20px;
    margin-left: 20px;
    font-size: 20px;
    font-weight: 900;
  }
  .portion-wrapper {
    width: 200px;
    clear: both;
  }
`;

export default FoodProfileToolBarWrapper;
