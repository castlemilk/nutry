import styled from 'styled-components';

const NutrientDisplayWrapper = styled.div`
  position: relative;
  margin-top: 40px;
  background: white;
  width: 100%;
  height: auto;
  padding-bottom: 20px;
  border-style: solid;
  border-width: 1px;
  border-color: black;
  -webkit-box-shadow:  6px 6px 12px -6px rgba(0,0,0,0.44);
  -moz-box-shadow:  6px 6px 12px -6px rgba(0,0,0,0.44);
  box-shadow: 10px 10px 16px -10px rgba(0, 0, 0,0.44);
  .ant-tabs.ant-tabs-card > .ant-tabs-bar .ant-tabs-tab  {
    width: 300px;
  }
  .summary-card-wrapper {
    background: white;
    margin-left: 20px;
    margin-right: 20px;
  }
  .summary-table-header-wrapper {
    margin-right: 20px;
    margin-left: 20px;
    margin-top: 10px;
  }
  .detailed-table-header-wrapper {
    margin-top: 10px;
    padding-right:40px;
    padding-left: 40px;
    font-size: 2.5vmin;
  }
  .detailed-card-wrapper {
    height: 720px;
    background: white;
    position: relative;
    display: inline-block;
    overflow-y: scroll;

  }
`;

export default NutrientDisplayWrapper;
