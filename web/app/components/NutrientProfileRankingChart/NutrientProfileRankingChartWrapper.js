import styled from 'styled-components';

const NutrientProfileRankingChartWrapper = styled.div`
  margin-top: 40px;
  height: 545px;
  width: 650px;
  margin-left:auto;
  margin-right:auto;
  margin-bottom: 40px;
  display:block;
  background: white;
  text-align: center;
  border-style: solid;
  border-width: 1px;
  border-color: black;
  -webkit-box-shadow:  6px 6px 12px -6px rgba(0,0,0,0.44);
  -moz-box-shadow:  6px 6px 12px -6px rgba(0,0,0,0.44);
  box-shadow: 10px 10px 16px -10px rgba(0, 0, 0,0.44);
  .recharts-wrapper {
    margin : 0 auto;
  }
  .recharts-wrapper .custom-tooltip {
    background: #d9d9d9d0;
    border-radius: 20px;
    padding: 10px;
    -webkit-box-shadow:  6px 6px 12px -6px rgba(0,0,0,0.44);
    -moz-box-shadow:  6px 6px 12px -6px rgba(0,0,0,0.44);
    box-shadow: 10px 10px 16px -10px rgba(0, 0, 0,0.44);
  }
  .custom-tooltip .label {
    font-size: 25px;
    color: black;
  }
  .custom-tooltip .intro {
    margin-top:10px;
    font-size: 20px;
    color: black;
  }
  .pie-chart-title {
    font-size: 24px;
    font-weight: bold;
    text-decoration: underline;

  }
  .recharts-yAxis > text {
    font-size: 25px;
  }
  .recharts-xAxis > text {
    font-size: 25px;
  }
  .ranking-chart-wrapper {
    display: inline-block;
    margin-left: 30px;
  }
`;

export default NutrientProfileRankingChartWrapper;
