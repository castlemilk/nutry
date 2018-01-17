import styled from 'styled-components';

const NutrientDisplayWrapper = styled.div`
  margin-top: 40px;
  background: white;
  width: 100%;
  height: 840px;
  padding-bottom: 20px;
  .ant-tabs.ant-tabs-card > .ant-tabs-bar .ant-tabs-tab  {
    width: 300px;
    align-text: center;
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
  }
  .detailed-card-wrapper {
    height: 720px;
    background: white;
    overflow: scroll;
  }
`;

export default NutrientDisplayWrapper;
