import styled from 'styled-components';

const NutrientProfilePieChartWrapper = styled.div`
  margin-top: 40px;
  height: 370px;
  width: 650px;
  margin-left: auto;
  margin-right: auto;
  display: block;
  background: white;
  text-align: center;
  border-style: solid;
  border-width: 1px;
  border-color: black;
  box-shadow: 10px 10px 16px -10px rgba(0, 0, 0, 0.44);

  .recharts-wrapper {
    margin: 0 auto;
  }

  .pie-chart-title {
    font-size: 24px;
    font-weight: bold;
    text-decoration: underline;
  }

  .pie-chart-wrapper {
    display: inline-block;
    margin-left: 30px;
  }
`;

export default NutrientProfilePieChartWrapper;
