import styled from 'styled-components';

const NutryArchitectureWrapper = styled.div`
  @media only screen and (min-width:380px) and (max-width:576px){
    margin-right: 0px;
  }

  @media only screen and (min-width:1198px) {
    margin-right: 60px;
  }

  .architecture-box {
    margin: 0 auto;
    position: relative;
  }

  .architectureDataSources {
    position: absolute;
    z-index: 2;
    top: 10px;
    right: 0px;

  }

  .architectureDataSources:hover {
    position: absolute;
    z-index: 2;
    top: 5px;
    right: 0px;
    background-position: 0px 0px;
    -webkit-filter: drop-shadow(0px 3px 2px rgb(85, 72, 132))
                  drop-shadow(0px 2px 2px rgb(85, 72, 132));
    filter: drop-shadow(0px 3px 2px rgb(85, 72, 132))
          drop-shadow(0px 2px 2px rgb(85, 72, 132));
  }

  .architecturePathOne {
    position: absolute;
    top: 80px;
    right: 90px;
    z-index: 2;
  }

  .architecturePathOne:hover {
    position: absolute;
    top: 75px;
    right: 90px;
    z-index: 2;
    background-position: 0px 0px;
    -webkit-filter: drop-shadow(0px 3px 2px rgb(85, 72, 132))
                  drop-shadow(0px 2px 2px rgb(85, 72, 132));
    filter: drop-shadow(0px 3px 2px rgb(85, 72, 132))
          drop-shadow(0px 2px 2px rgb(85, 72, 132));
  }

  .architectureCoreSystem {
    position: absolute;
    top: 130px;
    right: 170px;
    z-index: 2;
  }

  .architectureCoreSystem:hover {
    position: absolute;
    top: 125px;
    right: 170px;
    z-index: 2;
    background-position: 0px 0px;
    -webkit-filter: drop-shadow(0px 3px 2px rgb(85, 72, 132))
                  drop-shadow(0px 2px 2px rgb(85, 72, 132));
    filter: drop-shadow(0px 3px 2px rgb(85, 72, 132))
          drop-shadow(0px 2px 2px rgb(85, 72, 132));
  }

  .architecturePathTwo {
    position: absolute;
    top: 110px;
    right: 290px;
    z-index: 1;
  }

  .architecturePathTwo:hover {
    position: absolute;
    top: 105px;
    right: 290px;
    z-index: 1;
    background-position: 0px 0px;
    -webkit-filter: drop-shadow(0px 3px 2px rgb(85, 72, 132))
                  drop-shadow(0px 2px 2px rgb(85, 72, 132));
    filter: drop-shadow(0px 3px 2px rgb(85, 72, 132))
          drop-shadow(0px 2px 2px rgb(85, 72, 132));
  }

  .architectureAI {
    position: absolute;
    top: 50px;
    right: 335px;
    z-index: 2;
  }

  .architectureAI:hover {
    position: absolute;
    top: 45px;
    right: 335px;
    z-index: 2;
    background-position: 0px 0px;
    -webkit-filter: drop-shadow(0px 3px 2px rgb(85, 72, 132))
                  drop-shadow(0px 2px 2px rgb(85, 72, 132));
    filter: drop-shadow(0px 3px 2px rgb(85, 72, 132))
          drop-shadow(0px 2px 2px rgb(85, 72, 132));
  }

  .architecturePathThree {
    position: absolute;
    top: 170px;
    right: 180px;
    z-index: 1;
  }

  .architecturePathThree:hover {
    position: absolute;
    top: 165px;
    right: 180px;
    z-index: 1;
    background-position: 0px 0px;
    -webkit-filter: drop-shadow(0px 3px 2px rgb(85, 72, 132))
                  drop-shadow(0px 2px 2px rgb(85, 72, 132));
    filter: drop-shadow(0px 3px 2px rgb(85, 72, 132))
          drop-shadow(0px 2px 2px rgb(85, 72, 132));
  }

  .architectureEnterprise {
    position: absolute;
    top: 170px;
    right: 450px;
    z-index: 1;
  }

  .architectureEnterprise:hover {
    position: absolute;
    top: 165px;
    right: 450px;
    background-position: 0px 0px;
    -webkit-filter: drop-shadow(0px 3px 2px rgb(85, 72, 132))
                  drop-shadow(0px 2px 2px rgb(85, 72, 132));
    filter: drop-shadow(0px 3px 2px rgb(85, 72, 132))
          drop-shadow(0px 2px 2px rgb(85, 72, 132));
  }

  .architectureGUI {
    position: absolute;
    top: 250px;
    right: 310px;
    z-index: 1;
  }

  .architectureGUI:hover {
    position: absolute;
    top: 245px;
    right: 310px;
    background-position: 0px 0px;
    -webkit-filter: drop-shadow(0px 3px 2px rgb(85, 72, 132))
                  drop-shadow(0px 2px 2px rgb(85, 72, 132));
    filter: drop-shadow(0px 3px 2px rgb(85, 72, 132))
          drop-shadow(0px 2px 2px rgb(85, 72, 132));
  }

  .architectureAPI {
    position: absolute;
    top: 320px;
    right: 170px;
    z-index: 1;
  }
  
  .architectureAPI:hover {
    position: absolute;
    top: 315px;
    right: 170px;
    background-position: 0px 0px;
    -webkit-filter: drop-shadow(0px 3px 2px rgb(85, 72, 132))
                  drop-shadow(0px 2px 2px rgb(85, 72, 132));
    filter: drop-shadow(0px 3px 2px rgb(85, 72, 132))
          drop-shadow(0px 2px 2px rgb(85, 72, 132));
  }
`;

export default NutryArchitectureWrapper;
